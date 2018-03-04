using fso.Core.Caching;
using System;
using System.Collections.Generic;
using System.Text;

namespace fso.Caching.CachingServices
{
    public class TrendingCacheService : ITrendingCacheService
    {
        private readonly string TrendingPostIdsForGroupKey = "TendingPostIdsForGroup_";

        private readonly ICacheProvider _cacheProvider;
        public TrendingCacheService(ICacheProvider cacheProvider)
        {
            _cacheProvider = cacheProvider;
        }
        public IEnumerable<int> GetTrendingPostIdsForGroup(int groupId)
        {
            return _cacheProvider.RetrieveFromCache<IEnumerable<int>>(TrendingPostIdsForGroupKey + groupId.ToString());
        }

        public void SetTrendingPostIdsForGroup(int groupId, IEnumerable<int> postIds, int cacheMinutes)
        {
            _cacheProvider.SaveToCacheAsync(TrendingPostIdsForGroupKey + groupId.ToString(), postIds, 0, cacheMinutes);
        }


    }
}
