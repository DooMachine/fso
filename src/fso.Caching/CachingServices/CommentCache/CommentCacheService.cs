using fso.Core.Caching;
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public class CommentCacheService : ICommentCacheService
    {
        private readonly string CommentLikeCountId = "CommentLikeCount_";
        private readonly string CommentDislikeCountId = "CommentDislikeCount_";
        private readonly ICacheProvider _cacheProvider;
        public CommentCacheService(ICacheProvider cacheProvider)
        {
            _cacheProvider = cacheProvider;
        }

        public int? GetCommentLikeCount(int CommentId)
        {
            return _cacheProvider.RetrieveFromCache<int?>(CommentLikeCountId + CommentId);
        }

        public Task<int?> GetCommentLikeCountAsync(int CommentId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>(CommentLikeCountId + CommentId);
        }

        public void SetCommentLikeCount(int CommentId, int likeCount, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int>(CommentLikeCountId + CommentId.ToString(), likeCount, 0, cacheDurationInMinutes);
        }

        public Task SetCommentLikeCountAsync(int CommentId, int likeCount, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>(CommentLikeCountId + CommentId.ToString(), likeCount, 0, cacheDurationInMinutes);
        }

        public int? GetCommentDislikeCount(int CommentId)
        {
            return _cacheProvider.RetrieveFromCache<int?>(CommentDislikeCountId + CommentId);
        }

        public Task<int?> GetCommentDislikeCountAsync(int CommentId)
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>(CommentDislikeCountId + CommentId);
        }

        public void SetCommentDislikeCount(int CommentId, int dislikeCount, int cacheDurationInMinutes)
        {
            _cacheProvider.SaveToCache<int>(CommentDislikeCountId + CommentId.ToString(), dislikeCount, 0, cacheDurationInMinutes);
        }

        public Task SetCommentDislikeCountAsync(int CommentId, int dislikeCount, int cacheDurationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>(CommentDislikeCountId + CommentId.ToString(), dislikeCount, 0, cacheDurationInMinutes);
        }
    }
}
