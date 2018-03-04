using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using fso.Core.Caching;
using fso.Core.Domains.MMEntities;

namespace fso.Caching.CachingServices
{
    public class UserLikeCacheService : IUserLikeCacheService
    {
        private readonly static string UserLikedPostsId_Key = "UserLikedPostsId_";
        private readonly static string UserLikedReviewsId_Key = "UserLikedReviewsId_";
        private readonly static string UserLikedCommentsId_Key = "UserLikedCommentsId_";
        private readonly static string UserDisikedReviewsId_Key = "UserDisikedReviewsId_";
        private readonly static string UserDisikedCommentsId_Key = "UserDisikedCommentsId_";
        private readonly static string UserFollowingGroupsId_Key = "UserFollowingGroupsId_";
        private readonly ICacheProvider _cacheProvider;
        public UserLikeCacheService(ICacheProvider cacheProvider)
        {
            _cacheProvider = cacheProvider;
        }
        public List<UserReview> GetUserReviewLikes(string userId)
        {
            return _cacheProvider.RetrieveFromCache<List<UserReview>>("User_Review_Likes_" + userId);
        }

        public Task<List<UserReview>> GetUserReviewLikesAsync(string userId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<List<UserReview>>("User_Review_Likes_" + userId);
        }

        public void SetUserReviewLikes(string userId, List<UserReview> userLikes, int expirationInMinutes)
        {
            _cacheProvider.SaveToCache<List<UserReview>>("User_Review_Likes_" + userId, userLikes, 0, expirationInMinutes);
        }

        public Task SetUserReviewLikesAsync(string userId, List<UserReview> userLikes, int expirationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<List<UserReview>>("User_Review_Likes_" + userId, userLikes, 0, expirationInMinutes);
        }
        public int[] GetUserLikedReviewsIds(string appUserId)
        {
            return _cacheProvider.RetrieveFromCache<int[]>(UserLikedReviewsId_Key + appUserId);
        }

        public Task<int[]> GetUserLikedReviewsIdsAsync(int appUserId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int[]>(UserLikedReviewsId_Key + appUserId);
        }

        public void SetUserLikedReviewsIds(string appUserId, int[] likedReviewIds, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int[]>(UserLikedReviewsId_Key + appUserId, likedReviewIds, 0, cacheDurationInMinutes);
        }

        public Task SetUserLikedReviewsIdsAsync(int appUserId, int[] likedReviewIds, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int[]>(UserLikedReviewsId_Key + appUserId, likedReviewIds, 0, cacheDurationInMinutes);
        }
        // LIKED COMMENTS
        public int[] GetUserLikedCommentsIds(string appUserId)
        {
            return _cacheProvider.RetrieveFromCache<int[]>(UserLikedCommentsId_Key + appUserId);
        }

        public Task<int[]> GetUserLikedCommentsIdsAsync(int appUserId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int[]>(UserLikedCommentsId_Key + appUserId);
        }

        public void SetUserLikedCommentsIds(string appUserId, int[] likedCommentsIds, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int[]>(UserLikedCommentsId_Key + appUserId, likedCommentsIds, 0, cacheDurationInMinutes);
        }

        public Task SetUserLikedCommentsIdsAsync(int appUserId, int[] likedCommentsIds, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int[]>(UserLikedCommentsId_Key + appUserId, likedCommentsIds, 0, cacheDurationInMinutes);
        }
        // DISLIKED REVIEWS
        public int[] GetUserDisikedReviewsIds(string appUserId)
        {
            return _cacheProvider.RetrieveFromCache<int[]>(UserDisikedReviewsId_Key + appUserId);
        }

        public Task<int[]> GetUserDisikedReviewsIdsAsync(int appUserId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int[]>(UserDisikedReviewsId_Key + appUserId);
        }

        public void SetUserDisikedReviewsIds(string appUserId, int[] dislikedReviewIds, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int[]>(UserDisikedReviewsId_Key + appUserId, dislikedReviewIds, 0, cacheDurationInMinutes);
        }

        public Task SetUserDisikedReviewsIdsAsync(int appUserId, int[] dislikedReviewIds, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int[]>(UserDisikedReviewsId_Key + appUserId, dislikedReviewIds, 0, cacheDurationInMinutes);
        }
        // DISLIKED COMMENTS
        public int[] GetUserDisikedCommentsIds(string appUserId)
        {
            return _cacheProvider.RetrieveFromCache<int[]>(UserDisikedCommentsId_Key + appUserId);
        }

        public Task<int[]> GetUserDisikedCommentsIdsAsync(int appUserId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int[]>(UserDisikedCommentsId_Key + appUserId);
        }

        public void SetUserDisikedCommentsIds(string appUserId, int[] dislikedCommentsIds, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int[]>(UserDisikedCommentsId_Key + appUserId, dislikedCommentsIds, 0, cacheDurationInMinutes);
        }

        public Task SetUserDisikedCommentsIdsAsync(int appUserId, int[] dislikedCommentsIds, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int[]>(UserDisikedCommentsId_Key + appUserId, dislikedCommentsIds, 0, cacheDurationInMinutes);
        }
        // LIKED POSTS
        public int[] GetUserLikedPostsIds(string appUserId)
        {
            return _cacheProvider.RetrieveFromCache<int[]>(UserLikedPostsId_Key + appUserId);
        }

        public Task<int[]> GetUserLikedPostsIdsAsync(int appUserId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int[]>(UserLikedPostsId_Key + appUserId);
        }

        public void SetUserLikedPostsIds(string appUserId, int[] likedPostIds, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int[]>(UserLikedPostsId_Key + appUserId, likedPostIds, 0, cacheDurationInMinutes);
        }

        public Task SetUserLikedPostsIdsAsync(int appUserId, int[] likedPostIds, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int[]>(UserLikedPostsId_Key + appUserId, likedPostIds, 0, cacheDurationInMinutes);
        }

        public int[] GetUserFollowingGroupsIds(string appUserId)
        {
            return _cacheProvider.RetrieveFromCache<int[]>(UserFollowingGroupsId_Key + appUserId);
        }

        public Task<int[]> GetUserFollowingGroupsIdsAsync(string appUserId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int[]>(UserFollowingGroupsId_Key + appUserId);
        }

        public void SetUserFollowingGroupsIds(string appUserId, int[] followingGroupIds, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int[]>(UserFollowingGroupsId_Key + appUserId, followingGroupIds, 0, cacheDurationInMinutes);
        }

        public Task SetUserFollowingGroupsIdsAsync(string appUserId, int[] followingGroupIds, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int[]>(UserFollowingGroupsId_Key + appUserId, followingGroupIds, 0, cacheDurationInMinutes);
        }
    }
}
