
using fso.Caching.CachingServices;
using fso.Core.Domains;
using fso.Core.Domains.MMEntities;
using fso.Core.Extensions;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace fso.Data.EntityRepositories
{
    public class TrendingDataService : ITrendingDataService
    {
        private readonly IEntityContext _context;
        private readonly DbSet<Post> _postSet;
        private readonly DbSet<Group> _groupSet;
        private readonly DbSet<Popularity> _popularitySet;
        private readonly ITrendingCacheService _trendingCacheService;
        public TrendingDataService(
            IEntityContext context,
            ITrendingCacheService trendingCacheService
            )
        {
            _context = context;
            _trendingCacheService = trendingCacheService;
            _postSet = _context.Set<Post>();
            _groupSet = _context.Set<Group>();
            _popularitySet = _context.SetChild<Popularity>();
        }
        /// <summary>
        /// Get Trending Content Of Culture
        /// </summary>
        /// <param name="pageIndex">Page Index of Loaded Content</param>
        /// <param name="pageSize">Page Size of Loaded Content</param>
        /// <param name="culture">Culture Code (Default "WW"-Worldwide)</param>
        /// <returns>TrendingReturnModel</returns>
        public TrendingGroupsReturnModel GetTrendingGroups(int pageIndex, int pageSize,string currUserId, string culture = "WW")
        {
            TrendingGroupsReturnModel model = new TrendingGroupsReturnModel();
            var popularGroups = _popularitySet.AsNoTracking()
                .Where(p => p.CultureCode == culture && p.GroupId!=null)
                .OrderByDescending(p => p.PopularityLevel)
                .Skip((pageIndex-1)*pageSize)
                .Take(pageSize).Select(f => f.GroupId).ToArray();

            int popularGroupCount = _popularitySet.AsNoTracking().Where(f => f.OnTrendingStartUtcTime != null && f.OnTrendingEndUtcTime == null && f.GroupId!=null).Count();

            
            model.Groups = _groupSet.AsNoTracking()
                .Include(p=>p.UsersFollowing).Include(p=>p.ProfileImage).Include(p=>p.CoverImage)
                .Where(p => popularGroups.Contains(p.Id))
                .Select(p=> new InterestCard() {
                    CoverImage=p.CoverImage.ThumbPath,
                    FollowerCount= p.UsersFollowing.Count(),
                    IsCurrentUserFollowing = p.UsersFollowing.Any(f=>f.UserId == currUserId),
                    Name=p.Name,
                    ProfileImage=p.ProfileImage.SmallPath,
                    UrlKey=p.UrlKey,
                    Id=p.Id
                })
                .ToPaginatedList(pageIndex, pageSize, popularGroupCount);

            return model;
        }
        public TrendingPostsReturnModel GetTrendingPosts(int pageIndex, int pageSize, string currUserId, string culture = "WW")
        {
            TrendingPostsReturnModel model = new TrendingPostsReturnModel();

            var popularPosts = _popularitySet.AsNoTracking()
                .Where(f => f.OnTrendingStartUtcTime != null && f.OnTrendingEndUtcTime == null &&  f.CultureCode == culture && f.PostId != null)
                .OrderByDescending(p => p.PopularityLevel)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize).Select(f => f.PostId).ToArray();
            int popularPostCount = _popularitySet.AsNoTracking().Where(f => f.OnTrendingStartUtcTime != null && f.OnTrendingEndUtcTime == null && f.PostId != null).Count();
            
            model.Posts = _postSet.AsNoTracking()
                .Include(p => p.PostParts).ThenInclude(f => f.Image).Include(p => p.LikedUsers).Include(p => p.UserInfo)
                .Where(p => popularPosts.Contains(p.Id))
                .Select(p => new PostCard()
                {
                    DateUtcPublished = p.DateUtcPublished,
                    Description = p.Description,
                    AuthorInfo = new BaseUserInfoDisplay()
                    {
                        AppUserId = p.UserInfo.AppUserId,
                        Name = p.UserInfo.Name,
                        ProfileImage = p.UserInfo.ProfilePicture.SmallPath,
                        Surname = p.UserInfo.Surname,
                        Username = p.UserInfo.UName
                    },
                    Content = p.Content,
                    IsCurrentUserLiked = p.LikedUsers.Any(q => q.UserInfoId == currUserId),
                    IsPublished = p.IsPublished,
                    LikeCount = p.LikedUsers.Count(),
                    PostParts = p.PostParts.Select(f => new PostPartDisplay()
                    {
                        Description = f.Description,
                        Image = new BaseImageReturn()
                        {
                            Dimension = f.Image.ImageDimension,
                            Extension = f.Image.FileExtension,
                            LazyUrl = f.Image.SmallPath,
                            Url = f.Image.ResizedPath
                        },
                        Id = f.Id,
                        Title = f.Title
                    }).ToList(),
                    ReviewCount = p.Reviews.Count(),
                    Id = p.Id
                })
                .ToPaginatedList(pageIndex, pageSize, popularPostCount);

            return model;
        }

        /// <summary>
        /// Get Trending Posts of Group That Published between dateStart - dateEnd  
        ///  ==> ((f.Rating*10) * (f.ReviewCount*4) * f.ReputationGains.Sum(q => q.GainedReputationValue)) <Logic
        /// </summary>
        /// <param name="groupId">Id of Group(Interest)</param>
        /// <param name="dateStart">Start Date</param>
        /// <param name="dateEnd">End Date</param>
        /// <param name="saveToCache">Whether set cache of return postId arrays</param>
        /// <returns>Array of postIds that are trending in group</returns>
        public IEnumerable<int> GetTrendingPostIdsForGroup(int groupId, DateTime dateStart, DateTime dateEnd, bool saveToCache)
        {
            int[] groupPostIds = _context.SetChild<GroupPost>().AsNoTracking().Where(p => p.GroupId == groupId).Select(f => f.PostId).ToArray();
            IEnumerable<int> ret= _context.Set<Post>().AsNoTracking()
                .Include(p=>p.ReputationGains)
                .Where(p=> groupPostIds.Contains(p.Id))
                .Select(p => new {
                    EntityId = p.Id,
                    ReviewCount = p.Reviews.Count(),
                    ReputationGains = p.ReputationGains.Where(q=>q.DateUtcAdd>dateStart && q.DateUtcAdd<dateEnd)
                })
                .OrderByDescending(f =>  (f.ReviewCount*6) * f.ReputationGains.Sum(q => q.GainedReputationValue))
                .Select(f=>f.EntityId).AsEnumerable();

            if (ret.Count()>0 && saveToCache)
            {
                _trendingCacheService.SetTrendingPostIdsForGroup(groupId,ret,60*24);
            }
            return ret;
        }
    }
}
