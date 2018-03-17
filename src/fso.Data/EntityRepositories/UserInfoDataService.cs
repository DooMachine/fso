using fso.Core.Domains;
using fso.DataExtensions.DataServices;
using Microsoft.EntityFrameworkCore;
using fso.DataExtensions.Models.UserInfo;
using System.Linq;
using fso.Core.Domains.MMEntities;
using AutoMapper;
using fso.Caching.CachingServices;
using fso.DataExtensions.Models;
using fso.Core.Domains.Helpers;
using fso.DataExtensions.Models.User;
using System.Collections.Generic;
using fso.Core.Extensions;
using System;
using fso.DataExtensions.Models.GroupReturnModels;
using fso.DataExtensions.Models.Collections;
using Microsoft.Extensions.Options;
using fso.Settings.Image;
using fso.DataExtensions.Models.Review;

namespace fso.Data.EntityRepositories
{
    public class UserInfoDataService : IUserInfoDataService
    {
        private readonly IEntityContext _context;
        private readonly IUserInfoCacheService _userCacheService;
        private readonly IUserLikesDataService _userLikesDataService;
        private readonly IUserLikeCacheService _userLikesCacheService;
        private readonly IUserFollowCacheService _userFollowCacheService;
        private readonly IPostCacheService _postCacheService;
        private readonly IPostDataService _postDataService;
        private readonly IGroupCacheService _groupFollowCacheService;
        private readonly IReviewCacheService _reviewCacheService;
        private readonly IReviewDataService _reviewDataService;
        private readonly UserProfileImageSettings _userProfileImageSettings;

        int[] userPostLikesIds;
        int[] userReviewLikesIds;
        int[] userCommentLikesIds;
        int[] userReviewDislikesIds;
        int[] userCommentDislikesIds;


        private readonly IMapper _mapper;
        public UserInfoDataService(
            IEntityContext context,
            IUserInfoCacheService userCacheService,
            IUserFollowCacheService userFollowCacheService,
            IGroupCacheService groupFollowCacheService,
            IUserLikesDataService userLikesDataService,
            IUserLikeCacheService userLikesCacheService,
            IPostCacheService postCacheService,
            IPostDataService postDataService,
            IReviewCacheService reviewCacheService,
            IReviewDataService reviewDataService,
            IMapper mapper,
            IOptions<UserProfileImageSettings> userImageSettings
            )
        {
            _context = context;
            _userCacheService = userCacheService;
            _userFollowCacheService = userFollowCacheService;
            _groupFollowCacheService = groupFollowCacheService;
            _mapper = mapper;
            _userProfileImageSettings = userImageSettings.Value;
            _userLikesCacheService = userLikesCacheService;
            _reviewCacheService = reviewCacheService;
            _reviewDataService = reviewDataService;
            _userLikesDataService = userLikesDataService;
            _postCacheService = postCacheService;
            _postDataService = postDataService;
        }

        public UserInfoProfileReturn GetUserProfileInfo(string userName, string currUserId)
        {
            UserInfoProfileReturn ret;
            var uInfo = _context.Set<UserInfo>().AsNoTracking().Select(p=> new {Entity = p, p.ProfilePicture }).FirstOrDefault(p => p.Entity.UName == userName);
            if (uInfo==null)
            {
                ret = new UserInfoProfileReturn();
                ret.IsActionSucceed = false;
                ret.ErrorInformation.ErrorType = ErrorType.NotFound;
                ret.ErrorInformation.UserInformation = "User not found!";
                return ret;
            }
            var followEntity = _context.SetChild<FollowInfo>().AsNoTracking().FirstOrDefault(p => p.FollowerId == currUserId && p.FollowedId == uInfo.Entity.AppUserId);
            var followedEntity = _context.SetChild<FollowInfo>().AsNoTracking().FirstOrDefault(p => p.FollowerId == uInfo.Entity.AppUserId && p.FollowedId == currUserId);
            var followState = followEntity == null ? FollowState.Unfollowed : followEntity.FollowState;
            var followedState = followedEntity == null ? FollowState.Unfollowed : followedEntity.FollowState;

            ret = new UserInfoProfileReturn()
            {
                Id = uInfo.Entity.Id,
                Status = uInfo.Entity.Status,
                AppUserId = uInfo.Entity.AppUserId,
                AlphaColor = uInfo.Entity.AlphaColor,
                Username = uInfo.Entity.UName,
                Name = uInfo.Entity.Name,
                TotalReputation = _userCacheService.GetUserReputation(uInfo.Entity.AppUserId) ?? GetUserReputation(uInfo.Entity.AppUserId, 0),
                ProfileImageUrl = uInfo.ProfilePicture?.SmallPath ?? _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}",uInfo.Entity.AppUserId),
                Surname = uInfo.Entity.Surname,
                InterestCount = _userCacheService.GetUserInterestCount(uInfo.Entity.AppUserId) ?? GetUserInterestCount(uInfo.Entity.AppUserId, 60),
                FollowingCount = _userFollowCacheService.GetUserFollowingCount(uInfo.Entity.AppUserId) ?? GetUserFollowingCount(uInfo.Entity.AppUserId, 60),
                FollowerCount = _userFollowCacheService.GetUserFollowerCount(uInfo.Entity.AppUserId) ?? GetUserFollowerCount(uInfo.Entity.AppUserId, 60),
                FollowingState = followState,
                CurrentUserFollowedState = followedState,
            };
            return ret;
        }

