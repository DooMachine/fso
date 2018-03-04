using fso.Core.Domains.MMEntities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public interface IUserLikeCacheService
    {
        List<UserReview> GetUserReviewLikes(string userId);
        Task<List<UserReview>> GetUserReviewLikesAsync(string userId);
        void SetUserReviewLikes(string userId, List<UserReview> userLikes, int expirationInMinutes);
        Task SetUserReviewLikesAsync(string userId, List<UserReview> userLikes,int expirationInMinutes);
        int[] GetUserLikedReviewsIds(string appUserId);

        Task<int[]> GetUserLikedReviewsIdsAsync(int appUserId);

        void SetUserLikedReviewsIds(string appUserId, int[] likedReviewIds, int cacheDurationInMinutes);

        Task SetUserLikedReviewsIdsAsync(int appUserId, int[] likedReviewIds, int cacheDurationInMinutes);

        int[] GetUserLikedCommentsIds(string appUserId);

        Task<int[]> GetUserLikedCommentsIdsAsync(int appUserId);

        void SetUserLikedCommentsIds(string appUserId, int[] likedCommentsIds, int cacheDurationInMinutes);

        Task SetUserLikedCommentsIdsAsync(int appUserId, int[] likedCommentsIds, int cacheDurationInMinutes);

        int[] GetUserDisikedReviewsIds(string appUserId);

        Task<int[]> GetUserDisikedReviewsIdsAsync(int appUserId);

        void SetUserDisikedReviewsIds(string appUserId, int[] dislikedReviewIds, int cacheDurationInMinutes);

        Task SetUserDisikedReviewsIdsAsync(int appUserId, int[] dislikedReviewIds, int cacheDurationInMinutes);

        int[] GetUserDisikedCommentsIds(string appUserId);

        Task<int[]> GetUserDisikedCommentsIdsAsync(int appUserId);

        void SetUserDisikedCommentsIds(string appUserId, int[] dislikedCommentsIds, int cacheDurationInMinutes);

        Task SetUserDisikedCommentsIdsAsync(int appUserId, int[] dislikedCommentsIds, int cacheDurationInMinutes);

        int[] GetUserLikedPostsIds(string appUserId);

        Task<int[]> GetUserLikedPostsIdsAsync(int appUserId);

        void SetUserLikedPostsIds(string appUserId, int[] likedPostIds, int cacheDurationInMinutes);

        Task SetUserLikedPostsIdsAsync(int appUserId, int[] likedPostIds, int cacheDurationInMinutes);

        int[] GetUserFollowingGroupsIds(string appUserId);

        Task<int[]> GetUserFollowingGroupsIdsAsync(string appUserId);

        void SetUserFollowingGroupsIds(string appUserId, int[] followingGroupIds, int cacheDurationInMinutes);

        Task SetUserFollowingGroupsIdsAsync(string appUserId, int[] followingGroupIds, int cacheDurationInMinutes);
    }
}
