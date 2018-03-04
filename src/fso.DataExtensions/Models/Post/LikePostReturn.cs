
namespace fso.DataExtensions.Models
{
    public class LikePostReturn : BaseReturnModel
    {
        public LikePostReturn() : base()
        {

        }
        public bool IsLiked { get; set; }
        public string PostAuthorId { get; set; }
    }
}
