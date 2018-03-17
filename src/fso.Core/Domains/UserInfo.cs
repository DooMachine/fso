using fso.Core.Domains.MMEntities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace fso.Core.Domains
{
    public class UserInfo : BaseEntity
    {
        /// <summary>
        /// IDENTITYSERVER ID
        /// </summary>
        [Key]
        [StringLength(64)]
        public string AppUserId { get; set; }
        [StringLength(128)]
        public string Name { get; set; }
        [StringLength(128)]
        public string Surname { get; set; }
        [StringLength(512)]
        public string Status { get; set; }
        [StringLength(64)]
        public string UName { get; set; }
        [StringLength(32)]
        public string AlphaColor { get; set; }

        [StringLength(64)]
        public string LanguagePreference { get; set; }

        [StringLength(64)]
        public string PredictedLanguage { get; set; }

        public string ProfileImageUnsafe => "http://cdn.localhost/fimg/u/" + AppUserId + "/230x230.jpeg";
        public UserFollowSetting FollowSetting { get; set; }
        public UserPrivacySetting PrivacySetting { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }

        public virtual ICollection<CommentUser> CommentLikes { get; set; }

        public virtual ICollection<UserPostLike> PostLikes { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        public virtual ICollection<ReputationGain> ReputationGains { get; set; }

        public virtual ICollection<FollowInfo> Followers { get; set; }

        public virtual ICollection<FollowInfo> Following { get; set; }

        public virtual ICollection<UserGroup> FollowingGroups { get; set; }

        public virtual ICollection<PostCollection> Collections { get; set; }

        /// <summary>
        /// Like/ Dislike Review
        /// </summary>
        public virtual ICollection<UserReview> LikedReviews { get; set; }

        public virtual AppMediaFile ProfilePicture { get; set; }

        public int? ProfilePictureId { get; set; }

        public string FullName => Name + " " + Surname;
    }

    public enum UserFollowSetting { Confirm_All, Ask_All, Deny_All }
    public enum UserPrivacySetting { Private, Public }
}
