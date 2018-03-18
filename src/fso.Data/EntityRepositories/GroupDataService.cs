using fso.Core.Domains;
using fso.DataExtensions.DataServices;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using fso.Core.Domains.MMEntities;
using fso.DataExtensions.Models;
using fso.Caching.CachingServices;
using fso.Settings.Image;
using Microsoft.Extensions.Options;
using fso.Core.Extensions;
using System;

namespace fso.Data.EntityRepositories
{
    public class GroupDataService : IGroupDataService
    {
        private readonly IEntityContext _context;
        private readonly IGroupCacheService _groupCacheService;
        private readonly IUserLikeCacheService _userLikesCacheService;
        private readonly IUserLikesDataService _userLikesDataService;
        private readonly IUserInfoCacheService _userCacheService;
        private readonly IUserFollowCacheService _userFollowCacheService;
        private readonly IPostCacheService _postCacheService;
        private readonly ITrendingDataService _trendingDataService;
        private readonly ITrendingCacheService _trendingCacheService;
        private readonly DbSet<Group> _dbEntitySet;
        private readonly DbSet<UserGroup> _userGroupEntitySet;
        private readonly UserProfileImageSettings _userProfileImageSettings;

        int[] userPostLikesIds;
        int[] userReviewLikesIds;
        int[] userCommentLikesIds;
        int[] userReviewDislikesIds;
        int[] userCommentDislikesIds;
        int[] userFollowedInterest;
        Dictionary<string, FollowState> currentUserFollowings;

        public GroupDataService(
            IEntityContext context,
            IGroupCacheService groupCacheService,
            IUserLikeCacheService userLikesCacheService,
             IUserInfoCacheService userCacheService,
            IUserLikesDataService userLikesDataService,
            ITrendingDataService trendingDataService,
            IUserFollowCacheService userFollowCacheService,
            ITrendingCacheService trendingCacheService,
            IPostCacheService postCacheService,
            IOptions<UserProfileImageSettings> _userImageSettings
            )
        {
            _context = context;
            _userProfileImageSettings = _userImageSettings.Value;
            _postCacheService = postCacheService;
            _userCacheService = userCacheService;
            _groupCacheService = groupCacheService;
            _userLikesDataService = userLikesDataService;
            _userLikesCacheService = userLikesCacheService;
            _userFollowCacheService = userFollowCacheService;
            _trendingDataService = trendingDataService;
            _trendingCacheService = trendingCacheService;
            _dbEntitySet = _context.Set<Group>();
            _userGroupEntitySet = _context.SetChild<UserGroup>();
        }
        
