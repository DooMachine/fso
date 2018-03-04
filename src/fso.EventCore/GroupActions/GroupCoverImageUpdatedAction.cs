

namespace fso.EventCore.GroupActions
{
    public class GroupCoverImageUpdatedAction : BaseAction
    {
        public int GroupId { get; set; }
        public string SmallImageUrl { get; set; }
        public string LargeImageUrl { get; set; }
        public string LazyImageUrl { get; set; }
        public string FileExtension { get; set; }
        public string Dimension { get; set; }
        public string ThumbImageUrl { get; set; }
    }
}
