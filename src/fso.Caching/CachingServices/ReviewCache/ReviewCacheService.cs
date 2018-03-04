using fso.Core.Caching;
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public class ReviewCacheService : IReviewCacheService
    {
        private readonly ICacheProvider _cacheProvider;
        public ReviewCacheService(ICacheProvider cacheProvider)
        {
            _cacheProvider = cacheProvider;
        }

        public int? GetReviewLikeCount(int ReviewId)
        {
            return _cacheProvider.RetrieveFromCache<int?>("ReviewLikeCount_" + ReviewId);
        }

        public Task<int?> GetReviewLikeCountAsync(int ReviewId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>("ReviewLikeCount_" + ReviewId);
        }

        public void SetReviewLikeCount(int ReviewId, int likeCount, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int>("ReviewLikeCount_" + ReviewId.ToString(), likeCount, 0, cacheDurationInMinutes);
        }

        public Task SetReviewLikeCountAsync(int ReviewId, int likeCount, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>("ReviewLikeCount_" + ReviewId.ToString(), likeCount, 0, cacheDurationInMinutes);
        }

        public int? GetReviewDislikeCount(int ReviewId)
        {
            return _cacheProvider.RetrieveFromCache<int?>("ReviewDislikeCount_" + ReviewId);
        }

        public Task<int?> GetReviewDislikeCountAsync(int ReviewId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>("ReviewDislikeCount_" + ReviewId);
        }

        public void SetReviewDislikeCount(int ReviewId, int dislikeCount, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int>("ReviewCommentCount_" + ReviewId.ToString(), dislikeCount, 0, cacheDurationInMinutes);
        }

        public Task SetReviewDislikeCountAsync(int ReviewId, int dislikeCount, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>("ReviewDislikeCount_" + ReviewId.ToString(), dislikeCount, 0, cacheDurationInMinutes);
        }

        public int? GetReviewCommentCount(int ReviewId)
        {
            return _cacheProvider.RetrieveFromCache<int?>("ReviewCommentCount_" + ReviewId);
        }

        public Task<int?> GetReviewCommentCountAsync(int ReviewId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>("ReviewCommentCount_" + ReviewId);
        }

        public void SetReviewCommentCount(int ReviewId, int commentCount, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int>("ReviewCommentCount_" + ReviewId.ToString(), commentCount, 0, cacheDurationInMinutes);
        }

        public Task SetReviewCommentCountAsync(int ReviewId, int commentCount, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>("ReviewCommentCount_" + ReviewId.ToString(), commentCount, 0, cacheDurationInMinutes);
        }
    }
}
