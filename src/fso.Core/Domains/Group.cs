using fso.Core.Domains.MMEntities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace fso.Core.Domains
{
    public class Group : BaseEntity
    {

        [StringLength(128)]
        public string UrlKey { get; set; }

        [StringLength(256)]
        public string Name { get; set; }
        [StringLength(256)]
        public string Description { get; set; }
        // MAY SET MAX LENGHT
        [StringLength(1024)]
        public string About { get; set; }
        [StringLength(256)]
        public string ColorAlpha { get; set; }

        [StringLength(64)]
        public string PredictedLanguage { get; set; }
        /// <summary>
        /// Popularity(Trending) Level of Group. (Follower Last Day * Post Count In Last Day)
        /// It will be updated every 6 hour for posts that posted in last day.
        /// </summary>
        public virtual ICollection<Popularity> PopularityLevel { get; set; }

        public virtual AppMediaFile ProfileImage { get; set; }

        public virtual AppMediaFile CoverImage { get; set; }

        public virtual ICollection<UserGroup> UsersFollowing  { get; set; }

        public virtual ICollection<GroupPost> Posts { get; set; }

        public virtual ICollection<GroupRelation> Childs { get; set; }

        public virtual ICollection<GroupRelation> Parents { get; set; }

    }

}
