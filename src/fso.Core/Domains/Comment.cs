using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace fso.Core.Domains
{
    public class Comment : BaseEntity
    {
        [StringLength(1024)]
        public string Content { get; set; }

        [StringLength(64)]
        public string PredictedLanguage { get; set; }

        public virtual UserInfo Author { get; set; }
        public string AuthorId { get; set; }
        /// <summary>
        /// Like and Dislike Same Entity Set (Table)
        /// </summary>
        public virtual ICollection<CommentUser> CommentLikes { get; set; }

        //public virtual ICollection<Comment> SubComments { get; set; }

        // Implement MicroService
        // public virtual ICollection<AbuseReport> AbuseReports { get; set; }

        //public virtual Comment ParentComment { get; set; }
        public int? ParentCommentId { get; set; }

        public virtual Review Review { get; set; }
        public int? ReviewId { get; set; }
    }
}
