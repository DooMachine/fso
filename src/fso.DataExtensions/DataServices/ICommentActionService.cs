using fso.DataExtensions.Models.Comment;
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

    }
}
