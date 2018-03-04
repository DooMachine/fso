

namespace fso.EventCore
{
    public class PostCollectionImageUpdatedAction : BaseAction
    {
        public int CollectionId { get; set; }
        public string SmallImageUrl { get; set; }
        public string LazyImageUrl { get; set; }
        public string FileExtension { get; set; }
        public string Dimension { get; set; }
        public string ThumbImageUrl { get; set; }

    }
}
