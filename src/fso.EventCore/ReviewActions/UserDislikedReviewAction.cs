

namespace fso.EventCore.ReviewActions
{
    public class UserDislikedReviewAction : BaseAction
    {
        public string UserId { get; set; }
        public int ReviewId { get; set; }
    }
}