        public FollowUserReturn FollowUser(string followedUsername, string followingId)
        {
            FollowUserReturn ret = new FollowUserReturn();
            if (string.IsNullOrEmpty(followedUsername) || string.IsNullOrEmpty(followingId))
            {
                ret.LastFollowState = FollowState.Unfollowed;
                ret.IsActionSucceed = false;
                return ret;
            }
            UserInfo followedUser = _context.Set<UserInfo>().AsNoTracking().FirstOrDefault(f => f.UName == followedUsername);
            FollowInfo fInfo = _context.SetChild<FollowInfo>().FirstOrDefault(p => p.FollowerId == followingId && p.FollowedId == followedUser.AppUserId);
            if(followedUser.AppUserId == followingId)
            {
                ret.LastFollowState = FollowState.Unfollowed;
                ret.IsActionSucceed = false;
                return ret;
            }
            if (fInfo == null)
            {
                FollowInfo newFollow = new FollowInfo()
                {
                    FollowerId = followingId,
                    FollowedId = followedUser.AppUserId,
                    DateUtcFollowed = DateTime.UtcNow
                };
                if (followedUser.FollowSetting == UserFollowSetting.Ask_All)
                {
                    newFollow.FollowState = FollowState.Pending;
                    ret.LastFollowState = FollowState.Pending;
                }
                else 
                if(followedUser.FollowSetting == UserFollowSetting.Confirm_All)
                {
                    newFollow.FollowState = FollowState.Confirmed;
                    ret.LastFollowState = FollowState.Confirmed;
                }
                else
                if(followedUser.FollowSetting == UserFollowSetting.Deny_All)
                {
                    ret.LastFollowState = FollowState.Unfollowed;
                    return ret;
                }
                ret.FollowedUserId = followedUser.AppUserId;
                _context.SetChild<FollowInfo>().Add(newFollow);                
            }
            else
            {
                if(fInfo.FollowState == FollowState.FollowerBlocked_Followed || fInfo.FollowState == FollowState.FollowedBlocked_Follower)
                {
                    ret.IsActionSucceed = false;
                    ret.ErrorInformation.UserInformation = "Cannot follow blocked users.";
                    ret.LastFollowState = FollowState.FollowedBlocked_Follower;
                }
                else if(fInfo.FollowState == FollowState.Unfollowed)
                {
                    if (followedUser.FollowSetting == UserFollowSetting.Ask_All)
                    {
                        fInfo.FollowState = FollowState.Pending;
                        ret.LastFollowState = FollowState.Pending;
                    }
                    else
                    if (followedUser.FollowSetting == UserFollowSetting.Confirm_All)
                    {
                        fInfo.FollowState = FollowState.Confirmed;
                        ret.LastFollowState = FollowState.Confirmed;
                    }
                    else
                    if (followedUser.FollowSetting == UserFollowSetting.Deny_All)
                    {
                        ret.LastFollowState = FollowState.Unfollowed;
                        return ret;
                    }
                }
                _context.SetChild<FollowInfo>().Update(fInfo);
            }
            if (_context.SaveChanges() != 0)
            {
                _userFollowCacheService.RemoveAllUserCache(followingId);
                ret.IsActionSucceed = true;
                
            };
            return ret;
        }

        public FollowUserReturn UnFollowUser(string unFollowedUsername, string followingId)
        {
            FollowUserReturn ret = new FollowUserReturn();
            if (string.IsNullOrEmpty(unFollowedUsername) || string.IsNullOrEmpty(followingId))
            {
                ret.LastFollowState = FollowState.Unfollowed;
                return ret;
            }
            UserInfo uInfo = _context.Set<UserInfo>().AsNoTracking().Include(f=>f.Followers).FirstOrDefault(f => f.UName == unFollowedUsername);
            FollowInfo finf = uInfo.Followers.FirstOrDefault(f => f.FollowerId == followingId && f.FollowedId== uInfo.AppUserId);
            if (finf==null)
            {
                ret.IsActionSucceed = false;
                ret.ErrorInformation.UserInformation = "You are not following this user";
                ret.ErrorInformation.ErrorType = ErrorType.NoAction;
                ret.LastFollowState = FollowState.Unfollowed;
                return ret;
            }
            finf.FollowState = FollowState.Unfollowed;
            ret.LastFollowState = FollowState.Unfollowed;
            _context.SetChild<FollowInfo>().Update(finf);
            if (_context.SaveChanges() != 0)
            {
                _userFollowCacheService.RemoveAllUserCache(followingId);
                ret.IsActionSucceed = true;
            };            
            return ret;
        }

