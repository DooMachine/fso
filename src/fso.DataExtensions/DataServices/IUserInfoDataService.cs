using fso.Core.Domains.Helpers;
using fso.Core.Domains.MMEntities;
using fso.DataExtensions.Models;
using fso.DataExtensions.Models.Review;
using fso.DataExtensions.Models.User;
using fso.DataExtensions.Models.UserInfo;
using System.Linq;

namespace fso.DataExtensions.DataServices
{
    public interface IUserInfoDataService
    {
        UserInfoProfileReturn GetUserProfileInfo(string userName, string currUserId);

        FollowUserReturn FollowUser(string followedId, string followingId);

        FollowUserReturn UnFollowUser(string followedId, string followingId);

        IQueryable<UserGroup> GetFollowedUserGroups(string appUserId);

        PaginatedList<UserCardModel> GetUserFollowings(string userName, int pageIndex, int pageSize, string currUserId);

        PaginatedList<UserCardModel> GetUserFollowers(string userName, int pageIndex, int pageSize, string currUserId);

        UserInterestsReturn GetUserInterests(string userName, int pageIndex, int pageSize, string currUserId);
        UserInterestsReturn GetUserInterests(string userName, int pageIndex, int pageSize);
        UserBestPostsReturn GetBestPosts(string userName, int pageSize);
        UserPostsReturn GetUserPosts(string userName, string currUserId, int pageIndex, int pageSize);
        UserReviewsReturnModel GetUserReviews(string userName, int pageIndex, int pageSize, string order, string currUserId);
        UserPostCollectionsReturn GetUserPostCollections(string userName, int pageIndex, int pageSize, string order);
        PaginatedPostCardReturn GetUserFavourites(string userName, int pageIndex, int pageSize, string order,string currUserId);
        FollowGroupReturn FollowGroup(string appUserId, int groupId);
        FollowGroupReturn UnfollowGroup(string appUserId, int groupId);
        int GetUserInterestCount(string appUserId, int cacheTreshold);
        int GetUserFollowerCount(string appUserId, int cacheTreshold);
        int GetUserFollowingCount(string appUserId, int cacheTreshold);
        bool IsUserFollowing(string currUserId, string targetUserId);
        string GetUserId(string userName);
    }
}
