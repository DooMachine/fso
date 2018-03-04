
using fso.Core.Domains.MMEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace fso.Core.Domains
{
    public class Review : BaseEntity
    {
        [StringLength(10126)]
        public string Content { get; set; }

        public DateTime DateUtcPublished { get; set; }

        public bool IsPublished => DateTime.UtcNow >= DateUtcPublished;
        /// <summary>
        /// Gets or sets the user of Review
        /// </summary>
        public virtual UserInfo UserInfo { get; set; }
        public string UserId { get; set; }
        /// <summary>
        /// Gets or sets Post 
        /// </summary>
        public virtual Post Post { get; set; }
        public int? PostId { get; set; }
        /// <summary>
        /// Post Rating
        /// </summary>
        public double? PostRate { get; set; }
        /// <summary>
        /// Reviewer reputation when he adds this review.
        /// This value is using to calculate post rating.
        /// </summary>
        public double? UserReputation { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }

        public virtual ICollection<ReputationGain> ReputationGains { get; set; }        

        public virtual ICollection<UserReview> UserLikes { get; set; }
    }
}
