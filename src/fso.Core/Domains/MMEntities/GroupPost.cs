

using System;

namespace fso.Core.Domains.MMEntities
{
    public class GroupPost
    {
        public virtual Group Group { get; set; }
        public int GroupId { get; set; }
        public virtual Post Post { get; set; }
        public int PostId { get; set; }

        /// <summary>
        /// Post Popularity Level In Group ( FavouriteCount * ReviewCount / Date Publish - Date Now )
        /// Normalized between integer 0 - 10000
        /// </summary>
        public int? PostPopularityLevel { get; set; }
        public DateTime DateUtcAdded { get; set; }
    }
}
