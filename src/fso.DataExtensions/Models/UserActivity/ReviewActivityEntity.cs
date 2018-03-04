

using fso.Core.Domains.MMEntities;
using System;

namespace fso.DataExtensions.Models
{
    public class ReviewActivityEntity : IActivityEntity
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string Content { get; set; }
        public DateTime DateUtcPublished { get; set; }
        public string Url { get; set; }
        public double PostRate { get; set; }
        public int LikeCount { get; set; }
        public int DislikeCount { get; set; }
        public LikeStatus LikeStatus { get; set; }
        public int CommentCount { get; set; }
        public BaseUserInfoDisplay AuthorInfo { get; set; }
        public PaginatedComments Comments { get; set; } = new PaginatedComments();
        public bool ShowCommentForm { get; set; } = false;
        public bool CommentFormPending { get; set; } = false;
        public bool ShowComments { get; set; } = false;
        public string CommentFormError { get; set; }


    }
    public class CommentReviewActivityEntity : IActivityEntity
    {
        public int Id { get; set; }
        public DateTime DateUtcPublished { get; set; }
        public string Content { get; set; }
        public string Url { get; set; }
        public int PostRate { get; set; }
        public int LikeCount { get; set; }
        public int DislikeCount { get; set; }
        public bool IsUserLiked { get; set; }
        public BaseUserInfoDisplay AuthorInfo { get; set; }
        public int CommentCount { get; set; }
    }
}
