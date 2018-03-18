

using fso.Core.Domains;
using fso.Core.Domains.MMEntities;

namespace fso.DataExtensions.Models
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
    public class DeleteReviewModel : BaseFormReturnModel{
        public DeleteReviewModel() : base(){

        }
        public Review Review { get; set; }
    }
}
