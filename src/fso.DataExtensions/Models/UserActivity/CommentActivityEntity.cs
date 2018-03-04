

using System;

namespace fso.DataExtensions.Models
{
    public class CommentActivityEntity : IActivityEntity
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int LikeCount { get; set; }
        public int DislikeCount { get; set; }
        public DateTime DateUtcAdded { get; set; }
        public DateTime DateUtcModified { get; set; }

        public bool IsUserLiked { get; set; }
        public bool IsUserDisliked { get; set; }
    }
}
