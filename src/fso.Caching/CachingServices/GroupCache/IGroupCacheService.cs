

using fso.Core.Domains.MMEntities;
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public interface IGroupCacheService
    {
        int? GetFollowingUserCount(int groupId);

        Task<int?> GetFollowingUserCountAsync(int groupId);

        void SetFollowingUserCount(int groupId, int followerCount, int expirationInMinutes);

        Task SetFollowingUserCountAsync(int groupId, int followerCount, int expirationInMinutes);

        GroupPost[] GetPostRelationships(int groupId);

        Task<GroupPost[]> GetPostRelationshipsAsync(int groupId);

        void SetPostRelationships(int groupId, GroupPost[] groupPosts, int expirationInMinutes);

        Task SetPostRelationshipsAsync(int groupId, GroupPost[] groupPosts, int expirationInMinutes);
    }
}
