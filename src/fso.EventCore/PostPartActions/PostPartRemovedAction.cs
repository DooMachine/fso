

namespace fso.EventCore.PostPartActions
{
    public class PostPartRemovedAction : BaseAction
    {
        public int PostPartId { get; set; }
        public string SmallUrl { get; set; }
        public string ThumbUrl { get; set; }
        public string LargeUrl { get; set; }
    }
}
