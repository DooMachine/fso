using fso.Core.Domains.MMEntities;

namespace fso.Core.Domains
{
    public class CommentUser : BaseMMEntity
    {
        public virtual Comment Comment { get; set; }
        public int? CommentId { get; set; }
        public virtual UserInfo UserInfo { get; set; }
        public string UserInfoId { get; set; }

        public LikeStatus LikeStatus { get; set; }
    }
}
