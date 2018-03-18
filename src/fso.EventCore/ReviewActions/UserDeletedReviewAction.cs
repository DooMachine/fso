

using fso.Core.Domains;

namespace fso.EventCore.ReviewActions
{
    public class UserDeletedReviewAction : BaseAction
    {
        public Review Review { get; set; }
    }
}
