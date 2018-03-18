using fso.Caching.CachingServices;
using fso.Core.Domains;
using fso.Core.Extensions;
using fso.Core.Settings;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using fso.Settings.Image;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Linq;

namespace fso.Data.EntityRepositories
{
    public class PostCollectionDataService : IPostCollectionDataService
    {
        private readonly IEntityContext _entityContext;
        private readonly PostCollectionSettings collectionSettings;
        private readonly UserProfileImageSettings _userImageSettings;
        private readonly IUserLikesDataService _userLikesDataService;
        private readonly IUserLikeCacheService _userLikesCacheService;
        private readonly IPostCacheService _postCacheService;
        private readonly IPostDataService _postDataService;

        private int[] userPostLikesIds;

        public PostCollectionDataService(
            IEntityContext entityContext,
            IOptions<PostCollectionSettings> collectionOp,
            IOptions<UserProfileImageSettings> uiSettings,
            IUserLikesDataService userLikesDataService,
            IUserLikeCacheService userLikesCacheService,
            IPostCacheService postCacheService,
            IPostDataService postDataService
            )
        {
            _entityContext = entityContext;
            collectionSettings = collectionOp.Value;
            _userImageSettings = uiSettings.Value;
            _userLikesDataService = userLikesDataService;
            _userLikesCacheService = userLikesCacheService;
            _postCacheService = postCacheService;
            _postDataService = postDataService;
        }

        public CollectionIndexReturnModel GetCollection(int collectionId, int postPageIndex, int postPageSize, string currUserId)
        {
            CollectionIndexReturnModel ret = new CollectionIndexReturnModel();
            ret.Collection = _entityContext.Set<PostCollection>().AsNoTracking().Select(p => new CollectionCard()
            {
                DateUtcModified = p.DateUtcModified,
                Description = p.Description,
                Id = p.Id,
                Name = p.Name,
                ThumbImageUrl = p.ThumbFile.ThumbPath,
                UserInfo = new UserInfoExtraSmall()
                {
                    AppUserId = p.UserInfoId,
                    UserName = p.UserInfo.UName,
                    ProfileImage = _userImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", p.UserInfoId),
                },
                UserInfoId=p.UserInfoId
            }).FirstOrDefault(p => p.Id == collectionId);
            ret.Posts = GetCollectionPosts(collectionId, postPageIndex, postPageSize, currUserId);
            ret.Collection.PostsCount = ret.Posts.TotalCount;
            return ret;
        }
        public PaginatedPostCardReturn GetCollectionPosts(int collectionId, int pageIndex, int pageSize, string currUserId)
        {
            bool isLoggedIn = !string.IsNullOrEmpty(currUserId);
            if (isLoggedIn)
            {
                GetUserPostLikes(currUserId);
            }
            PaginatedPostCardReturn ret = new PaginatedPostCardReturn();
            int totalCount = _entityContext.Set<Post>().Count(p => p.CollectionId == collectionId && p.IsPublished);
            var entities = _entityContext.Set<Post>()
                        .AsNoTracking()
                        .Where(p => p.IsPublished == true && p.CollectionId == collectionId)
                        .OrderByDescending(p => p.DateUtcPublished)
                        .Skip((pageIndex - 1) * pageSize)
                        .Take(pageSize)
                        .Select(p => new PostCardModel()
                        {
                            DateUtcPublished = p.DateUtcPublished,
                            AuthorInfo = new UserCardModel()
                            {
                                AppUserId = p.UserInfoId,
                                Name = p.UserInfo.Name,
                                Username = p.UserInfo.UName,
                                Surname = p.UserInfo.Surname,
                                ProfileImage = p.UserInfo.ProfilePicture.SmallPath
                            },
                            Content = p.Content,
                            Title = p.Title,
                            PostParts = p.PostParts.Select(f => new PostPartDisplay()
                            {
                                Description = f.Description,
                                Image = new BaseImageReturn()
                                {
                                    Dimension = f.Image.ImageDimension,
                                    Extension = f.Image.FileExtension,
                                    LazyUrl = f.Image.BlurLazyPath,
                                    Url = f.Image.ThumbPath,
                                    SmallUrl = f.Image.SmallPath
                                },
                                Title = f.Title,
                                Id = f.Id
                            }).ToList(),
                            Id = p.Id,
                        }).ToList();

            foreach (var post in entities)
            {
                
                post.IsCurrentUserLiked = isLoggedIn ? userPostLikesIds.Contains(post.Id) : false;
                post.FavouriteCount = _postCacheService.GetPostLikesCount(post.Id)
                                ?? _postDataService.GetPostLikeCount(post.Id, cacheTreshold: 20);
                post.ReviewCount = _postDataService.GetPostReviewsCount(post.Id);
                post.Rating = post.Rating = GetPostRating(post.Id, 30);
            }
            ret.Entities = entities.ToPaginatedList(pageIndex, pageSize, totalCount);

            return ret;
        }

        public double? GetPostRating(int postId, double cacheTreshold)
        {
            var ret = _postCacheService.GetPostRating(postId);
            if (ret.HasValue)
            {
                return ret;
            }
            var reviews = _entityContext.Set<Review>().AsNoTracking().Select(f => new { f.PostId, f.UserReputation, f.PostRate }).Where(p => p.PostId == postId);
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

        private void GetUserPostLikes(string currUserId)
        {
            userPostLikesIds = _userLikesCacheService.GetUserLikedPostsIds(currUserId);
            if (userPostLikesIds == null || userPostLikesIds.Count() == 0)
            {
                userPostLikesIds = _userLikesDataService.GetUserLikedPostsIds(currUserId);
                _userLikesCacheService.SetUserLikedPostsIds(currUserId, userPostLikesIds, 20);
            }
        }
    }
}
