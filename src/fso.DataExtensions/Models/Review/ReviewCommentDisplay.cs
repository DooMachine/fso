using fso.Core.Domains.Helpers;
using fso.DataExtensions.Models.UserInfo;
using System;

namespace fso.DataExtensions.Models.Review
{
    public class ReviewCommentDisplay
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public int SubCommentCount { get; set; }
        public SubCommentList SubComments { get; set; }

        public int LikeCount { get; set; }

        public int DislikeCount { get; set; }

        public bool IsCurrentUserLiked { get; set; }

        public bool IsCurrentUserDisliked { get; set; }

        public DateTime DateUtcAdd { get; set; }

        public DateTime DateUtcModified { get; set; }

        public UserInfoExtraSmall AuthorInfo { get; set; }
    }

    public class SubCommentList
    {
        public PaginatedList<ReviewCommentDisplay> SubComments { get; set; }
    }
}