        public PaginatedList<UserCardModel> GetUserFollowings(string userName, int pageIndex, int pageSize, string currUserId)
        {
            PaginatedList<UserCardModel> ret = new PaginatedList<UserCardModel>();
            UserInfo user = _context.Set<UserInfo>().AsNoTracking().FirstOrDefault(p => p.UName == userName);
            Dictionary<string,FollowState> currentUserFollowInfo = _userFollowCacheService.GetFollowingUserIds(currUserId);
            // If cache not holding current user follow info get from database and set cache
            if (currentUserFollowInfo == null)
            {
                currentUserFollowInfo = _context.SetChild<FollowInfo>().AsNoTracking().Where(p => p.FollowerId == currUserId).Select(p => new { p.FollowedId, p.FollowState }).ToDictionary(t => t.FollowedId, t => t.FollowState); ;
                _userFollowCacheService.SetFollowingUserIds(currUserId, currentUserFollowInfo, 60);
            }

            // If Current User is not following the user dont return data and user is not self
            if (!currentUserFollowInfo.Any(p=>p.Key == user.AppUserId && p.Value == FollowState.Confirmed) && currUserId != user.AppUserId)
            {
                return ret;
            }
            
            // Get Followed User Ids
            List<string> followedUserIds = _context.SetChild<FollowInfo>().AsNoTracking()
                .Where(p => p.FollowerId == user.AppUserId && p.FollowState == FollowState.Confirmed)
                .OrderByDescending(p => p.DateUtcFollowed)
                .Skip((pageIndex-1) * pageSize)
                .Take(pageSize).Select(p => p.FollowedId).ToList();
            // Get Followed User Count
            int totalCount = _userFollowCacheService.GetUserFollowingCount(user.AppUserId) ??
                _context.SetChild<FollowInfo>().AsNoTracking().Where(p => p.FollowerId == user.AppUserId && p.FollowState == FollowState.Confirmed).Count();
            
            // Get User Data From Database
            IQueryable<UserCardModel> userCards = _context.Set<UserInfo>().AsNoTracking().Where(p => followedUserIds.Contains(p.AppUserId))
                .Select(p => new UserCardModel()
                {
                    AppUserId = p.AppUserId,
                    ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}",p.AppUserId),
                    Username = p.UName,
                });
            // Get Total Reputation
            foreach (var item in userCards)
            {
                item.Reputation = _userCacheService.GetUserReputation(item.AppUserId) ?? GetUserReputation(item.AppUserId, 1200);
                // Check if the current user follows the users fetched from database
                var followState = currentUserFollowInfo.SingleOrDefault(p => p.Key == item.AppUserId);
                item.FollowState = followState.Key == null ? FollowState.Unfollowed : followState.Value;
                ret.Add(item);
            }
            
           
            // return as paginated
            return ret.ToPaginatedList(pageIndex,pageSize,totalCount);
        }

        public PaginatedList<UserCardModel> GetUserFollowers(string userName, int pageIndex, int pageSize, string currUserId)
        {
            PaginatedList<UserCardModel> ret = new PaginatedList<UserCardModel>();
            UserInfo user = _context.Set<UserInfo>().AsNoTracking().FirstOrDefault(p => p.UName == userName);
            Dictionary<string, FollowState> currentUserFollowInfo = _userFollowCacheService.GetFollowingUserIds(currUserId);
            // If cache not holding current user follow info get from database and set cache
            if (currentUserFollowInfo == null)
            {
                currentUserFollowInfo = _context.SetChild<FollowInfo>().AsNoTracking().Where(p => p.FollowerId == currUserId).Select(p => new { p.FollowedId, p.FollowState }).ToDictionary(t => t.FollowedId, t => t.FollowState); ;
                _userFollowCacheService.SetFollowingUserIds(currUserId, currentUserFollowInfo, 60);
            }
            // If current user not following the userName dont return a value.
            if (!currentUserFollowInfo.Any(p => p.Key == user.AppUserId && p.Value == FollowState.Confirmed) && currUserId != user.AppUserId)
            {
                return ret;
            }
            
            // Get Follower User Ids
            List<string> followerUserIds = _context.SetChild<FollowInfo>().AsNoTracking()
                .Where(p => p.FollowedId == user.AppUserId && p.FollowState == FollowState.Confirmed)
                .OrderByDescending(p => p.DateUtcFollowed)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize).Select(p => p.FollowerId).ToList();
            // Get Follower User Count
            int totalCount = _userFollowCacheService.GetUserFollowerCount(user.AppUserId) ??
                _context.SetChild<FollowInfo>().AsNoTracking().Where(p => p.FollowedId == user.AppUserId && p.FollowState == FollowState.Confirmed).Count();
            // Get User Data From Database
            IQueryable<UserCardModel> userCards = _context.Set<UserInfo>().AsNoTracking().Where(p => followerUserIds.Contains(p.AppUserId))
                .Select(p => new UserCardModel()
                {
                    AppUserId = p.AppUserId,
                    ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", p.AppUserId),                    
                    Username = p.UName
                });
            // Get Reputation
            foreach (var item in userCards)
            {
                item.Reputation = _userCacheService.GetUserReputation(item.AppUserId) ?? GetUserReputation(item.AppUserId, 500);
                var followState = currentUserFollowInfo.SingleOrDefault(p => p.Key == item.AppUserId);
                item.FollowState = followState.Key == null ? FollowState.Unfollowed : followState.Value;
                ret.Add(item);
            }
            // Check if the current user follows the users fetched from database
            
            // return as paginated
            return ret.ToPaginatedList(pageIndex, pageSize, totalCount);
        }

        public UserInterestsReturn GetUserInterests(string userName, int pageIndex, int pageSize, string currUserId)
        {
            UserInterestsReturn ret = new UserInterestsReturn();
            // Get User Id
            string userId = GetUserId(userName);
            // Get Following Interest From Cache
            int[] followedInterestIds = _userLikesCacheService.GetUserFollowingGroupsIds(userId);
            // If Cache is Null Get From Database OrderedBy Reputation and Set Cache
            if (followedInterestIds == null || followedInterestIds.Count() == 0)
            {
                followedInterestIds = _context.SetChild<UserGroup>().AsNoTracking().Where(p => p.UserId == userId && p.GroupFollowState == GroupFollowState.Followed)
                    .OrderByDescending(p=>p.UserReputationInGroup).Select(p=>p.GroupId).ToArray();

                _userLikesCacheService.SetUserFollowingGroupsIds(userId, followedInterestIds, 60);
            }
            // Paginate Group Ids' so we don't need to paginate them in database query
            int[] paginatedFollowedInterestIds = followedInterestIds.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToArray();
            // Load CurrentUser Groups To Check If User Following These Groups
            int[] currentUserFollowingGroups = _userLikesCacheService.GetUserFollowingGroupsIds(currUserId);
            if(currentUserFollowingGroups == null || currentUserFollowingGroups.Count() == 0)
            {
                currentUserFollowingGroups = _context.SetChild<UserGroup>().AsNoTracking()
                    .Where(p => p.UserId == currUserId && p.GroupFollowState == GroupFollowState.Followed)
                    .Select(p=> p.GroupId).ToArray();
                _userLikesCacheService.SetUserFollowingGroupsIds(currUserId, currentUserFollowingGroups, 60);
            }
            // Fetch  Groups from database

            List<InterestCard> groups = _context.Set<Group>().AsNoTracking().Where(p => paginatedFollowedInterestIds.Contains(p.Id)).Select(p => new InterestCard()
            {
                CoverImage = p.CoverImage.ThumbPath,
                Id = p.Id,                
                IsCurrentUserFollowing = currentUserFollowingGroups.Any(s => s == p.Id),
                Name = p.Name,
                AlphaColor = p.ColorAlpha,
                ProfileImage = p.ProfileImage.SmallPath,
                UrlKey = p.UrlKey
            }).ToList();
            // Foreach group Set Follower Count
            foreach (var group in groups)
            {
                // Get From Cache
                int? followerCount = _groupFollowCacheService.GetFollowingUserCount(group.Id);
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
                    _groupFollowCacheService.SetFollowingUserCount(group.Id, count, 60);
                }                
            }
            ret.Entities = groups.ToPaginatedList(pageIndex, pageSize, followedInterestIds.Count());
            return ret;
        }
        public UserInterestsReturn GetUserInterests(string userName, int pageIndex, int pageSize)
        {
            UserInterestsReturn ret = new UserInterestsReturn();
            // Get User Id
            string userId = GetUserId(userName);
            // Get Following Interest From Cache
            int[] followedInterestIds = _userLikesCacheService.GetUserFollowingGroupsIds(userId);
            // If Cache is Null Get From Database OrderedBy Reputation and Set Cache
            if (followedInterestIds == null)
            {
                followedInterestIds = _context.SetChild<UserGroup>().AsNoTracking().Where(p => p.UserId == userId && p.GroupFollowState == GroupFollowState.Followed)
                    .OrderByDescending(p => p.UserReputationInGroup).Select(p => p.GroupId).ToArray();

                _userLikesCacheService.SetUserFollowingGroupsIds(userId, followedInterestIds, 60);
            }
            // Paginate Group Ids' so we don't need to paginate them in database query
            int[] paginatedFollowedInterestIds = followedInterestIds.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToArray();
            // Fetch  Groups from database
            List<InterestCard> groups = _context.Set<Group>().AsNoTracking().Where(p => paginatedFollowedInterestIds.Contains(p.Id))
                .Select(p => new InterestCard()
                {
                    CoverImage = p.CoverImage.ThumbPath,
                    Id = p.Id,
                    IsCurrentUserFollowing = false,
                    Name = p.Name,
                    AlphaColor = p.ColorAlpha,
                    ProfileImage = p.ProfileImage.SmallPath,
                    UrlKey = p.UrlKey
                }).ToList();
            // Foreach group Set Follower Count
            foreach (var group in groups)
            {
                // Get From Cache
                int? followerCount = _groupFollowCacheService.GetFollowingUserCount(group.Id);
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
                    _groupFollowCacheService.SetFollowingUserCount(group.Id, count, 60);
                }
            }
            ret.Entities = groups.ToPaginatedList(pageIndex, pageSize, followedInterestIds.Count());
            return ret;
        }
        public IQueryable<UserGroup> GetFollowedUserGroups(string appUserId)
        {
            return _context.SetChild<UserGroup>().Where(p => p.UserId == appUserId);
        }
        /// <summary>
        /// Not using
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public UserBestPostsReturn GetBestPosts(string userName, int pageSize)
        {
            UserBestPostsReturn ret = new UserBestPostsReturn()
            {
                Posts = new List<UserBestPost>()
            };
            // Get User Id
            string userId = GetUserId(userName);

            ret.Posts = _context.Set<Post>()
                .AsNoTracking()
                .Where(p => p.UserInfoId == userId && p.IsPublished)
                .OrderByDescending(p => p.Rating)
                .Take(pageSize)
                .Select(f => new UserBestPost() {
                    Title = f.Title,
                    Id = f.Id,         
                }).ToList();

            
            var postIds = ret.Posts.Select(p => p.Id);

            var postParts =  _context.Set<PostPart>().AsNoTracking().Select(p=> new {  p.Id, p.PostId }).Where(p => postIds.Contains(p.PostId.Value)).ToList();

            var postPartIds = postParts.Select(f => f.Id);

            var thumbnails = _context.Set<AppMediaFile>().AsNoTracking().Select(p => new { p.SmallPath, p.PostPartId }).Where(p => postPartIds.Contains(p.PostPartId.Value));

                           
            foreach (var post in ret.Posts)
            {
                post.ThumbnailUrls = new List<string>();
                post.ActiveThumbnailIndex = 0;
                var belongingPostParts = postParts.Where(p => p.PostId == post.Id);
                foreach (var postpart in belongingPostParts)
                {
                    string belongThumb = thumbnails.First(p => p.PostPartId == postpart.Id).SmallPath;
                    post.ThumbnailUrls.Add(belongThumb);
                }
            };
            return ret;
        }
        public UserPostsReturn GetUserPosts(string userName, string currUserId, int pageIndex = 0, int pageSize = 0)
        {
            GetUserPostLikes(currUserId);
            UserPostsReturn ret = new UserPostsReturn();
            string userId = GetUserId(userName);
            // Get Users post Count From Cache
            int? totalPostCount = _userCacheService.GetUserPostsCount(userId);
            

            // If null Get From Database and set Cache 60Min
            if (!totalPostCount.HasValue)
            {
                totalPostCount = _context.Set<Post>()
                .AsNoTracking()
                .Where(p => p.IsPublished == true && p.UserInfoId == userId).Count();
                _userCacheService.SetUserPostsCount(userId, totalPostCount.Value, 60);
            }

            var entities = _context.Set<Post>()
                        .AsNoTracking()
                        .Where(p => p.IsPublished == true && p.UserInfoId == userId)
                        .OrderByDescending(p=>p.DateUtcPublished)
                        .Skip((pageIndex-1) * pageSize)
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
                                    ThumbUrl = f.Image.ThumbPath,
                                    Url = f.Image.ResizedPath,
                                    SmallUrl = f.Image.SmallPath
                                },
                                Title = f.Title,
                                Id = f.Id
                            }).ToList(),
                            Id = p.Id,
                        }).ToList();

            foreach (var post in entities)
            {
                post.IsCurrentUserLiked = userPostLikesIds.Contains(post.Id);
                post.FavouriteCount = _postCacheService.GetPostLikesCount(post.Id)
                                ?? _postDataService.GetPostLikeCount(post.Id, cacheTreshold: 20);
                post.ReviewCount = _postDataService.GetPostReviewsCount(post.Id);
                post.Rating = post.Rating = GetPostRating(post.Id, 30);
            }
            ret.Entities = entities.ToPaginatedList(pageIndex, pageSize, totalPostCount.Value);
            return ret;
        }
        public UserPostCollectionsReturn GetUserPostCollections(string userName, int pageIndex, int pageSize, string order="dateUtcModified")
        {
            UserPostCollectionsReturn ret = new UserPostCollectionsReturn();

            if (string.IsNullOrWhiteSpace(userName))
            {
                return ret;
            }
            
            var author = GetUserCardInfo(userName);
            var collectionCount =  _context.Set<PostCollection>().Count(p => p.UserInfoId == author.AppUserId);
            var collections =  _context.Set<PostCollection>().AsNoTracking()
                .Select(f => new CollectionCard()
                {
                    Id = f.Id,
                    Name = f.Name,
                    PostsCount = f.Posts.Count(),
                    DateUtcModified = f.DateUtcModified,
                    ThumbImageUrl = f.ThumbFile.ThumbPath,
                    UserInfo = author,
                    UserInfoId = f.UserInfoId
                })
                .Where(p => p.UserInfoId == author.AppUserId)
                .OrderByDescending(p=>p.DateUtcModified)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize);
            ret.Entities = collections.ToPaginatedList(pageIndex, pageSize, collectionCount);
            return ret;
        }
        public PaginatedPostCardReturn GetUserFavourites(string userName, int pageIndex, int pageSize, string order,string currUserId)
        {
            bool isLoggedIn = !string.IsNullOrEmpty(currUserId);

            PaginatedPostCardReturn ret = new PaginatedPostCardReturn();
            if (isLoggedIn)
            {
                GetUserPostLikes(currUserId);
            }

            string userId = GetUserId(userName);
            int [] favPostLikesIds = _userLikesCacheService.GetUserLikedPostsIds(userId);
            if (favPostLikesIds == null || favPostLikesIds.Count() == 0)
            {
                favPostLikesIds = _userLikesDataService.GetUserLikedPostsIds(userId);
                _userLikesCacheService.SetUserLikedPostsIds(userId, favPostLikesIds, 20);
            }
            // Get Users post Count From Cache
            int? favouriteCount = favPostLikesIds.Count();

            // If null Get From Database and set Cache 60Min
            if (!favouriteCount.HasValue)
            {
                var favourites = _context.SetChild<UserPostLike>()
                            .AsNoTracking().Where(p => p.UserInfoId == userId);

                favouriteCount = _context.SetChild<UserPostLike>()
                            .AsNoTracking().Count(p => p.UserInfoId == userId);

                _userCacheService.SetUserFavouriteCount(userId, favouriteCount.Value, 60);
                if(favouriteCount == 0)
                {
                    return ret;
                }
            }

            var entities = _context.Set<Post>()
                        .AsNoTracking()
                        .Where(p => favPostLikesIds.Skip((pageIndex-1)*pageSize).Take(pageSize).Contains(p.Id) && p.IsPublished)
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
                                    ThumbUrl = f.Image.ThumbPath,
                                    Url = f.Image.ResizedPath,
                                    SmallUrl = f.Image.SmallPath
                                },
                                Title = f.Title,
                                Id = f.Id
                            }).ToList(),
                            Id = p.Id,
                        }).ToList();

            foreach (var post in entities)
            {
                post.IsCurrentUserLiked = userPostLikesIds.Contains(post.Id);
                post.FavouriteCount = _postCacheService.GetPostLikesCount(post.Id)
                                ?? _postDataService.GetPostLikeCount(post.Id, cacheTreshold: 20);
                post.ReviewCount = _postDataService.GetPostReviewsCount(post.Id);
                post.Rating = GetPostRating(post.Id, 30);
            }
            ret.Entities = entities.ToPaginatedList(pageIndex, pageSize, favouriteCount.Value);
            return ret;
        }
        public UserReviewsReturnModel GetUserReviews(string userName, int pageIndex, int pageSize, string order, string currUserId)
        {
            bool isLoggedIn = !string.IsNullOrEmpty(currUserId);
            if (isLoggedIn)
            {
                GetUserLikes(currUserId);
            }
            string appUserId = _context.Set<UserInfo>().AsNoTracking().FirstOrDefault(p => p.UName == userName).AppUserId;

            UserReviewsReturnModel ret = new UserReviewsReturnModel();

            int reviewCount = _context.Set<Review>().AsNoTracking().Count(p => p.UserId == appUserId && p.IsPublished);

            if (reviewCount == 0) return ret;

            ret.Entities = _context.Set<Review>().AsNoTracking()
                .Include(p=>p.Comments)
                .Where(p=>p.UserId == appUserId)
                .OrderByDescending(p => p.DateUtcAdd)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .Select(p=> new
                {
                    Entity = p,
                    p.UserInfo,
                    p.ReputationGains,
                    CommentCount = p.Comments.Count()
                })                
                .Select(p => new ReviewActivityEntity()
                {
                    DateUtcPublished = p.Entity.DateUtcPublished,
                    Id = p.Entity.Id,
                    PostId = p.Entity.PostId ?? 0,
                    Content = p.Entity.Content,
                    PostRate = p.Entity.PostRate ?? 0,
                    CommentCount = p.CommentCount,
                    AuthorInfo = new BaseUserInfoDisplay()
                    {
                        AppUserId = p.UserInfo.AppUserId,
                        Username = p.UserInfo.UName,
                        ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}",p.UserInfo.AppUserId),
                        Name = p.UserInfo.Name,
                        Surname = p.UserInfo.Surname
                    },                    
                }).ToPaginatedList(pageIndex, pageSize, reviewCount);

            foreach (var item in ret.Entities)
            {
                item.LikeCount = _reviewCacheService.GetReviewLikeCount(item.Id) ?? _reviewDataService.GetReviewLikeCount(item.Id,1);
                item.DislikeCount = _reviewCacheService.GetReviewDislikeCount(item.Id) ?? _reviewDataService.GetReviewDislikeCount(item.Id, 1);
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
            int[] postIds = ret.Entities.Select(p => p.PostId).ToArray();

            ret.Posts = _context.Set<Post>().AsNoTracking()
                .Include(p => p.PostParts)
                .ThenInclude(p => p.Image)
                .Select(p => new { Entity = p, p.UserInfo, p.ReputationGains, p.Groups,ReviewCount = p.Reviews.Count() })
                .Where(p => postIds.Contains(p.Entity.Id))
                .Select(p=> new PostActivityEntity()
                {
                    DateUtcPublished = p.Entity.DateUtcPublished,
                    Content = p.Entity.Content,
                    Title = p.Entity.Title,
                    Id = p.Entity.Id,
                    ReviewCount = p.ReviewCount,
                    PostParts = p.Entity.PostParts.Select(f => new PostPartDisplay()
                    {
                        Description = f.Description,
                        Id = f.Id,
                        Image = new BaseImageReturn()
                        {
                            Dimension = f.Image.ImageDimension,
                            Extension = f.Image.FileExtension,
                            LazyUrl = f.Image.BlurLazyPath,
                            SmallUrl = f.Image.SmallPath,
                            ThumbUrl = f.Image.ThumbPath,
                            Url = f.Image.ResizedPath
                        },
                        PostId = f.PostId,
                        Title = f.Title
                    }).ToList(),
                    AuthorInfo = new BaseUserInfoDisplay()
                    {
                        AppUserId = p.UserInfo.AppUserId,
                        Name = p.UserInfo.Name,
                        ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}",p.UserInfo.AppUserId),
                        Surname = p.UserInfo.Surname,
                        Username = p.UserInfo.UName
                    }                    
                })
                .ToList();
            foreach (var post in ret.Posts)
            {
                post.IsCurrentUserLiked = isLoggedIn ? userPostLikesIds.Contains(post.Id) : false;
                post.FavouriteCount = _postCacheService.GetPostLikesCount(post.Id)
                                ?? _postDataService.GetPostLikeCount(post.Id, cacheTreshold: 20);
                post.ReviewCount = _postDataService.GetPostReviewsCount(post.Id);
                post.Rating = post.Rating = GetPostRating(post.Id, 30); 
            }
            return ret;
        }
        public FollowGroupReturn FollowGroup(string appUserId, int groupId)
        {
            FollowGroupReturn ret = new FollowGroupReturn();
            ret.IsActionSucceed = true;
            // Check if relation exist
            UserGroup grp = _context.SetChild<UserGroup>().FirstOrDefault(p => p.GroupId == groupId && p.UserId == appUserId);
            // If not
            if (grp == null)
            {
                UserGroup newUserGroupRelation = new UserGroup()
                {
                    DateUtcFollowed = DateTime.UtcNow,
                    GroupId = groupId,
                    UserId = appUserId,
                    GroupFollowState = GroupFollowState.Followed,
                    UserReputationInGroup = 0
                };
                _context.SetChild<UserGroup>().Add(newUserGroupRelation);
                ret.LastFollowState = GroupFollowState.Followed;
            // If exist before
            }else if (grp.GroupFollowState == GroupFollowState.Unfollowed)
            {
                grp.GroupFollowState = GroupFollowState.Followed;
                
            }else if(grp.GroupFollowState == GroupFollowState.Banned)
            {
                ret.IsActionSucceed = false;
                ret.LastFollowState = GroupFollowState.Banned;
                ret.ErrorInformation.UserInformation = "You have been blocked from interest.";
            }
            else
            {
                ret.IsActionSucceed = false;
                ret.LastFollowState = GroupFollowState.Followed;
                ret.ErrorInformation.UserInformation = "You have already following interest.";
            }
            // Refresh Cache
            int[] prevCacheIds = _userLikesCacheService.GetUserFollowingGroupsIds(appUserId);
            if(prevCacheIds == null)
            {
                prevCacheIds = new int[]
                {
                };
            }
            else
            {
               prevCacheIds = prevCacheIds.Append(groupId).ToArray();
            }            
            _userLikesCacheService.SetUserFollowingGroupsIds(appUserId,prevCacheIds,40);
            _context.SaveChanges();
            return ret;

        }
        public FollowGroupReturn UnfollowGroup(string appUserId, int groupId)
        {
            FollowGroupReturn ret = new FollowGroupReturn
            {
                IsActionSucceed = true
            };
            // Check if relation exist
            UserGroup grp = _context.SetChild<UserGroup>().FirstOrDefault(p => p.GroupId == groupId && p.UserId == appUserId);
            // If not
            if (grp == null)
            {
                ret.IsActionSucceed = false;
                ret.LastFollowState = GroupFollowState.Unfollowed;
                ret.ErrorInformation.UserInformation = "You are not following interest.";
                // If exist before
            }
            else if (grp.GroupFollowState == GroupFollowState.Unfollowed)
            {
                ret.IsActionSucceed = false;
                ret.LastFollowState = GroupFollowState.Unfollowed;
                ret.ErrorInformation.UserInformation = "You are not following interest.";

            }
            else if (grp.GroupFollowState == GroupFollowState.Followed)
            {
                grp.GroupFollowState = GroupFollowState.Unfollowed;
                _context.SetChild<UserGroup>().Update(grp);
                ret.IsActionSucceed = true;
                ret.LastFollowState = GroupFollowState.Unfollowed;
            }
            else
            {
                grp.GroupFollowState = GroupFollowState.Unfollowed;
                _context.SetChild<UserGroup>().Update(grp);
                ret.IsActionSucceed = true;
                ret.LastFollowState = GroupFollowState.Unfollowed;
            }
            // Refresh Cache
            int[] prevCacheIds = _userLikesCacheService.GetUserFollowingGroupsIds(appUserId);
            if (prevCacheIds == null)
            {
                return ret;
            }
            prevCacheIds = prevCacheIds.Where(p=>p != groupId).ToArray();
            _userLikesCacheService.SetUserFollowingGroupsIds(appUserId, prevCacheIds, 40);
            _context.SaveChanges();
            return ret;

        }
        public bool IsUserFollowing(string currUserId, string targetUserId)
        {
            return _context.SetChild<FollowInfo>().AsNoTracking().Any(q => q.FollowerId == currUserId && q.FollowedId == targetUserId);
        }

        public string GetUserId(string userName)
        {
            return _context.Set<UserInfo>().AsNoTracking().Where(p => p.UName == userName).Select(p=>p.AppUserId).FirstOrDefault();
        }
        public string GetUserName(string userId)
        {
            return _context.Set<UserInfo>().AsNoTracking().Where(p => p.AppUserId == userId).Select(p => p.UName).FirstOrDefault();
        }
        public UserInfoExtraSmall GetUserCardInfo(string userName)
        {
            return _context.Set<UserInfo>().AsNoTracking().Where(p => p.UName == userName).Select(p => new UserInfoExtraSmall()
            {
                AppUserId = p.AppUserId,
                ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", p.AppUserId),
                UserName = p.UName
            }).FirstOrDefault();
        }
        public int GetUserInterestCount(string appUserId, int cacheTreshold)
        {
            int interestCount = _context.SetChild<UserGroup>().AsNoTracking().Where(p => p.UserId == appUserId && p.GroupFollowState == GroupFollowState.Followed).Count();
            if (interestCount >= cacheTreshold)
            {
                _userCacheService.SetUserInterestCount(appUserId, interestCount, 10);
            }
            return interestCount;
        }
        public int GetUserFollowerCount(string appUserId, int cacheTreshold)
        {
            int followerCount = _context.SetChild<FollowInfo>().AsNoTracking().Where(p=> p.FollowedId==appUserId && p.FollowState == FollowState.Confirmed).Count();
            if (followerCount >= cacheTreshold)
            {
                _userFollowCacheService.SetUserFollowerCount(appUserId, followerCount, 10);
            }
            return followerCount;
        }
        public int GetUserFollowingCount(string appUserId, int cacheTreshold)
        {
            int followingCount = _context.SetChild<FollowInfo>().AsNoTracking().Where(p => p.FollowerId == appUserId && p.FollowState == FollowState.Confirmed).Count();
            if (followingCount >= cacheTreshold)
            {
                _userFollowCacheService.SetUserFollowingCount(appUserId, followingCount, 10);
            }
            return followingCount;
        }
        private double GetUserReputation(string appUserId,int cacheTreshold)
        {
            var allRepSum = _context.Set<ReputationGain>().Where(p => p.UserInfoId == appUserId).Sum(p => p.GainedReputationValue);
            double userReputationSum = allRepSum;
            if (userReputationSum >= cacheTreshold)
            {
                _userCacheService.SetUserReputation(appUserId, userReputationSum, 60);
            }
            return userReputationSum;
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
