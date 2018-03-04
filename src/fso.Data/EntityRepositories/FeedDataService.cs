using AutoMapper;
using fso.Caching.CachingServices;
using fso.Core.Domains;
using fso.Core.Domains.Helpers;
using fso.Core.Domains.MMEntities;
using fso.Core.Extensions;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using fso.DataExtensions.Models.Feed;
using fso.DataExtensions.Models.GroupReturnModels;
using fso.DataExtensions.Models.User;
using fso.Settings.Image;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace fso.Data.EntityRepositories
{
    public class FeedDataService : IFeedDataService
    {
        private readonly IEntityContext _context;
        private readonly IUserFollowCacheService _userFollowCacheService;
        private readonly IUserLikesDataService _userLikesDataService;
        private readonly IUserInfoCacheService _userCacheService;
        private readonly IUserLikeCacheService _userLikesCacheService;
        private readonly IPostCacheService _postCacheService;
        private readonly IPostDataService _postDataService;
        private readonly IReviewCacheService _reviewCacheService;
        private readonly IReviewDataService _reviewDataService;
        private readonly IGroupCacheService _groupCacheService;
        private readonly IUserInfoDataService _userInfoDataService;
        private readonly IMapper _mapper;

        private readonly UserProfileImageSettings _userProfileImageSettings;

        int[] userPostLikesIds;
        int[] userReviewLikesIds;
        int[] userCommentLikesIds;
        int[] userReviewDislikesIds;
        int[] userCommentDislikesIds;
        int[] userGroupFollowIds;
        Dictionary<string, FollowState> currentUserFollowings;

        public FeedDataService(
            IEntityContext context,
            IMapper mapper,
            IOptions<UserProfileImageSettings> options,
            IUserFollowCacheService userFollowCacheService,
            IReviewCacheService reviewCacheService,
            IReviewDataService reviewDataService,
            IUserInfoCacheService userCacheService,
            IGroupCacheService groupCacheService,
            IPostDataService postDataService,
            IUserLikeCacheService userLikesCacheService,
            IUserLikesDataService userLikesDataService,
            IPostCacheService postCacheService,
            IUserInfoDataService userInfoDataService
            )
        {
            _context = context;
            _mapper = mapper;
            _userFollowCacheService = userFollowCacheService;
            _groupCacheService = groupCacheService;
            _userProfileImageSettings = options.Value;
            _userLikesCacheService = userLikesCacheService;
            _userLikesDataService = userLikesDataService;
            _reviewCacheService = reviewCacheService;
            _userCacheService = userCacheService;
            _reviewDataService = reviewDataService;
            _postDataService = postDataService;
            _userInfoDataService = userInfoDataService;
            _postCacheService = postCacheService;
        }
        public HomeFeedReturn GetUserFeed(string currUserId, PaginatedRequest feedReq, PaginatedRequest urecReq, PaginatedRequest grecReq)
        {
            HomeFeedReturn ret = new HomeFeedReturn();
            bool isLoggedIn = !string.IsNullOrEmpty(currUserId);
            if (!isLoggedIn)
            {
                ret.ErrorCode = "401";
                return ret;
            }

            GetUserLikes(currUserId);

            string[] followingUserIds = currentUserFollowings.Where(p => p.Value == FollowState.Confirmed).Select(p => p.Key).ToArray();
            int totalFollowing = followingUserIds.Count();
            if (totalFollowing == 0)
            {
                return ret;
            }

            ret.FriendActivities = GetPaginatedUserActivityFeed(currUserId, followingUserIds, feedReq);
            ret.UserRecommeandations = GetPaginatedUserRecommendations(currUserId, followingUserIds, userGroupFollowIds, urecReq);
            ret.GroupRecommendations = GetPaginatedGroupRecommendations(currUserId, followingUserIds, userGroupFollowIds, grecReq);
            return ret;
        }
        public PaginatedInterestCard GetUserInterests(string currUserId, PaginatedRequest req)
        {
            PaginatedInterestCard ret = new PaginatedInterestCard();
            userGroupFollowIds = _userLikesCacheService.GetUserFollowingGroupsIds(currUserId);
            if (userGroupFollowIds == null || userGroupFollowIds.Count() == 0)
            {
                userGroupFollowIds = _userLikesDataService.GetUserFollowingGroups(currUserId, 30);
                _userLikesCacheService.SetUserFollowingGroupsIds(currUserId, userGroupFollowIds, 20);
            }
            int total = userGroupFollowIds.Count();
            if (total < 1)
            {
                return ret;
            }
            int[] paginatedIds = userGroupFollowIds.Skip((req.PageIndex - 1) * req.PageSize).Take(req.PageSize).ToArray();
            ret.Entities = _context.Set<Group>().AsNoTracking()
                .Select(f => new { Entity = f, f.ProfileImage })
                .Where(p => paginatedIds.Contains(p.Entity.Id))
                .Select(p => new InterestCard()
                {
                    AlphaColor = p.Entity.ColorAlpha,
                    UrlKey = p.Entity.UrlKey,
                    Id = p.Entity.Id,
                    Name = p.Entity.Name,
                    IsCurrentUserFollowing = true,
                    ProfileImage = p.Entity.ProfileImage.SmallPath
                }).ToPaginatedList(req.PageIndex, req.PageSize, total);

            return ret;

        }
        public PaginatedUserActivityFeed GetPaginatedUserActivityFeed(string currUserId,string[] followingUserIds, PaginatedRequest parameters)
        {            
            
            var activities = _context.Set<UserActivity>()
                .AsNoTracking()
                .Where(p => followingUserIds.Contains(p.AppUserId))
                .OrderByDescending(p=>p.DateUtcAdd)
                .Skip((parameters.PageIndex - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .ToPaginatedList(parameters.PageIndex, parameters.PageSize, int.MaxValue);
            
            return ConverActivitiesToDTOModels(currUserId, activities);
        }
        public PaginatedUserActivityFeed ConverActivitiesToDTOModels(string currUserId, PaginatedList<UserActivity> activities)
        {
            PaginatedUserActivityFeed ret = new PaginatedUserActivityFeed();
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
                            .Select(p => new Post()
                            {
                                DateUtcAdd = p.DateUtcAdd,
                                DateUtcModified = p.DateUtcModified,
                                DateUtcPublished = p.DateUtcPublished,
                                Description = p.Description,
                                PostParts = p.PostParts,
                                LikedUsers = p.LikedUsers,
                                Content = p.Content,
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
                            ret.Entities.Add(new UserActivityDTO<IActivityEntity>()
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
                                })
                                .FirstOrDefault(p => p.Id == reviewActivity.ParentEntityId);
                            reviewedPost.Rating = GetPostRating(reviewedPost.Id, 10);
                            reviewedPost.FavouriteCount = _postCacheService.GetPostLikesCount(reviewedPost.Id)
                                ?? _postDataService.GetPostLikeCount(reviewedPost.Id, cacheTreshold: 20);
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
                                DislikeCount = _reviewCacheService.GetReviewDislikeCount(review.Id) ?? _reviewDataService.GetReviewDislikeCount(review.Id, 10),
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

                            ret.Entities.Add(new UserActivityDTO<IActivityEntity>()
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
                            ret.Entities.Add(new UserActivityDTO<IActivityEntity>()
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
                                .Select(f => new {
                                    Review = f,
                                    ReviewLikeCount = f.UserLikes.Where(p => p.LikeStatus == LikeStatus.Like).Count(),
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
                                ?? _reviewDataService.GetReviewCommentCount(commentedReview.Id, 20);
                            commentedReview.LikeCount = _reviewCacheService.GetReviewLikeCount(commentedReview.Id)
                                ?? _reviewDataService.GetReviewLikeCount(commentedReview.Id, cacheTreshold: 10);
                            commentedReview.DislikeCount = _reviewCacheService.GetReviewDislikeCount(commentedReview.Id)
                                ?? _reviewDataService.GetReviewDislikeCount(commentedReview.Id, 10);

                            ret.Entities.Add(new UserActivityDTO<IActivityEntity>()
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
                                    DislikeCount = comment.CommentLikes.Count(p => p.LikeStatus == LikeStatus.Dislike),
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
                                ThumbImageUrl = p.ThumbFile == null ? "" : p.ThumbFile.ThumbPath,
                                UserInfoId = p.UserInfo.AppUserId,
                            });


                        foreach (var col in AddCollectionActivityDtos)
                        {

                            var colActivity = activities
                                    .FirstOrDefault(p => p.FeedType == UserActivityType.Add_New_Collection && p.SourceEntityId == col.Id);

                            ret.Entities.Add(new UserActivityDTO<IActivityEntity>()
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
                            .Include(p => p.PostParts)
                            .ThenInclude(p => p.Image)
                            .Where(p => actIds.Contains(p.Id) && p.IsPublished)
                            .Select(post => new {
                                Post = post,
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

                            ret.Entities.Add(new UserActivityDTO<IActivityEntity>()
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
            ret.Entities = ret.Entities.OrderByDescending(p => p.DateUtcActivity).ToList().ToPaginatedList(activities.PageIndex, activities.PageSize, activities.TotalCount);
            return ret;
        }

        public PaginatedUserInfoRecommendation GetPaginatedUserRecommendations(string currUserId, string[] followingUserIds, int[] followingGroups, PaginatedRequest parameters)
        {
            PaginatedUserInfoRecommendation ret = new PaginatedUserInfoRecommendation();

            string[] currUserFollowingIds = currentUserFollowings.Where(p => p.Value == FollowState.Confirmed).Select(p => p.Key).ToArray();

            string[] reccIds = _context.SetChild<FollowInfo>()
                .AsNoTracking()
                .Where(p => followingUserIds.Contains(p.FollowerId) && p.FollowState==FollowState.Confirmed && !currUserFollowingIds.Contains(p.FollowedId) && p.FollowedId != currUserId)
                .OrderByDescending(p => p.DateUtcFollowed)
                .Skip((parameters.PageIndex - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .Select(f => f.FollowedId)
                .ToArray();

             ret.Entities = _context.Set<UserInfo>().AsNoTracking().Where(p => reccIds.Contains(p.AppUserId))
                .Select(p => new UserCardModel()
                {
                    AppUserId = p.AppUserId,
                    ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}",p.AppUserId),
                    Username = p.UName,
                }).ToPaginatedList(parameters.PageIndex, parameters.PageSize, int.MaxValue);
            // Get Total Reputation
            foreach (var item in ret.Entities)
            {
                item.Reputation = _userCacheService.GetUserReputation(item.AppUserId) ?? GetUserReputation(item.AppUserId, 1);
                // Check if the current user follows the users fetched from database
                var followState = currentUserFollowings.SingleOrDefault(p => p.Key == item.AppUserId);
                item.FollowState = followState.Key == null ? FollowState.Unfollowed : followState.Value;                
            }           
           
            // return as paginated
            return ret;
        }
        public PaginatedGroupRecommendation GetPaginatedGroupRecommendations(string currUserId, string[] followingUserIds,int[] followingGroups,PaginatedRequest parameters)
        {
            PaginatedGroupRecommendation ret = new PaginatedGroupRecommendation();

            string[] currUserFollowingIds = currentUserFollowings.Where(p => p.Value == FollowState.Confirmed).Select(p => p.Key).ToArray();

            int[] reccIds = _context.SetChild<UserGroup>()
                .AsNoTracking()
                .Where(p => currUserFollowingIds.Contains(p.UserId) && p.GroupFollowState == GroupFollowState.Followed && !userGroupFollowIds.Contains(p.GroupId))
                .OrderByDescending(p => p.DateUtcFollowed)
                .Skip((parameters.PageIndex - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .Select(f => f.GroupId)
                .ToArray();

            ret.Entities = _context.Set<Group>().AsNoTracking().Where(p => reccIds.Contains(p.Id)).Select(p => new InterestCard()
            {
                CoverImage = p.CoverImage.ThumbPath,
                Id = p.Id,
                IsCurrentUserFollowing = userGroupFollowIds.Any(s => s == p.Id),
                Name = p.Name,
                AlphaColor = p.ColorAlpha,
                ProfileImage = p.ProfileImage.SmallPath,
                UrlKey = p.UrlKey
            }).ToPaginatedList(parameters.PageIndex, parameters.PageSize, int.MaxValue);
            // Get Total Reputation
            foreach (var group in ret.Entities)
            {
                // Get From Cache
                int? followerCount = _groupCacheService.GetFollowingUserCount(group.Id);
                // If exist in cache
                if (followerCount.HasValue)
                {
                    group.FollowerCount = followerCount.Value;
                }
                // If not exist in cache get from database and set cache
                else
                {
                    int count = _context.SetChild<UserGroup>().AsNoTracking().Where(p => p.GroupId == group.Id && p.GroupFollowState == GroupFollowState.Followed).Count();
                    group.FollowerCount = count;
                    _groupCacheService.SetFollowingUserCount(group.Id, count, 60);
                }
            }

            // return as paginated
            return ret;
        }
        private double GetUserReputation(string appUserId, int cacheTreshold)
        {
            var allRepSum = _context.Set<ReputationGain>().Where(p => p.UserInfoId == appUserId).Sum(p => p.GainedReputationValue);
            double userReputationSum = allRepSum;
            if (userReputationSum >= cacheTreshold)
            {
                _userCacheService.SetUserReputation(appUserId, userReputationSum, 60);
            }
            return userReputationSum;
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
            if (totalReputation == null)
            {
                return 5.5;
            }
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
            userGroupFollowIds = _userLikesCacheService.GetUserFollowingGroupsIds(currUserId);
            currentUserFollowings = _userFollowCacheService.GetFollowingUserIds(currUserId);
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
            if (userGroupFollowIds == null || userGroupFollowIds.Count() == 0)
            {
                userGroupFollowIds = _userLikesDataService.GetUserFollowingGroups(currUserId, 30);
                _userLikesCacheService.SetUserFollowingGroupsIds(currUserId, userGroupFollowIds, 20);
            }
            if (currentUserFollowings == null || currentUserFollowings.Count == 0)
            {
                currentUserFollowings = _userLikesDataService.GetFollowingUserIds(currUserId);
                if (currentUserFollowings == null)
                {
                    currentUserFollowings = new Dictionary<string, FollowState>();
                }
                else
                {
                    _userFollowCacheService.SetFollowingUserIds(currUserId, currentUserFollowings, 10);
                }
            }
        }
    }
}
