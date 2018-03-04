
namespace fso.Api.Models.GetParameters
{
    public class PostModalParameters
    {
        public int PostId { get; set; }
        public int? ReviewId { get; set; }
        

    }
    public class PostModalReviewParameters
    {
        public int PostId { get; set; }

        public string ReviewOrder { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }

    public class AddPostPartParameters
    {
        public int PostId { get; set; }
        public string Title { get; set; }
    }
    public class PostPartIdParameters
    {
        public int PostPartId { get; set; }
    }
}
