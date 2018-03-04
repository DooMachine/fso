

namespace fso.EventCore.ReviewActions
{
    public class UserUnlikedReviewAction : BaseAction
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public int ReviewId { get; set; }
        public string ReviewAuthorId { get; set; }
        public int PostId { get; set; }
    }
}
