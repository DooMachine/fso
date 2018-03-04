

namespace fso.EventCore.ReviewActions
{
    public class UserUndislikedReviewAction : BaseAction
    {
        public string UserId { get; set; }
        public int ReviewId { get; set; }
    }
}
