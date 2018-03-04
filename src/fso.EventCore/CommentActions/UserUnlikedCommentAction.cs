

namespace fso.EventCore.CommentActions
{
    public class UserUnlikedCommentAction : BaseAction
    {
        public string UserId { get; set; }
        public int CommentId { get; set; }
    }
}
