using AutoMapper;
using fso.Caching.CachingServices;
using fso.Core.Domains;
using fso.Core.Domains.Helpers;
using fso.Core.Domains.MMEntities;
using fso.Core.Extensions;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using fso.Settings.Image;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;

namespace fso.Data.EntityRepositories
{
    public class UserActivityDataService : IUserActivityDataService
    {
        private readonly IEntityContext _context;
        private readonly IUserLikesDataService _userLikesDataService;
        private readonly IPostCacheService _postCacheService;
        private readonly IPostDataService _postDataService;
        private readonly IUserInfoCacheService _userInfoCacheService;
        private readonly IReviewCacheService _reviewCacheService;
        private readonly IReviewDataService _reviewDataService;
        private readonly IUserLikeCacheService _userLikesCacheService;
        private readonly DbSet<UserActivity> _dbSet;
        private readonly IMapper _mapper;
        private readonly UserProfileImageSettings _userProfileImageSettings;

        int[] userPostLikesIds;
        int[] userReviewLikesIds;
        int[] userCommentLikesIds;
        int[] userReviewDislikesIds;
        int[] userCommentDislikesIds;

        public UserActivityDataService(
            IEntityContext context,
            IPostCacheService postCacheService,
            IPostDataService postDataService,
            IUserInfoCacheService userInfoCacheService,
            IUserLikesDataService userLikesDataService,
            IReviewCacheService reviewCacheService,
            IUserLikeCacheService userLikesCacheService,
            IReviewDataService reviewDataService,
            IMapper mapper,
            IOptions<UserProfileImageSettings> userImageSettings
            )
        {
            _context = context;
            _postCacheService = postCacheService;
            _postDataService = postDataService;
            _userInfoCacheService = userInfoCacheService;
            _userLikesDataService = userLikesDataService;
            _userLikesCacheService = userLikesCacheService;
            _reviewCacheService = reviewCacheService;
            _reviewDataService = reviewDataService;
            _dbSet = _context.Set<UserActivity>();
            _mapper = mapper;
            _userProfileImageSettings = userImageSettings.Value;
        }
        
        public PaginatedList<UserActivity> GetUserActivities(string userId, int pageIndex, int pageSize)
        {
            var activities = _dbSet.AsNoTracking()
                .Where(p =>
                p.AppUserId == userId
                && (p.FeedType == UserActivityType.Add_New_Post
                || p.FeedType == UserActivityType.Add_Review_To_Post
                || p.FeedType == UserActivityType.Add_Post_To_Favourites
                || p.FeedType == UserActivityType.Post_Got_In_Trends
                || p.FeedType == UserActivityType.Like_Review_Of_Post))
                .OrderByDescending(p => p.DateUtcModified)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return activities.ToPaginatedList(pageIndex, pageSize, _dbSet.Count(p => p.AppUserId == userId));
        }

