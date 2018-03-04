

using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public interface IReviewCacheService
    {
        int? GetReviewLikeCount(int reviewId);
        Task<int?> GetReviewLikeCountAsync(int reviewId);
        void SetReviewLikeCount(int reviewId, int likeCount, int cacheDurationInMinutes);
        Task SetReviewLikeCountAsync(int reviewId, int likeCount, int cacheDurationInMinutes);

        int? GetReviewDislikeCount(int ReviewId);
        Task<int?> GetReviewDislikeCountAsync(int ReviewId);
        void SetReviewDislikeCount(int ReviewId, int dislikeCount, int cacheDurationInMinutes);
        Task SetReviewDislikeCountAsync(int ReviewId, int dislikeCount, int cacheDurationInMinutes);

        int? GetReviewCommentCount(int reviewId);
        Task<int?> GetReviewCommentCountAsync(int reviewId);
        void SetReviewCommentCount(int reviewId, int commentCount, int cacheDurationInMinutes);
        Task SetReviewCommentCountAsync(int reviewId, int commentCount, int cacheDurationInMinutes);
    }
}
