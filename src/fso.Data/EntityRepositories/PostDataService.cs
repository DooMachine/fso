using fso.Caching.CachingServices;
using fso.Core.Caching;
using fso.Core.Domains;
using fso.Core.Domains.Helpers;
using fso.Core.Domains.Helpers.Enum;
using fso.Core.Domains.MMEntities;
using fso.Core.Extensions;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using fso.DataExtensions.Models.User;
using fso.DataExtensions.Models.UserInfo;
using fso.Settings.Image;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;

namespace fso.Data.EntityRepositories
{
    public class PostDataService : IPostDataService
    {
        private readonly IEntityContext _context;
        private readonly IPostCacheService _postCacheService;
        private readonly IUserLikesDataService _userLikesDataService;
        private readonly IUserLikeCacheService _userLikesCacheService;
        private readonly IUserFollowCacheService _userFollowCacheService;
        private readonly IGroupDataService _groupDataService;
        private readonly IGroupCacheService _groupCacheService;
        private readonly IReviewCacheService _reviewCacheService;
        private readonly IReviewDataService _reviewDataService;
        private readonly ICommentCacheService _commentCacheService;
        private readonly ICommentDataService _commentDataService;
        
        private readonly UserProfileImageSettings _userProfileImageSettings;

        int[] userPostLikesIds;
        int[] userReviewLikesIds;
        int[] userCommentLikesIds;
        int[] userReviewDislikesIds;
        int[] userCommentDislikesIds;
        int[] userGroupFollowIds;
        Dictionary<string, FollowState> currentUserFollowings;


