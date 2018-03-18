using fso.Caching.CachingServices;
using fso.Core.Domains;
using fso.Core.Domains.MMEntities;
using fso.Core.Extensions;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace fso.Data.EntityRepositories
{
    public class ExploreDataService : IExploreDataService
    {
        private readonly IEntityContext _context;
        private readonly IExploreCacheService _exploreCacheService;
        private readonly IUserLikeCacheService _userLikesCacheService;
        private readonly IUserLikesDataService _userLikesDataService;
        private readonly ICommonCacheService _commonCacheService;

        int[] userFollowedInterest;

        public ExploreDataService(
            IExploreCacheService exploreCacheService,
            ICommonCacheService commonCacheService,
            IUserLikeCacheService userLikesCacheService,
            IUserLikesDataService userLikesDataService,
            IEntityContext context
            )
        {
            _context = context;
            _exploreCacheService = exploreCacheService;
            _userLikesCacheService = userLikesCacheService;
            _userLikesDataService = userLikesDataService;
            _commonCacheService = commonCacheService;
        }

        public PaginatedInterestCard GetExploreInterests(PaginatedLangRequest req, string currUserId)
        {
            userFollowedInterest = _userLikesCacheService.GetUserFollowingGroupsIds(currUserId);
            if (userFollowedInterest == null || userFollowedInterest.Count()==0)
            {
                userFollowedInterest = _userLikesDataService.GetUserFollowingGroups(currUserId, 5);
                _userLikesCacheService.SetUserFollowingGroupsIds(currUserId, userFollowedInterest, 20);
            }
            PaginatedInterestCard ret = new PaginatedInterestCard();
            int[] langCodeTrendingInterestIds = _exploreCacheService.GetExploreInterestIds(req.LangCode,req.PageIndex);
            int? totalGroupCount = _commonCacheService.GetTotalGroupCount();
            if (!totalGroupCount.HasValue)
            {
                totalGroupCount = _context.Set<Group>().Count();
                _commonCacheService.SetTotalGroupCount(totalGroupCount.Value, 10);
            }
            if (langCodeTrendingInterestIds == null || langCodeTrendingInterestIds.Count()==0)
            {
                // Order by follower count
                langCodeTrendingInterestIds = _context.Set<Group>()
                     .AsNoTracking()
                     .SelectMany(a => a.UsersFollowing)  
                     .GroupBy(t => t.GroupId, (k, g) => new
                     {
                         GroupId = k,
                         gs = g,
                         Count = g.Count(q => q.GroupFollowState == GroupFollowState.Followed)
                     })
                    .OrderByDescending(g => g.Count)
                    .Select(f => f.GroupId)
                    .Distinct()
                    .Skip((req.PageIndex - 1) * req.PageSize)
                    .Take(req.PageSize)                    
                    .ToArray();
                if(langCodeTrendingInterestIds != null)
                    if(langCodeTrendingInterestIds.Length>req.PageSize)
                        _exploreCacheService.SetExploreInterestIds(req.LangCode, req.PageIndex, langCodeTrendingInterestIds, 60 * 24);
            }
            if(langCodeTrendingInterestIds.Count()<req.PageSize){
                int dif = req.PageSize - langCodeTrendingInterestIds.Count();

                ret.Entities = _context.Set<Group>().AsNoTracking()
                    .Select(p => new { Entity = p, Image = p.ProfileImage, p.CoverImage })
                    .OrderByDescending(p=>p.Entity.DateUtcModified)
                    .Skip((req.PageIndex-1)*req.PageSize)
                    .Take(req.PageSize)
                    .Select(p => new InterestCard()
                    {
                        AlphaColor  = p.Entity.ColorAlpha,
                        Id = p.Entity.Id,
                        Name = p.Entity.Name,
                        UrlKey = p.Entity.UrlKey,
                        IsCurrentUserFollowing = userFollowedInterest.Contains(p.Entity.Id),
                        ProfileImage = p.Image.SmallPath,
                        CoverImage = p.CoverImage.ThumbPath
                    })
                    .ToPaginatedList(req.PageIndex, req.PageSize, totalGroupCount.Value);
            }else{
                ret.Entities = _context.Set<Group>().AsNoTracking()
                    .Select(p => new { Entity = p, Image = p.ProfileImage, p.CoverImage })
                    .Where(p => langCodeTrendingInterestIds.Contains(p.Entity.Id))
                    .Select(p => new InterestCard()
                    {
                        AlphaColor  = p.Entity.ColorAlpha,
                        Id = p.Entity.Id,
                        Name = p.Entity.Name,
                        UrlKey = p.Entity.UrlKey,
                        IsCurrentUserFollowing = userFollowedInterest.Contains(p.Entity.Id),
                        ProfileImage = p.Image.SmallPath,
                        CoverImage = p.CoverImage.ThumbPath
                    })
                    .ToPaginatedList(req.PageIndex, req.PageSize, totalGroupCount.Value);                
            
            }
            return ret;
        }
    }
}
