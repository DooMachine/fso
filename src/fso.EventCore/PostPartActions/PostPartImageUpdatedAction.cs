
namespace fso.EventCore.PostPartActions
{
    public class PostPartImageUpdatedAction : BaseAction
    {
        public int PostPartId { get; set; }
        public string SmallImageUrl { get; set; }
        public string LazyImageUrl { get; set; }
        public string FileExtension { get; set; }
        public string Dimension { get; set; }
        public string ThumbImageUrl { get; set; }
        public string LargeImageUrl { get; set; }
    }
}
