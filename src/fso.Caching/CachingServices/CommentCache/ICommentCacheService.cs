
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public interface ICommentCacheService
    {
        int? GetCommentLikeCount(int commentId);
        Task<int?> GetCommentLikeCountAsync(int commentId);
        void SetCommentLikeCount(int commentId, int likeCount, int cacheDurationInMinutes);
        Task SetCommentLikeCountAsync(int commentId, int likeCount, int cacheDurationInMinutes);

        int? GetCommentDislikeCount(int CommentId);
        Task<int?> GetCommentDislikeCountAsync(int CommentId);
        void SetCommentDislikeCount(int CommentId, int dislikeCount, int cacheDurationInMinutes);
        Task SetCommentDislikeCountAsync(int CommentId, int dislikeCount, int cacheDurationInMinutes);
    }
}
