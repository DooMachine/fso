using fso.Core.Domains;
using fso.Core.Domains.Helpers;
using fso.DataExtensions.Models;
using fso.DataExtensions.Models.Feed;

namespace fso.DataExtensions.DataServices
{
    public interface IFeedDataService
    {
        HomeFeedReturn GetUserFeed(string currUserId, PaginatedRequest feedReq, PaginatedRequest urecReq, PaginatedRequest grecReq);
        PaginatedInterestCard GetUserInterests(string currUserId, PaginatedRequest req);
        PaginatedUserActivityFeed GetPaginatedUserActivityFeed(string currUserId, string[] followingUserIds, PaginatedRequest parameters);
        PaginatedUserActivityFeed ConverActivitiesToDTOModels(string currUserId, PaginatedList<UserActivity> activities);
        PaginatedUserInfoRecommendation GetPaginatedUserRecommendations(string currUserId, string[] followingUserIds, int[] followingGroups, PaginatedRequest parameters);
        PaginatedGroupRecommendation GetPaginatedGroupRecommendations(string currUserId, string[] followingUserIds, int[] followingGroups, PaginatedRequest parameters);
    }
}