        public PostDataService(
            IEntityContext context,
            IPostCacheService postCacheService,
            IUserLikesDataService userLikesDataService,
            IUserLikeCacheService userLikesCacheService,
            IUserFollowCacheService userFollowCacheService,
            IGroupDataService groupDataService,
            IGroupCacheService groupCacheService,
            IReviewCacheService reviewCacheService,
            IReviewDataService reviewDataService,
            ICommentCacheService commentCacheService,
            ICommentDataService commentDataService,
            IOptions<UserProfileImageSettings> userProfileImageSettings
            )
        {
            _context = context;
            _postCacheService = postCacheService;
            _userLikesCacheService = userLikesCacheService;
            _userLikesDataService = userLikesDataService;
            _userFollowCacheService = userFollowCacheService;
            _groupDataService = groupDataService;
            _groupCacheService = groupCacheService;
            _reviewCacheService = reviewCacheService;
            _reviewDataService = reviewDataService;
            _commentCacheService = commentCacheService;
            _commentDataService = commentDataService;
            _userProfileImageSettings = userProfileImageSettings.Value;
        }
        public AddPostReturnModel GetUserUnpublishedPost(string currUserId)
        {
            AddPostReturnModel ret = new AddPostReturnModel();
            if (string.IsNullOrEmpty(currUserId))
            {
                return ret;
            }
            Post post =  _context.Set<Post>()
            .FirstOrDefault(p => p.IsPublished != true && p.UserInfoId == currUserId);
            ret.UserCollections = _context.Set<PostCollection>()
                .AsNoTracking()
                .Select(p => new CollectionCard()
                {
                    Id = p.Id,
                    Name = p.Name,
                    ThumbImageUrl = p.ThumbFile.SmallPath,
                    UserInfoId = p.UserInfoId,
                    DateUtcModified = p.DateUtcModified
                })
                .Where(p => p.UserInfoId == currUserId)
                .OrderByDescending(p => p.DateUtcModified);
            
            if (post==null)
            {
                Post newPost = new Post()
                {
                    UserInfoId = currUserId,
                    PrivacyStatus = PrivacyStatus.All
                };
                 _context.Set<Post>().Add(newPost);
                _context.SaveChanges();
                ret.Id = newPost.Id;
                ret.PrivacyStatus = PrivacyStatus.All;
                
                return ret;
            }
            else
            {
                ret.PrivacyStatus = post.PrivacyStatus;
                ret.Title = post.Title;
                ret.Content = post.Content;
                ret.Description = post.Description;
                ret.Id = post.Id;

                ret.PostParts = _context.Set<PostPart>()
                    .Select(p => new PostPartDisplay()
                    {
                        PostId = p.PostId,
                        Description = p.Description,
                        Id = p.Id,
                        Title = p.Title,
                        Image = new BaseImageReturn()
                        {
                            Dimension = p.Image.ImageDimension,
                            Extension = p.Image.FileExtension,
                            LazyUrl = p.Image.SmallPath,
                            Url = p.Image.ResizedPath
                        }
                    })
                    .Where(p => p.PostId == post.Id).ToList();

            }
            return ret;
        }
        public EditPostReturnModel GetEditingPost(int postId,string currUserId){
            EditPostReturnModel ret = new EditPostReturnModel();
            if (string.IsNullOrEmpty(currUserId))
            {
                ret.IsAvaliable=false;
                return ret;
            }
            Post post =  _context.Set<Post>()
            .FirstOrDefault(p => p.IsPublished == true && p.Id==postId && p.UserInfoId == currUserId);
            if(post==null){
                ret.IsAvaliable=false;
                return ret;
            }
            ret.UserCollections = _context.Set<PostCollection>()
                .AsNoTracking()
                .Select(p => new CollectionCard()
                {
                    Id = p.Id,
                    Name = p.Name,
                    ThumbImageUrl = p.ThumbFile.SmallPath,
                    UserInfoId = p.UserInfoId,
                    DateUtcModified = p.DateUtcModified
                })
                .Where(p => p.UserInfoId == currUserId)
                .OrderByDescending(p => p.DateUtcModified);
            
            
            ret.PrivacyStatus = post.PrivacyStatus;
            ret.Title = post.Title;
            ret.Content = post.Content;
            ret.Description = post.Description;
            ret.Id = post.Id;
            if(post.CollectionId.HasValue){
                ret.PrevCollectionId = post.CollectionId.Value;
            }
            int[] interestIds = _context.SetChild<GroupPost>().Where(p=>p.PostId==postId)
                .Select(f=>f.GroupId).ToArray();
            if(interestIds!=null){
                ret.PrevInterests = _context.Set<Group>().AsNoTracking()
                    .Where(f=>interestIds.Contains(f.Id))
                    .Select(p=> new InterestCard(){
                        AlphaColor = p.ColorAlpha,
                        ProfileImage = p.ProfileImage.SmallPath,
                        Id = p.Id,
                        Name = p.Name,
                        UrlKey = p.UrlKey,
                    }).ToList();
            }
                
            ret.PostParts = _context.Set<PostPart>()
                .Select(p => new PostPartDisplay()
                {
                    PostId = p.PostId,
                    Description = p.Description,
                    Id = p.Id,
                    Title = p.Title,
                    Image = new BaseImageReturn()
                    {
                        Dimension = p.Image.ImageDimension,
                        Extension = p.Image.FileExtension,
                        LazyUrl = p.Image.SmallPath,
                        Url = p.Image.ResizedPath
                    }
                })
                .Where(p => p.PostId == post.Id).ToList();
            return ret;
        }

        public PaginatedList<PostCard> GetGroupIndexPosts(int groupId,string currUserId, int pageIndex, int pageSize)
        {
            var posts =  _context.Set<Post>()
                .AsNoTracking()
                .Where(p => p.Groups.Any(f => f.GroupId == groupId) && p.IsPublished == true)
                .OrderByDescending(p => p.DateUtcAdd)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .Select(c => new PostCard()
                {
                    DateUtcPublished = c.DateUtcPublished,
                    ReviewCount = c.Reviews.Count(),
                    LikeCount = c.LikedUsers.Count(),
                    UrlKey = c.UrlKey,
                    IsPublished = c.IsPublished,
                    IsCurrentUserLiked = c.LikedUsers.Any(f => f.UserInfoId == currUserId),
                    AuthorInfo = new BaseUserInfoDisplay() {
                        AppUserId = c.UserInfo.AppUserId,
                        Name = c.UserInfo.Name,
                        Surname = c.UserInfo.Surname,
                        ProfileImage = c.UserInfo.ProfilePicture.SmallPath
                    },
                    PostParts = c.PostParts.Select(q => new PostPartDisplay()
                    {
                        Description = q.Description,
                        Id = q.Id,
                        Image = new BaseImageReturn()
                        {
                            Dimension=q.Image.ImageDimension,
                            Extension=q.Image.FileExtension,
                            LazyUrl=q.Image.SmallPath,
                            Url=q.Image.ResizedPath
                        },
                         Title=q.Title
                     }).ToList(),
                     Id=c.Id,                     
                     Content = c.Content,
                     Description = c.Description,
                     

                 });
            return posts.ToPaginatedList(pageIndex,pageSize, _context.Set<Post>().Count());
        }

