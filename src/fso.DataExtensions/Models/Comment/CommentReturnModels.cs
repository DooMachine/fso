using fso.Core.Domains.Helpers;
using fso.Core.Domains.MMEntities;
using fso.DataExtensions.Models.UserInfo;
using System;

namespace fso.DataExtensions.Models
{

    public class ReviewCommentDTO
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime DateUtcPublished { get; set; }
        public virtual UserInfoExtraSmall UserInfo { get; set; }
        public string AuthorId { get; set; }
        public int LikeCount { get; set; }
        public int DislikeCount { get; set; }
        public int? ParentCommentId { get; set; }
        public int? ReviewId { get; set; }
        public LikeStatus LikeStatus { get; set; } = LikeStatus.None;
    }
    
    public class ReviewCommentsReturnModel : BaseReturnModel
    {
        public ReviewCommentsReturnModel() : base()
        {
        }
        public PaginatedList<ReviewCommentDisplay> Comments { get; set; }

        public bool HasNextPage { get; set; }

        public int? TotalCommentCount { get; set; }
    }
    public class CommentLikeReturnModel : BaseReturnModel
    {
        public CommentLikeReturnModel() : base()
        {
        }
        public LikeStatus LikeStatus { get; set; }

    }
    public class CommentAddReturnModel: BaseReturnModel
    {
        public CommentAddReturnModel() : base()
        {
        }
        public ReviewCommentDTO Comment { get; set; }
        public string ReviewAuthorId { get; set; }
        public int PostId { get; set; }
    }
    public class CommentEditReturnModel : BaseFormReturnModel{
        public CommentEditReturnModel() : base()
        {
        }
        public ReviewCommentDTO Comment { get; set; }
    }
    public class CommentVMReturn
    {
        public int Id { get; set; }
        public DateTime DateUtcAdd { get; set; }
        public string Content { get; set; }

        public CommentUserInfo UserInfo { get; set; }
    }

    public class CommentUserInfo
    {
        public string username { get; set; }

        public string imageUrl { get; set; }

        public string appUserId { get; set; }
    }
}
