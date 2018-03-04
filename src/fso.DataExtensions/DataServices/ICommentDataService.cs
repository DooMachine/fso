using fso.DataExtensions.Models.Comment;
using System;
using System.Threading.Tasks;

namespace fso.DataExtensions.DataServices
{
    public interface ICommentDataService
    {
        ReviewCommentsReturnModel GetReviewComments(int reviewId, int pageIndex, int pageSize,string order, string currUserId);
        ReviewCommentsReturnModel GetSubComments(int commentId, int pageIndex, int pageSize, string order, string currUserId);

        int? GetCommentLikeCount(int commentId);
        Task<int?> GetCommentLikeCountAsync(int commentId);
        int? GetCommentDislikeCount(int CommentId);
        Task<int?> GetCommentDislikeCountAsync(int CommentId);
    }
}
