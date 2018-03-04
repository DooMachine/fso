using fso.Core.Caching;
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public class PostCacheService : IPostCacheService
    {
        private readonly string SimiliarPostIdsKey = "PostSimiliarPosts_";
        private readonly string PostRateKey = "PostRate_";
        private readonly ICacheProvider _cacheProvider;
        public PostCacheService(ICacheProvider cacheProvider)
        {
            _cacheProvider = cacheProvider;
        }

        public int? GetPostLikesCount(int postId)
        {
            return _cacheProvider.RetrieveFromCache<int?>("PostLikeCount_" + postId);
        }

        public Task<int?> GetPostLikesCountAsync(int postId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>("PostLikeCount_" + postId);
        }

        public void SetPostLikesCount(int postId, int likeCount, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int>("PostLikeCount_" + postId.ToString(), likeCount, 0, cacheDurationInMinutes);
        }

        public Task SetPostLikesCountAsync(int postId, int likeCount, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>("PostLikeCount_" + postId.ToString(), likeCount, 0, cacheDurationInMinutes);
        }

        public double? GetPostRating(int postId)
        {
            return _cacheProvider.RetrieveFromCache<double?>(PostRateKey + postId);
        }

        public Task<double?> GetPostRatingAsync(int postId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<double?>(PostRateKey + postId);
        }

        public void SetPostRating(int postId, double rating, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<double>(PostRateKey + postId.ToString(), rating, 0, cacheDurationInMinutes);
        }

        public Task SetPostRatingAsync(int postId, double rating, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<double>(PostRateKey + postId.ToString(), rating, 0, cacheDurationInMinutes);
        }
        public void RemovePostRateCache(int postId)
        {
            _cacheProvider.Remove(PostRateKey + postId.ToString());
        }

        public int[] GetSimiliarPostIds(int postId)
        {
            return _cacheProvider.RetrieveFromCache<int[]>(SimiliarPostIdsKey + postId);
        }

        public Task<int[]> GetSimiliarPostIdsAsync(int postId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int[]>(SimiliarPostIdsKey + postId);
        }

        public void SetSimiliarPostIds(int postId, int[] similiarPosts, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int[]>(SimiliarPostIdsKey + postId.ToString(), similiarPosts, 0, cacheDurationInMinutes);
        }

        public Task SetSimiliarPostIdsAsync(int postId, int[] similiarPosts, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int[]>(SimiliarPostIdsKey + postId.ToString(), similiarPosts, 0, cacheDurationInMinutes);
        }

        
    }
}
