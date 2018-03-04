
using fso.Core.Domains;
using fso.Core.Domains.MMEntities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace fso.DataExtensions.DataServices
{
    public interface IUserLikesDataService
    {
        int[] GetUserLikedReviewsIds(string appUserId);

        Task<int[]> GetUserLikedReviewsIdsAsync(string appUserId);

        int[] GetUserLikedCommentsIds(string appUserId);

        Task<int[]> GetUserLikedCommentsIdsAsync(string appUserId);

        int[] GetUserDisikedCommentsIds(string appUserId);

        Task<int[]> GetUserDisikedCommentsIdsAsync(string appUserId);

        int[] GetUserDisikedReviewsIds(string appUserId);

        Task<int[]> GetUserDisikedReviewsIdsAsync(string appUserId);

        int[] GetUserLikedPostsIds(string appUserId);

        Task<int[]> GetUserLikedPostsIdsAsync(string appUserId);

        int[] GetUserFollowingGroups(string appUserId, int cacheTreshold);

        Task<int[]> GetUserFollowingGroupsAsync(string appUserId, int cacheTreshold);

        Dictionary<string, FollowState> GetFollowingUserIds(string userId);

        int? GetUserFollowingCount(string appUserId);


    }
}
