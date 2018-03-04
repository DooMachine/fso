using fso.Core.Caching;
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public class ExploreCacheService : IExploreCacheService
    {
        private readonly static string ExploreGroupsIds_Key = "ExGroupIds_";
        private readonly ICacheProvider _cacheProvider;
        public ExploreCacheService(ICacheProvider cacheProvider)
        {
            _cacheProvider = cacheProvider;
        }

        public int[] GetExploreInterestIds(string langCode, int pageIndex)
        {
            return _cacheProvider.RetrieveFromCache<int[]>(ExploreGroupsIds_Key+pageIndex+"_" + langCode);
        }

        public Task<int[]> GetExploreInterestIdsAsync(string langCode, int pageIndex)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int[]>(ExploreGroupsIds_Key + pageIndex + "_" + langCode);
        }

        public void SetExploreInterestIds(string langCode, int pageIndex, int[] interestIds, int expirationInMinutes)
        {
            _cacheProvider.SaveToCache<int[]>(ExploreGroupsIds_Key + pageIndex + "_" + langCode, interestIds, 0, expirationInMinutes);
        }

        public Task SetExploreInterestIdsAsync(string langCode, int pageIndex ,int[] interestIds, int expirationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int[]>(ExploreGroupsIds_Key + pageIndex + "_" + langCode, interestIds, 0, expirationInMinutes);
        }

    }
}
