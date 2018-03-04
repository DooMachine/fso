

namespace fso.EventCore.ReviewActions
{
    public class UserDeletedReviewAction : BaseAction
    {
        public string UserId { get; set; }
        public int PostId { get; set; }
        public int ReviewId { get; set; }
    }
}
