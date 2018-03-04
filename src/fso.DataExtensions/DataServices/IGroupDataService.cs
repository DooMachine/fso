
using fso.DataExtensions.Models;
using fso.DataExtensions.Models.GroupReturnModels;
using fso.DataExtensions.Models.GroupReturnModels.GroupIndex;
using fso.DataExtensions.Models.UserInfo;
using System.Linq;

namespace fso.DataExtensions.DataServices
{
    public interface IGroupDataService 
    {
        bool IsUrlKeyAlreadyExist(string urlKey);
        int GetGroupFollowerCount(int groupId, int cacheTreshold);
        GroupIndexReturn GetGroupIndex(string urlKey,string currUserId, int pageIndex = 1, int pageSize = 8, string order = "publishDate");
        PaginatedPostCardReturn GetGroupPosts(string urlKey, string currUserId, int pageIndex = 1, int pageSize = 8, string order = "publishDate");
        PaginatedPostCardReturn GeUnreviewedPosts(string urlkey, string currUserId, int pageIndex = 1, int pageSize = 12, string order="publishDate");
        PaginatedPostCardReturn GetTrendingPosts(string urlkey, string currUserId, int pageIndex = 1, int pageSize = 12, string order = "weekly");
        UserFollowUsersReturn GetGroupUsers(string urlkey, string currUserId, int pageIndex = 1, int pageSize = 24, string order = "reputationInGroup");
        IQueryable<InterestCard> GetAutoCompleteInterest(string query, int pageSize = 4);
    }
}