        /// <summary>
        /// CONVERTS DOMAIN ACTIVITY MODEL TO DTO MODEL. IDK WUT DE FCK I JUST WRITED... JUST PAST PARAMETERS 
        /// </summary>
        /// <param name="activities">List of activities</param>
        /// <param name="currUserId">Current User Id</param>
        /// <returns></returns>
        public List<UserActivityDTO<IActivityEntity>> GetActivityDTO(List<UserActivity> activities, string currUserId)
        {
            GetUserLikes(currUserId);
            List<UserActivityDTO<IActivityEntity>> ret = new List<UserActivityDTO<IActivityEntity>>(); 
            var acts = activities.GroupBy(p => p.FeedType);
            foreach (var item in acts)
            {
                switch (item.Key)
                {
                    case UserActivityType.Add_Post_To_Favourites:
                        var ids = item.Select(p => p.SourceEntityId.Value);
                        if (ids.Count() == 0) break;

                        var FavPostActivities =
                            _context.Set<Post>()
                            .AsNoTracking()
                            .Where(p => ids.Contains(p.Id) && p.IsPublished)
                            .Select(p=> new Post()
                            {
                                DateUtcAdd = p.DateUtcAdd,
                                DateUtcModified = p.DateUtcModified,
                                DateUtcPublished = p.DateUtcPublished,
                                Description = p.Description,
                                PostParts = p.PostParts,
                                LikedUsers = p.LikedUsers,
                                Content= p.Content,
                                PrivacyStatus = p.PrivacyStatus,
                                Title = p.Title,
                                Collection = p.Collection,
                                UserInfo = p.UserInfo
                            })
                            .ToList();
                        foreach (var post in FavPostActivities)
                        {
                            post.Rating = GetPostRating(post.Id, 10);
                            var postActivity = activities
                                    .FirstOrDefault(p => p.FeedType == UserActivityType.Add_Post_To_Favourites && p.ParentEntityId == post.Id);
                            ret.Add(new UserActivityDTO<IActivityEntity>()
                            {
                                DateUtcActivity = postActivity.DateUtcModified,
                                AppUserId = postActivity.AppUserId,
                                FeedType = UserActivityType.Add_Post_To_Favourites,
                                ParentEntityType = ParentEntityType.Post,
                                ParentEntity = _mapper.Map<Post, PostActivityEntity>(post, opt =>
                                {
                                    opt.Items["AppUserId"] = currUserId;
                                }),
                            });
                        }
                        break;
                    case UserActivityType.Add_Review_To_Post:
                        var revIds = item.Select(p => p.SourceEntityId.Value).ToArray();
                        if (revIds.Count() == 0) break;

                        var ActivityReviews = _context.Set<Review>()
                            .AsNoTracking()
                            .Where(p => revIds.Contains(p.Id))
                            .Select(p => new
                            {
                                p.DateUtcAdd,
                                p.DateUtcModified,
                                p.DateUtcPublished,
                                p.IsSoftDeleted,
                                p.Id,
                                p.Content,
                                p.UserInfo,
                                p.UserId,
                                p.PostRate,
                                PostId = p.PostId ?? 0,
                                AuthorImageUrl = p.UserInfo.ProfilePicture.SmallPath,
                                CommentCount = p.Comments.Count(),
                            });

                        foreach (var review in ActivityReviews)
                        {
                            var reviewActivity = item
                                    .FirstOrDefault(p => p.SourceEntityId == review.Id);

                            var reviewedPost = _context.Set<Post>()
                                .AsNoTracking()
                                .Select(p => new PostActivityEntity()
                                {
                                    DateUtcPublished = p.DateUtcPublished,
                                    AuthorInfo = new BaseUserInfoDisplay()
                                    {
                                        AppUserId = p.UserInfoId,
                                        Name = p.UserInfo.Name,
                                        Username = p.UserInfo.UName,
                                        Surname = p.UserInfo.Surname,
                                        ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", p.UserInfoId)
                                    },
                                    Content = p.Content,
                                    Title = p.Title,
                                    IsCurrentUserLiked = userPostLikesIds.Contains(p.Id),
                                    PostParts = p.PostParts.Select(f=> new PostPartDisplay()
                                    {
                                        Description = f.Description,                                        
                                        Image = new BaseImageReturn()
                                        {
                                            Dimension = f.Image.ImageDimension,
                                            Extension = f.Image.FileExtension,
                                            LazyUrl = f.Image.BlurLazyPath,
                                            SmallUrl = f.Image.SmallPath,
                                            ThumbUrl = f.Image.ThumbPath,
                                            Url = f.Image.ResizedPath,
                                        },
                                        Title = f.Title,
                                        Id = f.Id
                                    }).ToList(),
                                    Id = p.Id,
                                })
                                .FirstOrDefault(p => p.Id == reviewActivity.ParentEntityId);
                            if(reviewedPost==null) break;
                            reviewedPost.Rating = GetPostRating(reviewedPost.Id, 10);
                            reviewedPost.FavouriteCount = _postCacheService.GetPostLikesCount(reviewedPost.Id)
                                ?? _postDataService.GetPostLikeCount(reviewedPost.Id, cacheTreshold: 20) ;
                            reviewedPost.ReviewCount = _postDataService.GetPostReviewsCount(reviewedPost.Id);

                            LikeStatus ls = userReviewLikesIds.Contains(review.Id) ? LikeStatus.Like : LikeStatus.None;
                            if (userReviewDislikesIds.Contains(review.Id))
                            {
                                ls = LikeStatus.Dislike;
                            }
                            ReviewActivityEntity reviewActivityInfo = new ReviewActivityEntity()
                            {
                                CommentCount = review.CommentCount,
                                DateUtcPublished = review.DateUtcPublished,
                                PostId = review.PostId,
                                LikeStatus = ls,
                                DislikeCount = _reviewCacheService.GetReviewDislikeCount(review.Id) ?? _reviewDataService.GetReviewDislikeCount(review.Id,10),
                                Content = review.Content,
                                Id = review.Id,
                                PostRate = review.PostRate ?? 0,
                                LikeCount = _reviewCacheService.GetReviewLikeCount(review.Id) ?? _reviewDataService.GetReviewLikeCount(review.Id, 100),
                                AuthorInfo = new BaseUserInfoDisplay()
                                {
                                    AppUserId = review.UserInfo.AppUserId,
                                    Name = review.UserInfo.Name,
                                    ProfileImage = review.AuthorImageUrl,
                                    Surname = review.UserInfo.Surname,
                                    Username = review.UserInfo.UName
                                }
                            };

                            ret.Add(new UserActivityDTO<IActivityEntity>()
                            {
                                Id = reviewActivity.Id,
                                DateUtcActivity = reviewActivity.DateUtcModified,
                                AppUserId = reviewActivity.AppUserId,
                                FeedType = UserActivityType.Add_Review_To_Post,
                                ParentEntityType = ParentEntityType.Post,
                                ParentEntity = reviewedPost,
                                PrimaryEntity = reviewActivityInfo
                            });
                        }
                        break;
                    case UserActivityType.Like_Review_Of_Post:
                        // Liked Review
                        var reviewIds = item.Select(p => p.SourceEntityId.Value);
                        if (reviewIds.Count() == 0) break;
                        // Liked Reviews
                        var ActivityLikeReviews = _context.Set<Review>()
                            .Select(p => new Review()
                            {
                                DateUtcAdd = p.DateUtcAdd,
                                DateUtcModified = p.DateUtcModified,
                                DateUtcPublished = p.DateUtcPublished,
                                IsSoftDeleted = p.IsSoftDeleted,
                                UserLikes = p.UserLikes,
                                Id = p.Id,
                                Content = p.Content,
                                UserInfo = p.UserInfo,
                                UserId = p.UserId,
                                PostRate = p.PostRate
                            })
                            .AsNoTracking().Where(p => reviewIds.Contains(p.Id)).ToList();
                        // For Each Liked Review
                        foreach (var review in ActivityLikeReviews)
                        {
                            // Belonging Activity
                            var reviewActivity = item
                                    .FirstOrDefault(p => p.SourceEntityId == review.Id && p.FeedType == UserActivityType.Like_Review_Of_Post);
                            // Reviewed Post
                            var reviewedPost = _context.Set<Post>()
                                .AsNoTracking()
                                .Select(p => new PostActivityEntity()
                                {
                                    DateUtcPublished = p.DateUtcPublished,
                                    AuthorInfo = new BaseUserInfoDisplay()
                                    {
                                        AppUserId = p.UserInfoId,
                                        Name = p.UserInfo.Name,
                                        Username = p.UserInfo.UName,
                                        Surname = p.UserInfo.Surname,
                                        ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", p.UserInfo.AppUserId)
                                    },
                                    Content = p.Content,
                                    IsCurrentUserLiked = userPostLikesIds.Contains(p.Id),
                                    PostParts = p.PostParts.Select(f => new PostPartDisplay()
                                    {
                                        Description = f.Description,
                                        Image = new BaseImageReturn()
                                        {
                                            Dimension = f.Image.ImageDimension,
                                            Extension = f.Image.FileExtension,
                                            LazyUrl = f.Image.BlurLazyPath,
                                            SmallUrl = f.Image.SmallPath,
                                            ThumbUrl = f.Image.ThumbPath,
                                            Url = f.Image.ResizedPath,
                                        },
                                        Title = f.Title,
                                        Id = f.Id
                                    }).ToList(),
                                    Id = p.Id,
                                    ReviewCount = p.Reviews.Count()
                                })
                                .FirstOrDefault(p => p.Id == reviewActivity.ParentEntityId);
                            // Add Activity DTO to return List
                            ret.Add(new UserActivityDTO<IActivityEntity>()
                            {
                                Id = reviewActivity.Id,
                                DateUtcActivity = reviewActivity.DateUtcModified,
                                AppUserId = reviewActivity.AppUserId,
                                FeedType = UserActivityType.Like_Review_Of_Post,
                                ParentEntityType = ParentEntityType.Post,
                                ParentEntity = reviewedPost,
                                PrimaryEntity = _mapper.Map<Review, ReviewActivityEntity>(review, opt =>
                                {
                                    opt.Items["AppUserId"] = currUserId;
                                })
                            });
                        }
                        break;
                    case UserActivityType.Add_Comment_To_Review:
                        
                        // CommentsIds
                        var commentIds = item.Select(p => p.SourceEntityId.Value);
                        if (commentIds.Count() == 0) break;
                        // Get User Likes From Cache
                        
                        // Comments from DB
                        var ActivityComments = _context.Set<Comment>()
                            .Select(p => new Comment()
                            {
                                DateUtcAdd = p.DateUtcAdd,
                                DateUtcModified = p.DateUtcModified,
                                IsSoftDeleted = p.IsSoftDeleted,
                                Id = p.Id,
                                Content = p.Content,
                                CommentLikes = p.CommentLikes,                                
                            })
                            .AsNoTracking().Where(p => commentIds.Contains(p.Id)).ToList();
                        // Each commentActivity get belonging Review
                        foreach (var comment in ActivityComments)
                        {
                            var commentActivity = item
                                    .FirstOrDefault(p => p.SourceEntityId == comment.Id && p.FeedType == UserActivityType.Add_Comment_To_Review);

                            var commentedReview = _context.Set<Review>()
                                .AsNoTracking()
                                .Select(f => new { Review = f,
                                    ReviewLikeCount = f.UserLikes.Where(p=>p.LikeStatus == LikeStatus.Like).Count(),
                                    AuthorInfo = f.UserInfo,
                                 })
                                .Select(p => new CommentReviewActivityEntity()
                                {
                                    AuthorInfo = new BaseUserInfoDisplay()
                                    {
                                        AppUserId = p.AuthorInfo.AppUserId,
                                        Name = p.AuthorInfo.Name,
                                        ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", p.AuthorInfo.AppUserId),
                                        Surname = p.AuthorInfo.Surname,
                                        Username = p.AuthorInfo.UName
                                    },
                                    Id = p.Review.Id,
                                    Content = p.Review.Content,
                                    IsUserLiked = this.userReviewLikesIds.Contains(p.Review.Id),
                                    LikeCount = p.ReviewLikeCount,
                                })
                                .FirstOrDefault(p => p.Id == commentActivity.ParentEntityId);

                            commentedReview.CommentCount = _reviewCacheService.GetReviewCommentCount(commentedReview.Id) 
                                ?? _reviewDataService.GetReviewCommentCount(commentedReview.Id,20);
                            commentedReview.LikeCount = _reviewCacheService.GetReviewLikeCount(commentedReview.Id) 
                                ?? _reviewDataService.GetReviewLikeCount(commentedReview.Id, cacheTreshold: 10);
                            commentedReview.DislikeCount = _reviewCacheService.GetReviewDislikeCount(commentedReview.Id) 
                                ?? _reviewDataService.GetReviewDislikeCount(commentedReview.Id,10);

                            ret.Add(new UserActivityDTO<IActivityEntity>()
                            {
                                Id = commentActivity.Id,
                                DateUtcActivity = commentActivity.DateUtcModified,
                                AppUserId = commentActivity.AppUserId,
                                FeedType = UserActivityType.Add_Comment_To_Review,
                                ParentEntityType = ParentEntityType.Review,
                                ParentEntity = commentedReview,
                                PrimaryEntity = new CommentActivityEntity()
                                {
                                    DateUtcAdded = comment.DateUtcAdd,
                                    DateUtcModified = comment.DateUtcModified,
                                    DislikeCount = comment.CommentLikes.Count(p=>p.LikeStatus==LikeStatus.Dislike),
                                    LikeCount = comment.CommentLikes.Count(p => p.LikeStatus == LikeStatus.Like),
                                    Content = comment.Content,
                                    Id = comment.Id,
                                    IsUserDisliked = userCommentLikesIds.Contains(comment.Id),
                                    IsUserLiked = userCommentDislikesIds.Contains(comment.Id),
                                }
                            });
                        }
                        break;
                    case UserActivityType.Add_Comment_To_Comment:
                        break;
                    case UserActivityType.Like_Comment:
                        break;
                    case UserActivityType.Follow_User:
                        break;
                    case UserActivityType.Add_New_Collection:
                        var colActIds = item.Select(p => p.SourceEntityId);
                        if (colActIds.Count() == 0) break;

                        var AddCollectionActivities =
                            _context.Set<PostCollection>()
                            .AsNoTracking()
                            .Select(col => new
                            {
                                Collection = col,
                                PostCount = col.Posts.Count(),
                                col.ThumbFile,
                                col.UserInfo
                            })
                            .Where(p => colActIds.Contains(p.Collection.Id)).ToList();


                        var AddCollectionActivityDtos =
                            AddCollectionActivities.Select(p => new AddCollectionActivityEntity()
                            {
                                DateUtcModified = p.Collection.DateUtcModified,
                                UserInfo = new BaseUserInfoDisplay()
                                {
                                    AppUserId = p.UserInfo.AppUserId,
                                    Name = p.UserInfo.Name,
                                    ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", p.UserInfo.AppUserId),
                                    Surname = p.UserInfo.Surname,
                                    Username = p.UserInfo.UName
                                },
                                Name = p.Collection.Name,
                                Id = p.Collection.Id,
                                PostsCount = p.PostCount,
                                Description = p.Collection.Description,
                                ThumbImageUrl = p.ThumbFile == null ? "": p.ThumbFile.ThumbPath,
                                UserInfoId = p.UserInfo.AppUserId,
                            });


                        foreach (var col in AddCollectionActivityDtos)
                        {

                            var colActivity = activities
                                    .FirstOrDefault(p => p.FeedType == UserActivityType.Add_New_Collection && p.SourceEntityId == col.Id);

                            ret.Add(new UserActivityDTO<IActivityEntity>()
                            {
                                Id = colActivity.Id,
                                DateUtcActivity = colActivity.DateUtcModified,
                                AppUserId = colActivity.AppUserId,
                                FeedType = UserActivityType.Add_New_Collection,
                                ParentEntityType = ParentEntityType.None,
                                PrimaryEntity = col
                            });
                        }
                        break;
                    case UserActivityType.Add_New_Post:
                        var actIds = item.Select(p => p.SourceEntityId);
                        if (actIds.Count() == 0) break;

                        var AddPostActivities =
                            _context.Set<Post>()
                            .AsNoTracking()
                            .Include(p=>p.PostParts)
                            .ThenInclude(p=>p.Image)
                            .Where(p => actIds.Contains(p.Id) && p.IsPublished)
                            .Select(post => new { Post = post,
                                post.PostParts,
                                post.UserInfo,
                                post.Collection,
                                post.Groups                                
                            });

                        var AddPostActivityDtos =
                            AddPostActivities.Select(p => new PostActivityEntity()
                            {                                
                                DateUtcPublished = p.Post.DateUtcPublished,
                                AuthorInfo = new BaseUserInfoDisplay()
                                {
                                    AppUserId = p.UserInfo.AppUserId,
                                    Name = p.UserInfo.Name,
                                    ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", p.UserInfo.AppUserId),
                                    Surname = p.UserInfo.Surname,
                                    Username = p.UserInfo.UName
                                },
                                Content = p.Post.Content,
                                Title = p.Post.Title,
                                IsCurrentUserLiked = userPostLikesIds.Contains(p.Post.Id),
                                Id = p.Post.Id,
                                PostParts = p.PostParts.Select(f => new PostPartDisplay()
                                {
                                    Description = f.Description,
                                    Id = f.Id,
                                    Title = f.Title,
                                    Image = new BaseImageReturn()
                                    {
                                        Dimension = f.Image.ImageDimension,
                                        Extension = f.Image.FileExtension,
                                        LazyUrl = f.Image.BlurLazyPath,
                                        ThumbUrl = f.Image.ThumbPath,
                                        SmallUrl = f.Image.SmallPath,
                                        Url = f.Image.ResizedPath,
                                    }
                                }).ToList()
                            });
                        

                        foreach (var post in AddPostActivityDtos)
                        {
                            post.Rating = GetPostRating(post.Id, 10);
                            post.CollectionInfo = post.CollectionInfo ?? new PostCollectionInfo() { };
                            post.IsCurrentUserLiked = userPostLikesIds.Contains(post.Id);
                            post.FavouriteCount = _postCacheService.GetPostLikesCount(post.Id)
                                ?? _postDataService.GetPostLikeCount(post.Id, cacheTreshold: 20);
                            post.ReviewCount = _postDataService.GetPostReviewsCount(post.Id);

                            var postActivity = activities
                                    .FirstOrDefault(p => p.FeedType == UserActivityType.Add_New_Post && p.SourceEntityId == post.Id);

                            ret.Add(new UserActivityDTO<IActivityEntity>()
                            {
                                Id = postActivity.Id,
                                DateUtcActivity = postActivity.DateUtcModified,
                                AppUserId = postActivity.AppUserId,
                                FeedType = UserActivityType.Add_New_Post,
                                ParentEntityType = ParentEntityType.None,
                                PrimaryEntity = post
                            });
                        }
                        break;

                    case UserActivityType.Add_New_Post_To_Collection:
                        break;
                    case UserActivityType.Post_Got_In_Trends:
                        break;
                    default:
                        break;
                }
            }
            return ret.OrderByDescending(p=>p.DateUtcActivity).ToList();
        }