        public PaginatedList<PostCard> GetGroupIndexPosts(int groupId, int pageIndex, int pageSize)
        {
            var posts =  _context.Set<Post>()
                .AsNoTracking()
                .Where(p => p.Groups.Any(f => f.GroupId == groupId) && p.IsPublished == true)
                .OrderByDescending(p => p.DateUtcAdd)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .Select(c => new PostCard()
                {
                    DateUtcPublished = c.DateUtcPublished,
                    UrlKey = c.UrlKey,
                    ReviewCount=c.Reviews.Count(),
                    LikeCount=c.LikedUsers.Count(),
                    IsPublished = c.IsPublished,
                    AuthorInfo = new BaseUserInfoDisplay()
                    {
                        AppUserId = c.UserInfo.AppUserId,
                        Name = c.UserInfo.Name,
                        Surname = c.UserInfo.Surname,
                        ProfileImage = c.UserInfo.ProfilePicture.SmallPath
                    },
                    PostParts = c.PostParts.Select(q => new PostPartDisplay()
                    {
                        Description = q.Description,
                        Id = q.Id,
                        Image = new BaseImageReturn()
                        {
                            Dimension=q.Image.ImageDimension,
                            Extension=q.Image.FileExtension,
                            LazyUrl=q.Image.SmallPath,
                            Url=q.Image.ResizedPath
                        },
                        Title = q.Title
                    }).ToList(),
                    Id = c.Id,
                    Content = c.Content,
                    Description = c.Description,

                });
            return posts.ToPaginatedList(pageIndex, pageSize,  _context.Set<Post>().Count());
        }

