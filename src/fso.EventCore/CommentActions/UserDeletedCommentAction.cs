
namespace fso.EventCore.CommentActions
{
    public class UserDeletedCommentAction : BaseAction
    {
        public string UserId { get; set; }
        public int CommentId { get; set; }
    }
}