        public IQueryable<InterestCard> GetAutoCompleteInterest(string query, int pageSize = 4)
        {
            IQueryable<InterestCard> interests = _dbEntitySet.Where(p => p.Name.StartsWith(query)).Select(p => new InterestCard()
            {
                AlphaColor = p.ColorAlpha,
                ProfileImage = p.ProfileImage.SmallPath,
                Id = p.Id,
                Name = p.Name,
                UrlKey = p.UrlKey,
            }).Take(pageSize);
            int takenCount = interests.Count();
            if (pageSize > takenCount)
            {
                IQueryable<InterestCard> stringContainInterests = _dbEntitySet.Where(p => !p.Name.StartsWith(query) && p.Name.Contains(query))
                    .Select(p => new InterestCard()
                    {
                        AlphaColor = p.ColorAlpha,
                        ProfileImage = p.ProfileImage.SmallPath,
                        Id = p.Id,
                        Name = p.Name,
                        UrlKey = p.UrlKey,
                    }).Take(pageSize - takenCount);

                    interests = interests.Concat(stringContainInterests).Distinct();
            }
            return interests;
        }
        public GroupIndexReturn GetGroupIndex(string urlKey, string currUserId, int pageIndex= 1,int pageSize =8,string order="publishDate")
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
            GroupIndexReturn ret = new GroupIndexReturn();
            ret.Group = _context.Set<Group>().AsNoTracking()
                .Select(p => new GroupIndexDetail()
                {
                    Description = p.Description,
                    AlphaColor = p.ColorAlpha,
                    Id = p.Id,
                    Name = p.Name,
                    UrlKey = p.UrlKey,                    
                    CoverImage = new BaseImageReturn()
                    {
                        Dimension = p.CoverImage.ImageDimension,
                        Extension = p.CoverImage.FileExtension,
                        LazyUrl = p.CoverImage.BlurLazyPath,
                        SmallUrl = p.CoverImage.SmallPath,
                        ThumbUrl = p.CoverImage.ThumbPath,
                        Url = p.CoverImage.ResizedPath
                    },
                    ThumbnailImage = new BaseImageReturn()
                    {
                        Dimension = p.ProfileImage.ImageDimension,
                        Extension = p.ProfileImage.FileExtension,
                        LazyUrl = p.ProfileImage.BlurLazyPath,
                        SmallUrl = p.ProfileImage.SmallPath,
                        ThumbUrl = p.ProfileImage.ThumbPath,
                        Url = p.ProfileImage.ResizedPath
                    }
                })
                .FirstOrDefault(p => p.UrlKey == urlKey);
            if (ret.Group==null)
            {
                return ret;
            }
            ret.Group.FollowerCount = _groupCacheService.GetFollowingUserCount(ret.Group.Id) ?? GetGroupFollowerCount(ret.Group.Id, 10);    
            ret.Group.FollowState = ! isLoggedIn ? GroupFollowState.Unfollowed: userFollowedInterest.Contains(ret.Group.Id) ?GroupFollowState.Followed :  GroupFollowState.Unfollowed;

            var postIdRels = _groupCacheService.GetPostRelationships(ret.Group.Id);
            if (postIdRels == null)
            {
                postIdRels = this.GetGroupPosts(ret.Group.Id);
                if (postIdRels.Count()>0)
                {
                    _groupCacheService.SetPostRelationships(ret.Group.Id, postIdRels, 30);
                }                
            }
            if (postIdRels.Count() == 0)
            {
                return ret;
            }
            int[] paginatedPostIds = postIdRels.OrderByDescending(p => p.DateUtcAdded).Select(p=> p.PostId).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToArray();
            ret.Posts = new PaginatedPostCardReturn
            {
                Entities = _context.Set<Post>().AsNoTracking()
                .Include(p => p.PostParts)
                .ThenInclude(p => p.Image)
                .OrderByDescending(f => f.DateUtcPublished)
                .Select(p => new { Entity = p, p.UserInfo, p.PostParts, p.ReputationGains, p.Groups, ReviewCount = p.Reviews.Count() })
                .Where(p => paginatedPostIds.Contains(p.Entity.Id))
                .Select(p => new PostCardModel()
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
                    AuthorInfo = new UserCardModel()
                    {
                        AppUserId = p.UserInfo.AppUserId,
                        Name = p.UserInfo.Name,
                        ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", p.UserInfo.AppUserId),
                        Surname = p.UserInfo.Surname,
                        Username = p.UserInfo.UName,

                    }
                }).ToPaginatedList(1, 16, postIdRels.Count())
            };

            foreach (var post in ret.Posts.Entities)
            {
                post.Rating = GetPostRating(post.Id, 2);
                post.IsCurrentUserLiked = isLoggedIn ? userPostLikesIds.Contains(post.Id) : false;
                post.FavouriteCount = _postCacheService.GetPostLikesCount(post.Id)
                                ?? this.GetPostLikeCount(post.Id, cacheTreshold: 20);
                if (currentUserFollowings.Any(p => p.Key == post.AuthorInfo.AppUserId))
                {
                    post.AuthorInfo.FollowState = currentUserFollowings[post.AuthorInfo.AppUserId];
                }
                else
                {
                    post.AuthorInfo.FollowState = FollowState.Unfollowed;
                }
            }

