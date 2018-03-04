
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public interface IPostCacheService
    {
        int? GetPostLikesCount(int postId);
        Task<int?> GetPostLikesCountAsync(int postId);
        void SetPostLikesCount(int postId, int likeCount, int cacheDurationInMinutes);        
        Task SetPostLikesCountAsync(int postId, int likeCount, int cacheDurationInMinutes);

        double? GetPostRating(int postId);
        Task<double?> GetPostRatingAsync(int postId);
        void SetPostRating(int postId, double rating, int cacheDurationInMinutes);
        Task SetPostRatingAsync(int postId, double rating, int cacheDurationInMinutes);
        void RemovePostRateCache(int postId);

        int[] GetSimiliarPostIds(int postId);

        Task<int[]> GetSimiliarPostIdsAsync(int postId);

        void SetSimiliarPostIds(int postId, int[] similiarPosts, int cacheDurationInMinutes);

        Task SetSimiliarPostIdsAsync(int postId, int[] similiarPosts, int cacheDurationInMinutes);

        
    }
}
