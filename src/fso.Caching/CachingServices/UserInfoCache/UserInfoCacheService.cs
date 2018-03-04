using fso.Core.Caching;
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public class UserInfoCacheService : IUserInfoCacheService
    {
        private readonly static string UserReputationId_Key = "UserReputation_";
        private readonly static string UserInterestCountId_Key = "UserInterestCount_";
        private readonly static string UserFavouriteCountId_Key = "UserFavouriteCount_";
        private readonly static string UserPostCountId_Key = "UserPostCount_";
        private readonly ICacheProvider _cacheProvider;
        public UserInfoCacheService(ICacheProvider cacheProvider)
        {
            _cacheProvider = cacheProvider;
        }
        public double? GetUserReputation(string appUserId)
        {
            return _cacheProvider.RetrieveFromCache<double?>(UserReputationId_Key + appUserId);
        }

        public Task<double?> GetUserReputationAsync(int appUserId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<double?>(UserReputationId_Key + appUserId);
        }

        public void SetUserReputation(string appUserId, double reputation, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<double>(UserReputationId_Key + appUserId, reputation, 0, cacheDurationInMinutes);
        }

        public Task SetUserReputationAsync(int appUserId, double reputation, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<double>(UserReputationId_Key + appUserId, reputation, 0, cacheDurationInMinutes);
        }

        public int? GetUserPostsCount(string appUserId)
        {
            return _cacheProvider.RetrieveFromCache<int?>(UserPostCountId_Key + appUserId);
        }

        public Task<int?> GetUserPostsCountAsync(int appUserId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>(UserPostCountId_Key + appUserId);
        }

        public void SetUserPostsCount(string appUserId, int postCount, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int>(UserPostCountId_Key + appUserId, postCount, 0, cacheDurationInMinutes);
        }

        public Task SetUserPostsCountAsync(int appUserId, int postCount, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>(UserPostCountId_Key + appUserId, postCount, 0, cacheDurationInMinutes);
        }
        // USER INTEREST COUNT
        public int? GetUserInterestCount(string appUserId)
        {
            return _cacheProvider.RetrieveFromCache<int?>(UserInterestCountId_Key + appUserId);
        }

        public Task<int?> GetUserInterestCountAsync(int appUserId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>(UserInterestCountId_Key + appUserId);
        }

        public void SetUserInterestCount(string appUserId, int interestCount, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int>(UserInterestCountId_Key + appUserId, interestCount, 0, cacheDurationInMinutes);
        }

        public Task SetUserInterestCountAsync(int appUserId, int interestCount, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>(UserInterestCountId_Key + appUserId, interestCount, 0, cacheDurationInMinutes);
        }
        // USER FAVOURITE COUNT
        public int? GetUserFavouriteCount(string appUserId)
        {
            return _cacheProvider.RetrieveFromCache<int?>(UserFavouriteCountId_Key + appUserId);
        }

        public Task<int?> GetUserFavouriteCountAsync(int appUserId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>(UserFavouriteCountId_Key + appUserId);
        }

        public void SetUserFavouriteCount(string appUserId, int favouriteCount, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int>(UserFavouriteCountId_Key + appUserId, favouriteCount, 0, cacheDurationInMinutes);
        }

        public Task SetUserFavouriteCountAsync(int appUserId, int favouriteCount, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>(UserFavouriteCountId_Key + appUserId, favouriteCount, 0, cacheDurationInMinutes);
        }
    }
}