        public PostIndexReturn GetPostIndex(int postId, int? reviewId, string currUserId)
        {
            bool isLoggedIn = !string.IsNullOrEmpty(currUserId);
            if (isLoggedIn)
            {
                GetUserLikes(currUserId);
            }
            else
            {
                currentUserFollowings = new Dictionary<string, FollowState>();
            }
            PostIndexReturn ret = new PostIndexReturn();
            ret.Post =  _context.Set<Post>().AsNoTracking()
                .Select(p => new PostCardModel
                {
                    DateUtcPublished = p.DateUtcPublished,
                    AuthorInfo = new UserCardModel()
                    {
                        AppUserId = p.UserInfo.AppUserId,
                        Name = p.UserInfo.Name,
                        Surname = p.UserInfo.Surname,
                        Username = p.UserInfo.UName,
                        Status = p.UserInfo.Status
                    },
                    Content = p.Content,
                    Title = p.Title,
                    Description = p.Description,
                    UrlKey = p.UrlKey,
                    Id = p.Id,
                    CollectionId = p.CollectionId                    
                })
                .FirstOrDefault(p => p.Id == postId);
            if (ret.Post == null)
            {
                ret.IsActionSucceed = false;
                ret.ErrorInformation.RedirectUrl = "/";
                ret.ErrorInformation.UserInformation = "404";
                return ret;
            }
            ret.Post.AuthorInfo.ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", ret.Post.AuthorInfo.AppUserId);
            
            if (currentUserFollowings.Any(p=>p.Key == ret.Post.AuthorInfo.AppUserId))
            {
                ret.Post.AuthorInfo.FollowState = currentUserFollowings[ret.Post.AuthorInfo.AppUserId];
            }
            else
            {
                ret.Post.AuthorInfo.FollowState = FollowState.Unfollowed;
            }
            if (ret.Post.CollectionId.HasValue)
            {
                var cquery = _context.Set<PostCollection>().AsNoTracking().Select(p=> new {Collection = p,ThumbImage =p.ThumbFile,PostCount =p.Posts.Count(), p.UserInfo })
                    .FirstOrDefault(p => p.Collection.Id == ret.Post.CollectionId);
                ret.Post.CollectionInfo = new CollectionCard()
                {
                    Id = cquery.Collection.Id,
                    Name = cquery.Collection.Name,
                    PostsCount = cquery.PostCount,
                    ThumbImageUrl = cquery.ThumbImage?.SmallPath,
                    UserInfo = new UserInfoExtraSmall()
                    {
                        AppUserId = cquery.UserInfo.AppUserId,
                        ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", cquery.UserInfo.AppUserId),
                        UserName = cquery.UserInfo.AppUserId,
                    }
                };
            }

            ret.Post.IsCurrentUserLiked = !isLoggedIn ? false: userPostLikesIds.Contains(ret.Post.Id);
            ret.Post.PostGroups = GetPostGroups(ret.Post.Id, currUserId);
            ret.Post.PostParts = GetPostParts(ret.Post.Id);
            ret.Post.FavouriteCount = _postCacheService.GetPostLikesCount(ret.Post.Id) ?? GetPostLikeCount(ret.Post.Id, 20);
            ret.Post.Rating = GetPostRating(ret.Post.Id,0);
            int totalreviewCount = _context.Set<Review>().AsNoTracking()
                .Count(p => p.PostId == postId);

            if (totalreviewCount != 0)
            {
                if (reviewId.HasValue)
                {
                    ret.Reviews.Entities = _context.Set<Review>().AsNoTracking()
                    .Select(p => new ReviewActivityEntity()
                    {
                        DateUtcPublished = p.DateUtcPublished,
                        Content = p.Content,
                        Comments = new PaginatedComments(),
                        PostId = p.PostId.Value,
                        AuthorInfo = new BaseUserInfoDisplay()
                        {
                            AppUserId = p.UserId,
                            Name = p.UserInfo.Name,
                            Username = p.UserInfo.UName,
                            Surname = p.UserInfo.Surname,
                        },
                        Id = p.Id,
                        PostRate = p.PostRate ?? (double)ret.Post.Rating,
                        // Initial pageIndex is 6
                    })
                    .Where(p => p.Id==reviewId.Value && p.PostId == postId)
                    .ToPaginatedList(1, 6, totalreviewCount);
                }
                else
                {
                    ret.Reviews.Entities = _context.Set<Review>().AsNoTracking()                   
                   .Select(p => new ReviewActivityEntity()
                   {
                       DateUtcPublished = p.DateUtcPublished,
                       Content = p.Content,
                       Comments = new PaginatedComments(),
                       PostId = p.PostId.Value,
                       AuthorInfo = new BaseUserInfoDisplay()
                       {
                           AppUserId = p.UserId,
                           Name = p.UserInfo.Name,
                           Username = p.UserInfo.UName,
                           Surname = p.UserInfo.Surname,
                       },
                       Id = p.Id,
                       PostRate = p.PostRate ?? (double)ret.Post.Rating,
                       // Initial pageIndex is 6
                   })                   
                   .Where(p => p.PostId == postId)
                   .OrderByDescending(p => p.DateUtcPublished)
                   .Take(6)
                   .ToPaginatedList(1, 6, totalreviewCount);
                }
                
                foreach (var item in ret.Reviews.Entities)
                {                    
                    
                    item.AuthorInfo.ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", item.AuthorInfo.AppUserId);
                    item.CommentCount = _reviewCacheService.GetReviewCommentCount(item.Id) ?? _reviewDataService.GetReviewCommentCount(item.Id, 20);
                    item.DislikeCount = _reviewCacheService.GetReviewDislikeCount(item.Id) ?? _reviewDataService.GetReviewDislikeCount(item.Id, 30);
                    item.LikeCount = _reviewCacheService.GetReviewLikeCount(item.Id) ?? _reviewDataService.GetReviewLikeCount(item.Id, 30);
                    if (isLoggedIn)
                    {
                        if (userReviewLikesIds.Contains(item.Id))
                        {
                            item.LikeStatus = LikeStatus.Like;
                        }else if (userReviewDislikesIds.Contains(item.Id))
                        {
                            item.LikeStatus = LikeStatus.Dislike;
                        }
                        else
                        {
                            item.LikeStatus = LikeStatus.None;
                        }
                    }
                    else
                    {
                        item.LikeStatus = LikeStatus.None;
                    }
                }
            }
            int[] similiarPostIds = _postCacheService.GetSimiliarPostIds(postId);
            if (similiarPostIds == null)
            {
                // Get all posts from user and groups of post.
                int[] groupIds = ret.Post.PostGroups.Select(f => f.Id).ToArray();

                int[] postsOfGroupsids =_context.SetChild<GroupPost>()
                    .Select(f => new { f.PostId, f.GroupId }).Where(p => groupIds.Contains(p.GroupId)).Select(f => f.PostId).ToArray();

                var postNamesIds =  _context.Set<Post>()
                    .AsNoTracking()
                    .Where(p => (p.UserInfoId == ret.Post.AuthorInfo.AppUserId || postsOfGroupsids.Contains(p.Id) ) && p.IsPublished==true && p.Id != postId);
                Dictionary<int, int> levValuePostId = new Dictionary<int, int>();
                // foreach post calculate levenshtein difference
                foreach (var item in postNamesIds)
                {
                    int levValue = Fastenshtein.Levenshtein.Distance(ret.Post.Title, item.Title);
                    levValuePostId.Add(item.Id, levValue);
                }
                int[] toptwentySmiliar = levValuePostId.OrderBy(p => p.Value).Take(20).Select(f => f.Key).ToArray();
                ret.SimiliarPosts = postNamesIds.Select(q => new UserBestPost()
                {
                    Id = q.Id,
                    Title = q.Title,
                    ActiveThumbnailIndex = 0,
                    DateUtcPublished = q.DateUtcPublished,
                    UserInfo = new UserInfoExtraSmall()
                    {
                        AppUserId = q.UserInfoId,
                        UserName = q.UserInfo.UName,
                        ProfileImage = q.UserInfo.ProfilePicture.SmallPath
                    },
                    ThumbnailUrls = q.PostParts.Select(f => f.Image.SmallPath).ToList()
                }).Where(p => toptwentySmiliar.Contains(p.Id));
                // set cache long (Implementation upside punishing)
                _postCacheService.SetSimiliarPostIds(postId, toptwentySmiliar, 60 * 60);
            }
            else
            {
                ret.SimiliarPosts =  _context.Set<Post>()
                    .AsNoTracking()
                    .Select(q => new UserBestPost()
                    {
                        Id = q.Id,
                        Title = q.Title,
                        ActiveThumbnailIndex = 0,
                        UrlKey = q.UrlKey,
                        DateUtcPublished = q.DateUtcPublished,
                        Rating = q.Rating ?? 0,
                        UserInfo = new UserInfoExtraSmall()
                        {
                            AppUserId = q.UserInfoId,
                            UserName = q.UserInfo.UName,
                            ProfileImage = q.UserInfo.ProfilePicture.SmallPath
                        },
                        ThumbnailUrls = q.PostParts.Select(f => f.Image.SmallPath).ToList()
                    })
                    .Where(p => similiarPostIds.Contains(p.Id));
            }
            foreach (var item in ret.SimiliarPosts)
            {
                item.Rating = GetPostRating(item.Id, 0).Value;
            }
            
            return ret;
        }

