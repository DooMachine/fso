using System;

namespace fso.Core.Domains.MMEntities
{
    public class UserPostLike
    {
        public int PostId { get; set; }
        public string UserInfoId { get; set; }

        public virtual UserInfo User { get; set; }
        public virtual Post Post { get; set; }

        public DateTime DateUtcLiked { get; set; }
    }
}
