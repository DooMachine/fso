
using System;

namespace fso.DataExtensions.Models
{
    public class PostReviewsDisplay
    {
        public int TotalReviewCount { get; set; }

        /// <summary>
        /// Reveal The Best Review
        /// </summary>
        public PostReviewDetailDisplay ReviewDetail { get; set; }
    }

    public class PostReviewDetailDisplay
    {
        public int Id { get; set; }

        public DateTime DatePublish { get; set; }

        public string Content { get; set; }

        public string Description { get; set; }

        public bool IsCurrentUserLiked { get; set; }
        /// <summary>
        /// User Information Of Review
        /// </summary>
        public ReviewUserDisplay UserInfo { get; set; }
        public int CommentCount { get; set; }
        
    }
}
