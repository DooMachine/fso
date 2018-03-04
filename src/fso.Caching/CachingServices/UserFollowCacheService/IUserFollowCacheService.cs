
using fso.Core.Domains;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public interface IUserFollowCacheService
    {
        Dictionary<string, FollowState> GetFollowingUserIds(string userId);
        Task<Dictionary<string, FollowState>> GetFollowingUserIdsAsync(string userId);
        void SetFollowingUserIds(string userId, Dictionary<string, FollowState> followingUserIds, int expirationInMinutes);
        Task SetFollowingUserIdsAsync(string userId, Dictionary<string, FollowState> followingUserIds, int expirationInMinutes);

        int? GetUserFollowerCount(string appUserId);

        Task<int?> GetUserFollowerCountAsync(int appUserId);

        void SetUserFollowerCount(string appUserId, int followerCount, int cacheDurationInMinutes);

        Task SetUserFollowerCountAsync(int appUserId, int followerCount, int cacheDurationInMinutes);

        int? GetUserFollowingCount(string appUserId);

        Task<int?> GetUserFollowingCountAsync(int appUserId);

        void SetUserFollowingCount(string appUserId, int followingCount, int cacheDurationInMinutes);

        Task SetUserFollowingCountAsync(int appUserId, int followingCount, int cacheDurationInMinutes);

        void RemoveUserFollowingUserIds(string userId);
        Task RemoveUserFollowingUserIdsAsync(string userId);

        void RemoveAllUserCache(string userId);
        Task<int> RemoveAllUserCacheAsync(string userId);
    }
}