        public double? GetPostRating(int postId, double cacheTreshold)
        {
            var ret = _postCacheService.GetPostRating(postId);
            if (ret.HasValue)
            {
                return ret;
            }
            var reviews = _context.Set<Review>().AsNoTracking().Select(f => new { f.PostId, f.UserReputation, f.PostRate }).Where(p => p.PostId == postId);
            var totalCount = reviews.Count();
            if (totalCount == 0)
            {
                return 5.5;
            }
            var totalReputation = reviews.Sum(p => p.UserReputation);

            var totalReputationRating = reviews.Sum(p => p.UserReputation * p.PostRate);
            ret = (totalReputationRating / totalReputation);
            if (totalCount > cacheTreshold)
            {
                _postCacheService.SetPostRating(postId, ret.Value, 30);
            }
            return ret;
        }
        private void GetUserLikes(string currUserId)
        {
            // Get from cache
            userReviewLikesIds = _userLikesCacheService.GetUserLikedReviewsIds(currUserId);
            userCommentLikesIds = _userLikesCacheService.GetUserLikedCommentsIds(currUserId);
            userReviewDislikesIds = _userLikesCacheService.GetUserDisikedReviewsIds(currUserId);
            userCommentDislikesIds = _userLikesCacheService.GetUserDisikedCommentsIds(currUserId);
            userPostLikesIds = _userLikesCacheService.GetUserLikedPostsIds(currUserId);
            // If not check the Database
            if (userReviewLikesIds == null || userReviewLikesIds.Count() == 0)
            {
                userReviewLikesIds = _userLikesDataService.GetUserLikedReviewsIds(currUserId);
                _userLikesCacheService.SetUserLikedReviewsIds(currUserId, userReviewLikesIds, 20);
            }
            if (userCommentLikesIds == null || userCommentLikesIds.Count() == 0)
            {
                userCommentLikesIds = _userLikesDataService.GetUserLikedCommentsIds(currUserId);
                _userLikesCacheService.SetUserLikedCommentsIds(currUserId, userCommentLikesIds, 20);
            }
            if (userReviewDislikesIds == null || userReviewDislikesIds.Count() == 0)
            {
                userReviewDislikesIds = _userLikesDataService.GetUserDisikedReviewsIds(currUserId);
                _userLikesCacheService.SetUserDisikedReviewsIds(currUserId, userReviewDislikesIds, 20);
            }
            if (userCommentDislikesIds == null || userCommentDislikesIds.Count() == 0)
            {
                userCommentDislikesIds = _userLikesDataService.GetUserDisikedCommentsIds(currUserId);
                _userLikesCacheService.SetUserDisikedCommentsIds(currUserId, userCommentDislikesIds, 20);
            }
            if (userPostLikesIds == null || userPostLikesIds.Count() == 0)
            {
                userPostLikesIds = _userLikesDataService.GetUserLikedPostsIds(currUserId);
                _userLikesCacheService.SetUserLikedPostsIds(currUserId, userPostLikesIds, 20);
            }
        }
    }
}