        public PaginatedReviews GetPaginatedReviews(int postId, int pageIndex, int pageSize, string order,string currUserId)
        {
            bool isLoggedIn = !string.IsNullOrEmpty(currUserId);
            if (isLoggedIn)
            {
                GetUserLikes(currUserId);
            }
            else
            {
                currentUserFollowings = new Dictionary<string, FollowState>();
            }

            PaginatedReviews ret = new PaginatedReviews();
            int totalreviewCount = _context.Set<Review>().AsNoTracking()
                .Count(p => p.PostId == postId);

            if (totalreviewCount != 0)
            {

                ret.Entities = _context.Set<Review>().AsNoTracking()
                .Select(p => new ReviewActivityEntity()
                {
                    DateUtcPublished = p.DateUtcPublished,
                    Content = p.Content,
                    Comments = new PaginatedComments(),
                    PostId = p.PostId.Value,
                    AuthorInfo = new BaseUserInfoDisplay()
                    {
                        AppUserId = p.UserId,
                        Name = p.UserInfo.Name,
                        Username = p.UserInfo.UName,
                        Surname = p.UserInfo.Surname,
                    },
                    Id = p.Id,
                    PostRate = p.PostRate.Value,
                    // Initial pageIndex is 6
                })
                .Where(p => p.PostId == postId)
                .OrderByDescending(p => p.DateUtcPublished)
                .Skip(pageSize*(pageIndex-1))
                .Take(pageSize)
                .ToPaginatedList(pageIndex, pageSize, totalreviewCount);


                foreach (var item in ret.Entities)
                {

                    item.AuthorInfo.ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", item.AuthorInfo.AppUserId);
                    item.CommentCount = _reviewCacheService.GetReviewCommentCount(item.Id) ?? _reviewDataService.GetReviewCommentCount(item.Id, 20);
                    item.DislikeCount = _reviewCacheService.GetReviewDislikeCount(item.Id) ?? _reviewDataService.GetReviewDislikeCount(item.Id, 30);
                    item.LikeCount = _reviewCacheService.GetReviewLikeCount(item.Id) ?? _reviewDataService.GetReviewLikeCount(item.Id, 30);
                    if (isLoggedIn)
                    {
                        if (userReviewLikesIds.Contains(item.Id))
                        {
                            item.LikeStatus = LikeStatus.Like;
                        }
                        else if (userReviewDislikesIds.Contains(item.Id))
                        {
                            item.LikeStatus = LikeStatus.Dislike;
                        }
                        else
                        {
                            item.LikeStatus = LikeStatus.None;
                        }
                    }
                    else
                    {
                        item.LikeStatus = LikeStatus.None;
                    }
                }
            }
            return ret;
        }
        public ICollection<InterestCard> GetPostGroups(int postId,string currUserId)
        {
            bool isLoggedIn = !string.IsNullOrEmpty(currUserId);
            int[] gp =_context.SetChild<GroupPost>().AsNoTracking().Where(p => p.PostId == postId).Select(p=>p.GroupId).ToArray();
            IQueryable<InterestCard> ret = _context.Set<Group>().AsNoTracking()
                .Select(p => new InterestCard()
                {
                    AlphaColor = p.ColorAlpha,
                    Id = p.Id,
                    Name = p.Name,
                    UrlKey = p.UrlKey,
                    ProfileImage = p.ProfileImage.SmallPath
                })
                .Where(p => gp.Contains(p.Id));

            foreach (var item in ret)
            {
                item.FollowerCount = _groupCacheService.GetFollowingUserCount(item.Id) ?? _groupDataService.GetGroupFollowerCount(item.Id,20);
                item.IsCurrentUserFollowing = !isLoggedIn ? false : userGroupFollowIds.Contains(item.Id);                
            }
            return ret.ToList();
        }
        public ICollection<PostPartDisplay> GetPostParts(int postId)
        {
            return _context.Set<PostPart>().AsNoTracking()
                .Select(q => new { DbEntity = q, q.Image })
                .Where(p => p.DbEntity.PostId == postId)
                .Select(f=> new PostPartDisplay() {
                    Id=f.DbEntity.Id,
                    Description =f.DbEntity.Description,
                    Title = f.DbEntity.Title,
                    Image= new BaseImageReturn()
                    {
                        Dimension= f.Image.ImageDimension,
                        Extension= f.Image.FileExtension,
                        SmallUrl = f.Image.SmallPath,
                        ThumbUrl = f.Image.ThumbPath,
                        LazyUrl= f.Image.BlurLazyPath,
                        Url=f.Image.ResizedPath,
                    }
                }).ToList();
        }
        /// <summary>
        /// Get Post Like Count From Database
        /// </summary>
        /// <param name="postId">Post Id</param>
        /// <param name="setCache">True to set cache</param>
        /// <returns></returns>
        public int GetPostLikeCount(int postId, int cacheTreshold)
        {
            int postLikeCount =  _context.SetChild<UserPostLike>().AsNoTracking().Where(p => p.PostId == postId).Count();
            if (postLikeCount >= cacheTreshold)
            {
                _postCacheService.SetPostLikesCount(postId, postLikeCount, 40);
            }
            return postLikeCount;
        }

        public int GetPostReviewsCount(int postId)
        {           
            return _context.Set<Review>().AsNoTracking().Where(p => p.IsPublished == true && p.PostId == postId).Count();
        }
        public double? GetPostRating(int postId, double cacheTreshold)
        {
            var ret = _postCacheService.GetPostRating(postId);
            if (ret.HasValue)
            {
                return ret;
            }
            var reviews = _context.Set<Review>().AsNoTracking().Select(f=>new {f.PostId,f.UserReputation,f.PostRate }).Where(p=> p.PostId == postId);
            var totalCount = reviews.Count();
            if (totalCount==0)
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
                userGroupFollowIds = _userLikesDataService.GetUserFollowingGroups(currUserId,30);
                _userLikesCacheService.SetUserFollowingGroupsIds(currUserId, userGroupFollowIds, 20);
            }
            if(currentUserFollowings == null || currentUserFollowings.Count == 0)
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
