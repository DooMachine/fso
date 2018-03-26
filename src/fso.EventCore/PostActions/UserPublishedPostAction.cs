
namespace fso.EventCore.PostActions
{
    public class UserPublishedPostAction : BaseAction
    {
        public int PostId { get; set; }
        public string PostTitle { get; set; }
        public string PostUrlKey { get; set; }
        public string UserId { get; set; }
    }
}