            return ret;
        }
        public PaginatedPostCardReturn GetTrendingPosts(string urlkey,string currUserId,int pageIndex = 1, int pageSize= 12, string order = "thisweek")
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
            PaginatedPostCardReturn ret = new PaginatedPostCardReturn();
            Group gr = GetGroupFromUrlKey(urlkey);
            IEnumerable<int> postIds = _trendingCacheService.GetTrendingPostIdsForGroup(gr.Id);
            if (postIds == null)
            {
                postIds = _trendingDataService.GetTrendingPostIdsForGroup(gr.Id, DateTime.UtcNow.AddDays(-7), DateTime.UtcNow, true);
            }
            if (postIds==null)
            {
                return ret;
            }
            IEnumerable<int> paginatedPostIds = postIds.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            ret.Entities = _context.Set<Post>().AsNoTracking()
                .Include(p => p.PostParts)
                .ThenInclude(p => p.Image)
                .Select(p => new { Entity = p, p.UserInfo, p.PostParts, p.ReputationGains, p.Groups, ReviewCount = p.Reviews.Count() })
                .Where(p => paginatedPostIds.Contains(p.Entity.Id))
                .Select(p => new PostCardModel()
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
                    AuthorInfo = new UserCardModel()
                    {
                        AppUserId = p.UserInfo.AppUserId,
                        Name = p.UserInfo.Name,
                        ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", p.UserInfo.AppUserId),
                        Surname = p.UserInfo.Surname,
                        Username = p.UserInfo.UName,

                    }
                }).ToPaginatedList(pageIndex, pageSize, postIds.Count());

            foreach (var post in ret.Entities)
            {
                post.Rating = GetPostRating(post.Id, 2);
                post.IsCurrentUserLiked = isLoggedIn ? userPostLikesIds.Contains(post.Id) : false;
                post.FavouriteCount = _postCacheService.GetPostLikesCount(post.Id)
                                ?? this.GetPostLikeCount(post.Id, cacheTreshold: 20);
                if (currentUserFollowings.Any(p => p.Key == post.AuthorInfo.AppUserId))
                {
                    post.AuthorInfo.FollowState = currentUserFollowings[post.AuthorInfo.AppUserId];
                }
                else
                {
                    post.AuthorInfo.FollowState = FollowState.Unfollowed;
                }
            }

            return ret;
        }
        public PaginatedPostCardReturn GetGroupPosts(string urlKey, string currUserId, int pageIndex = 1, int pageSize = 8, string order = "publishDate")
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
            PaginatedPostCardReturn ret = new PaginatedPostCardReturn();
            Group gr = GetGroupFromUrlKey(urlKey);
            if (gr==null)
            {
                return ret;
            }
            var postIdRels = _groupCacheService.GetPostRelationships(gr.Id);
            if (postIdRels == null)
            {
                postIdRels = this.GetGroupPosts(gr.Id);
                if (postIdRels.Count() > 0)
                {
                    _groupCacheService.SetPostRelationships(gr.Id, postIdRels, 30);
                }
            }
            if (postIdRels.Count() == 0)
            {
                return ret;
            }
            int[] paginatedPostIds = postIdRels.OrderByDescending(p => p.DateUtcAdded).Select(p => p.PostId).Skip((pageIndex-1)*pageSize).Take(pageSize).ToArray();
            ret = new PaginatedPostCardReturn
            {
                Entities = _context.Set<Post>().AsNoTracking()
                .Include(p => p.PostParts)
                .ThenInclude(p => p.Image)                
                .Select(p => new { Entity = p, p.UserInfo, p.PostParts, p.ReputationGains, p.Groups, ReviewCount = p.Reviews.Count() })
                .Where(p => paginatedPostIds.Contains(p.Entity.Id))
                .Select(p => new PostCardModel()
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
                    AuthorInfo = new UserCardModel()
                    {
                        AppUserId = p.UserInfo.AppUserId,
                        Name = p.UserInfo.Name,
                        ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", p.UserInfo.AppUserId),
                        Surname = p.UserInfo.Surname,
                        Username = p.UserInfo.UName,

                    }
                }).ToPaginatedList(pageIndex, pageSize, postIdRels.Count())
            };

            foreach (var post in ret.Entities)
            {
                post.Rating = GetPostRating(post.Id, 2);
                post.IsCurrentUserLiked = isLoggedIn ? userPostLikesIds.Contains(post.Id) : false;
                post.FavouriteCount = _postCacheService.GetPostLikesCount(post.Id)
                                ?? this.GetPostLikeCount(post.Id, cacheTreshold: 20);
                if (currentUserFollowings.Any(p => p.Key == post.AuthorInfo.AppUserId))
                {
                    post.AuthorInfo.FollowState = currentUserFollowings[post.AuthorInfo.AppUserId];
                }
                else
                {
                    post.AuthorInfo.FollowState = FollowState.Unfollowed;
                }
            }

            return ret;
        }
        public PaginatedPostCardReturn GeUnreviewedPosts(string urlkey,string currUserId, int pageIndex = 1, int pageSize = 12, string order="publishDate")
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
            PaginatedPostCardReturn ret = new PaginatedPostCardReturn();
            var gid = _context.Set<Group>().AsNoTracking().Select(p => new { p.Id, p.UrlKey }).FirstOrDefault(p => p.UrlKey == urlkey);
            if (gid==null)
            {
                return ret;
            }
            int groupId = gid.Id;
            var postIds = _context.SetChild<GroupPost>().Where(p => p.GroupId == groupId)                
                .Select(f=>f.PostId)
                .ToArray();
            if (postIds == null)
            {
                return ret;
            }
            int total = _context.Set<Post>().AsNoTracking().Select(p => new { p.Id,p.DateUtcPublished, ReviewCount = p.Reviews.Count() }).Count(p => postIds.Contains(p.Id) && p.ReviewCount < 1);
            if (total<0)
            {
                return ret;
            }
            ret.Entities = _context.Set<Post>().AsNoTracking()
                .Select(p => new { Entity = p, p.UserInfo, p.PostParts, ReviewCount = p.Reviews.Count() })
                .Where(p => postIds.Contains(p.Entity.Id) && p.ReviewCount < 1)                
                .Select(p => new PostCardModel()
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
                    AuthorInfo = new UserCardModel()
                    {
                        AppUserId = p.UserInfo.AppUserId,
                        Name = p.UserInfo.Name,
                        ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", p.UserInfo.AppUserId),
                        Surname = p.UserInfo.Surname,
                        Username = p.UserInfo.UName,
                    }
                })
                .OrderByDescending(p => p.DateUtcPublished)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToPaginatedList(pageIndex, pageSize, total);

            foreach (var post in ret.Entities)
            {
                post.Rating = GetPostRating(post.Id, 2);
                post.IsCurrentUserLiked = isLoggedIn ? userPostLikesIds.Contains(post.Id) : false;
                post.FavouriteCount = _postCacheService.GetPostLikesCount(post.Id)
                                ?? this.GetPostLikeCount(post.Id, cacheTreshold: 20);
                if (currentUserFollowings.Any(p => p.Key == post.AuthorInfo.AppUserId))
                {
                    post.AuthorInfo.FollowState = currentUserFollowings[post.AuthorInfo.AppUserId];
                }
                else
                {
                    post.AuthorInfo.FollowState = FollowState.Unfollowed;
                }
            }

            return ret;
        }
        public UserFollowUsersReturn GetGroupUsers(string urlkey, string currUserId, int pageIndex = 1, int pageSize = 24, string order = "reputationInGroup")
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
            UserFollowUsersReturn ret = new UserFollowUsersReturn();
            Group gr = GetGroupFromUrlKey(urlkey);
            if (gr==null)
            {
                return ret;
            }

            int totalCount = _groupCacheService.GetFollowingUserCount(gr.Id) ??
                _context.SetChild<UserGroup>().AsNoTracking().Count(p => p.GroupId == gr.Id && p.GroupFollowState == GroupFollowState.Followed);
            if (totalCount == 0)
            {
                return ret;
            }
            List<UserGroup> followedUsers = _context.SetChild<UserGroup>().AsNoTracking()
                .Where(p => p.GroupId == gr.Id && p.GroupFollowState == GroupFollowState.Followed )
                .OrderByDescending(p => p.UserReputationInGroup)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize).ToList();

            var followedUserIds = followedUsers.Select(p => p.UserId);
            if (followedUserIds==null)
            {
                return ret;
            }
            // Get Followed User Count

            // Get User Data From Database
            ret.Entities = _context.Set<UserInfo>().AsNoTracking().Where(p => followedUserIds.Contains(p.AppUserId))
                .Select(p => new UserCardModel()
                {
                    AppUserId = p.AppUserId,
                    ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", p.AppUserId),
                    Username = p.UName,
                }).ToPaginatedList(pageIndex, pageSize, totalCount);
            // Get Total Reputation
            foreach (var item in ret.Entities)
            {
                item.Reputation = _userCacheService.GetUserReputation(item.AppUserId)?? GetUserReputation(item.AppUserId,10);
                // Check if the current user follows the users 
                var followState =  currentUserFollowings.SingleOrDefault(p => p.Key == item.AppUserId);
                item.FollowState = !isLoggedIn ? FollowState.Unfollowed: followState.Key == null ? FollowState.Unfollowed : followState.Value;
                
            }
            // return as paginated
            return ret;
        }
        public GroupPost[] GetGroupPosts(int groupId)
        {
            return _context.SetChild<GroupPost>().AsNoTracking().Where(p => p.GroupId == groupId).ToArray();
        }
        
        public bool IsUrlKeyAlreadyExist(string urlKey)
        {
            return _dbEntitySet.Any(p => p.UrlKey == urlKey);
        }
        public int GetGroupFollowerCount(int groupId, int cacheTreshold)
        {
            int followerCount = _userGroupEntitySet.AsNoTracking().Count(p => p.GroupId == groupId && p.GroupFollowState == GroupFollowState.Followed);
            if (followerCount >= cacheTreshold)
            {
                _groupCacheService.SetFollowingUserCount(groupId, followerCount, 60);
            }
            return followerCount;
        }
        private int GetPostLikeCount(int postId, int cacheTreshold)
        {
            int postLikeCount = _context.SetChild<UserPostLike>().AsNoTracking().Where(p => p.PostId == postId).Count();
            if (postLikeCount >= cacheTreshold)
            {
                _postCacheService.SetPostLikesCount(postId, postLikeCount, 40);
            }
            return postLikeCount;
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
            if (totalReputation==null)
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
        private Group GetGroupFromUrlKey(string urlKey)
        {
            return _context.Set<Group>().FirstOrDefault(p => p.UrlKey == urlKey);
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
        private void GetUserLikes(string currUserId)
        {
            // Get from cache
            userReviewLikesIds = _userLikesCacheService.GetUserLikedReviewsIds(currUserId);
            userCommentLikesIds = _userLikesCacheService.GetUserLikedCommentsIds(currUserId);
            userReviewDislikesIds = _userLikesCacheService.GetUserDisikedReviewsIds(currUserId);
            userCommentDislikesIds = _userLikesCacheService.GetUserDisikedCommentsIds(currUserId);
            userPostLikesIds = _userLikesCacheService.GetUserLikedPostsIds(currUserId);
            userFollowedInterest = _userLikesCacheService.GetUserFollowingGroupsIds(currUserId);
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
            if (userFollowedInterest == null || !userFollowedInterest.Any())
            {
                userFollowedInterest = _userLikesDataService.GetUserFollowingGroups(currUserId,10);
                _userLikesCacheService.SetUserFollowingGroupsIds(currUserId, userFollowedInterest, 10);
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
