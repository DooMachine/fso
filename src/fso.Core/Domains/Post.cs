using fso.Core.Domains.Helpers.Enum;
using fso.Core.Domains.MMEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace fso.Core.Domains
{
    public class Post : BaseEntity
    {
        [StringLength(256)]
        public string Title { get; set; }
        [StringLength(5012)]
        public string Content { get; set; }
        [StringLength(512)]
        public string UrlKey { get; set; }
        public PrivacyStatus PrivacyStatus { get; set; }
        [StringLength(2048)]
        public string Description { get; set; }
        /// <summary>
        /// Popularity (Trending) Level Of Post Worldwide (Favourites Last Day * Review Count Last Day)
        /// Updated every 6 hours
        /// </summary>
        public virtual ICollection<Popularity> Popularity { get; set; }
        [StringLength(64)]
        public string PredictedLanguage { get; set; }
        public DateTime DateUtcPublished { get; set; }
        public bool IsPublished { get; set; }

        public double? Rating { get; set; }
        

        public virtual UserInfo UserInfo { get; set; }
     
        public string UserInfoId { get; set; }
        /// <summary>
        /// Gets or sets reviews
        /// </summary>
        public virtual ICollection<Review> Reviews { get; set; }

        public virtual ICollection<PostPart> PostParts { get; set; }

        public virtual ICollection<ReputationGain> ReputationGains { get; set; }

        public virtual ICollection<GroupPost> Groups { get; set; }

        public virtual ICollection<UserPostLike> LikedUsers { get; set; }

        public virtual PostCollection Collection { get; set; }
        public int? CollectionId { get; set; }
        
    }
}
