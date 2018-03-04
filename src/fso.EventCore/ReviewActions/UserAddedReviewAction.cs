
namespace fso.EventCore.ReviewActions
{
    public class UserAddedReviewAction : BaseAction
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public string PostAuthorId { get; set; }
        public int PostId { get; set; }
        public int ReviewId { get; set; }
    }
}
