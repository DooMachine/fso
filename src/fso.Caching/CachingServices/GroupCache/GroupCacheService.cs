

using fso.Core.Caching;
using fso.Core.Domains.MMEntities;
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public class GroupCacheService : IGroupCacheService
    {
        private static string Group_Following_User_Count_Key = "Group_Following_User_Count_";
        private static string Group_Post_Relations_Key = "Group_Post_Relations_";
        private readonly ICacheProvider _cacheProvider;
        public GroupCacheService(ICacheProvider cacheProvider)
        {
            _cacheProvider = cacheProvider;
        }
        public int? GetFollowingUserCount(int groupId)
        {           
            return _cacheProvider.RetrieveFromCache<int?>(Group_Following_User_Count_Key + groupId);
        }

        public Task<int?> GetFollowingUserCountAsync(int groupId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>(Group_Following_User_Count_Key + groupId);
        }

        public void SetFollowingUserCount(int groupId, int followerCount, int expirationInMinutes)
        {
            _cacheProvider.SaveToCache<int>(Group_Following_User_Count_Key + groupId, followerCount, 0, expirationInMinutes);
        }

        public Task SetFollowingUserCountAsync(int groupId, int followerCount, int expirationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>(Group_Following_User_Count_Key + groupId, followerCount, 0, expirationInMinutes);
        }

        public GroupPost[] GetPostRelationships(int groupId)
        {
            return _cacheProvider.RetrieveFromCache<GroupPost[]>(Group_Post_Relations_Key + groupId);
        }

        public Task<GroupPost[]> GetPostRelationshipsAsync(int groupId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<GroupPost[]>(Group_Post_Relations_Key + groupId);
        }

        public void SetPostRelationships(int groupId, GroupPost[] groupPosts, int expirationInMinutes)
        {
            _cacheProvider.SaveToCache<GroupPost[]>(Group_Post_Relations_Key + groupId, groupPosts, 0, expirationInMinutes);
        }

        public Task SetPostRelationshipsAsync(int groupId, GroupPost[] groupPosts, int expirationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<GroupPost[]>(Group_Post_Relations_Key + groupId, groupPosts, 0, expirationInMinutes);
        }
    }
}
