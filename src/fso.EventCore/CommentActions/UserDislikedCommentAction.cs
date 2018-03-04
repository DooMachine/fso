

namespace fso.EventCore.CommentActions
{
    public class UserDislikedCommentAction : BaseAction
    {
        public string UserId { get; set; }
        public int CommentId { get; set; }
    }
}
