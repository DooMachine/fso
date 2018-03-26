
namespace fso.EventCore.CommentActions
{
    public class UserAddedCommentAction : BaseAction
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public string ReviewAuthorId { get; set; }
        public int ReviewId { get; set; }
        //public int? ParentCommentId { get; set; }
        public int CommentId { get; set; }
        public int PostId { get; set; }
        public string PostUrlKey { get; set; }
    }
}
