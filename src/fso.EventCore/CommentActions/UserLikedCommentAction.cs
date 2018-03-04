
namespace fso.EventCore.CommentActions
{
    public class UserLikedCommentAction : BaseAction
    {
        public string UserId { get; set; }
        public int CommentId { get; set; }
    }
}
