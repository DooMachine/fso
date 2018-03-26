
namespace fso.EventCore.CommentActions
{
    public class UserLikedCommentAction : BaseAction
    {
        public string UserId { get; set; }
        public int CommentId { get; set; }

        public int PostId { get; set; }
        public int ReviewId { get; set; }
        public string PostUrlKey { get; set; }
    }
}
