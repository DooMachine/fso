

namespace fso.DataExtensions.Models
{
    public class AddPostPartReturnModel : BaseReturnModel
    {
        public int PostPartId { get; set; } = 0;
    }
    public class RemovePostPartReturnModel : BaseReturnModel
    {
        public string SmallImageUrl { get; set; }
        public string ThumbImageUrl { get; set; }
        public string LargeImageUrl { get; set; }
    }
}
