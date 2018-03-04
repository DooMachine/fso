using System.Collections.Generic;

namespace fso.Caching.CachingServices
{
    public interface ITrendingCacheService
    {
        IEnumerable<int> GetTrendingPostIdsForGroup(int groupId);
        void SetTrendingPostIdsForGroup(int groupId, IEnumerable<int> postIds, int cacheMinutes);
    }
}
