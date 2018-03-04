
using fso.Core.Caching;
using fso.Core.Domains.MMEntities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    /// <summary>
    /// GET-SET USER-INTEREST(GROUP) FOLLOW RELATION AS DICTIONARY FROM CACHE
    /// </summary>
    public class UserInterestCacheService : IUserInterestCacheService
    {
        private static string User_Interest_Ids_Key = "User_Interests_Ids_";
        private readonly ICacheProvider _cacheProvider;
        public UserInterestCacheService(ICacheProvider cacheProvider)
        {
            _cacheProvider = cacheProvider;
        }
        public int[] GetUserInterestsIds(string userId)
        {
            return _cacheProvider.RetrieveFromCache<int[]>(User_Interest_Ids_Key + userId);
        }

        public Task<int[]> GetUserInterestsIdsAsync(string userId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int[]>(User_Interest_Ids_Key + userId);
        }

        public void SetUserInterestsIds(string userId, int[] interestIds, int expirationInMinutes)
        {
            _cacheProvider.SaveToCache<int[]>(User_Interest_Ids_Key + userId, interestIds, 0, expirationInMinutes);
        }

        public Task SetUserInterestsIdsAsync(string userId, int[] interestIds, int expirationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int[]>(User_Interest_Ids_Key + userId, interestIds, 0, expirationInMinutes);
        }

        public void RefreshInterestIds(string userId)
        {
            _cacheProvider.Refresh(User_Interest_Ids_Key + userId);
        }
        public Task RefreshInterestIdsAsync(string userId)
        {
            return _cacheProvider.RefreshAsync(User_Interest_Ids_Key + userId);
        }
    }
}
