using fso.Core.Domains.Helpers.Enum;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace fso.Core.Domains
{
    public class PostCollection : BaseEntity
    {
        [StringLength(320)]
        public string Description { get; set; }
        [StringLength(100)]
        public string Name { get; set; }

        public virtual PrivacyStatus PrivacyStatus { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        public virtual UserInfo UserInfo { get; set; }

        public string UserInfoId { get; set; }

        public virtual AppMediaFile ThumbFile { get; set; }

        public int? ThumbFileId { get; set; }

    }
}
