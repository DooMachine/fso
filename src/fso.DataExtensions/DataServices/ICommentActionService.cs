using fso.DataExtensions.Models;
using System;

namespace fso.DataExtensions.DataServices
{
    public interface ICommentActionService
    {
        CommentAddReturnModel PublishComment(string content, string currUserId, int reviewId);
        CommentLikeReturnModel LikeComment(string currUserId, int commentId);
        CommentLikeReturnModel UnLikeComment(string currUserId, int commentId);
        CommentLikeReturnModel DislikeComment(string currUserId, int commentId);
        CommentLikeReturnModel UnDislikeComment(string currUserId, int commentId);
        BaseReturnModel RemoveComment(int commentId, string currUserId);
        CommentEditReturnModel EditComment(int commentId,string content, string currUserId);
    }
}
