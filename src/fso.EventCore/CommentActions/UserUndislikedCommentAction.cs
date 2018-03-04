

namespace fso.EventCore.CommentActions
{
    public class UserUndislikedCommentAction : BaseAction
    {
        public string UserId { get; set; }
        public int CommentId { get; set; }
    }
}
