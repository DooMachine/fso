

using fso.Core.Domains.MMEntities;

namespace fso.DataExtensions.Models.Review
{
    public class ReviewLikeResult : BaseReturnModel
    {
        public ReviewLikeResult() : base()
        {

        }
        public LikeStatus LikeStatus { get; set; }
        public string ReviewAuthorId { get; set; }
        public int PostId { get; set; }
    }
}
