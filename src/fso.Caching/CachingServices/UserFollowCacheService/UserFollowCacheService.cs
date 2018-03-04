

using fso.Core.Caching;
using fso.Core.Domains;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public class UserFollowCacheService : IUserFollowCacheService
    {
        private readonly static string UserFollowerCountId_Key = "UserFollowerCount_";
        private readonly static string UserFollowingCountId_Key = "UserFollowwingCount_";
        private readonly static string User_Following_User_Ids_Key = "User_Follow_Info_";
        private readonly ICacheProvider _cacheProvider;
        public UserFollowCacheService(ICacheProvider cacheProvider)
        {
            _cacheProvider = cacheProvider;
        }
        public Dictionary<string, FollowState> GetFollowingUserIds(string userId)
        {
            return _cacheProvider.RetrieveFromCache<Dictionary<string, FollowState>>(User_Following_User_Ids_Key + userId);
        }

        public Task<Dictionary<string, FollowState>> GetFollowingUserIdsAsync(string userId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<Dictionary<string, FollowState>>(User_Following_User_Ids_Key + userId);
        }

        public void SetFollowingUserIds(string userId, Dictionary<string, FollowState> followInfo, int expirationInMinutes)
        {
            _cacheProvider.SaveToCache<Dictionary<string, FollowState>>(User_Following_User_Ids_Key + userId, followInfo, 0, expirationInMinutes);
        }

        public Task SetFollowingUserIdsAsync(string userId, Dictionary<string, FollowState> followInfo, int expirationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync(User_Following_User_Ids_Key + userId, followInfo, 0, expirationInMinutes);
        }

        // USER FOLLOWER COUNT
        public int? GetUserFollowerCount(string appUserId)
        {
            return _cacheProvider.RetrieveFromCache<int?>(UserFollowerCountId_Key + appUserId);
        }

        public Task<int?> GetUserFollowerCountAsync(int appUserId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>(UserFollowerCountId_Key + appUserId);
        }

        public void SetUserFollowerCount(string appUserId, int followerCount, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int>(UserFollowerCountId_Key + appUserId, followerCount, 0, cacheDurationInMinutes);
        }

        public Task SetUserFollowerCountAsync(int appUserId, int followerCount, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>(UserFollowerCountId_Key + appUserId, followerCount, 0, cacheDurationInMinutes);
        }
        // USER FOLLOWING COUNT
        public int? GetUserFollowingCount(string appUserId)
        {
            return _cacheProvider.RetrieveFromCache<int?>(UserFollowingCountId_Key + appUserId);
        }

        public Task<int?> GetUserFollowingCountAsync(int appUserId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>(UserFollowingCountId_Key + appUserId);
        }

        public void SetUserFollowingCount(string appUserId, int followingCount, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int>(UserFollowingCountId_Key + appUserId, followingCount, 0, cacheDurationInMinutes);
        }

        public Task SetUserFollowingCountAsync(int appUserId, int followingCount, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>(UserFollowingCountId_Key + appUserId, followingCount, 0, cacheDurationInMinutes);
        }

        public void RemoveUserFollowingUserIds(string userId)
        {
            _cacheProvider.Remove(User_Following_User_Ids_Key + userId);

        }
        public Task RemoveUserFollowingUserIdsAsync(string userId)
        {
            return _cacheProvider.RemoveAsync(User_Following_User_Ids_Key + userId);
        }

        public void RemoveAllUserCache(string userId)
        {
            _cacheProvider.RemoveAsync(User_Following_User_Ids_Key + userId);
            _cacheProvider.RemoveAsync(UserFollowerCountId_Key + userId);
            _cacheProvider.RemoveAsync(UserFollowingCountId_Key + userId);
        }
        public async Task<int> RemoveAllUserCacheAsync(string userId)
        {
            await _cacheProvider.RemoveAsync(User_Following_User_Ids_Key + userId);
            await _cacheProvider.RemoveAsync(UserFollowerCountId_Key + userId);
            await _cacheProvider.RemoveAsync(UserFollowingCountId_Key + userId);
            return await Task.FromResult(0);
        }
    }
}

