using fso.DataExtensions.Models;
using System;
using System.Collections.Generic;

namespace fso.DataExtensions.Models
{
    public class PostCard
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public bool IsPublished { get; set; }

        public DateTime DateUtcPublished { get; set; }

        public bool IsCurrentUserLiked { get; set; }
        public ICollection<PostPartDisplay> PostParts { get; set; }
        public BaseUserInfoDisplay AuthorInfo { get; set; }

        public int ReviewCount { get; set; }
        public int LikeCount { get; set; }
        // public PostReviewDetailDisplay BestReview { get; set; }
    }
}
