

namespace fso.AppMediaProvider.Settings
{
    public class PostPartImageSettings
    {
        public string PostPartImageUrlTemplate { get; set; }
        public int PostPartLargeMaxWidth { get; set; }
        public int PostPartLargeMaxHeight { get; set; }
        public int PostPartThumbMaxWidth { get; set; }
        public int PostPartThumbMaxHeight { get; set; }
        public int PostPartSmallMaxWidth { get; set; }
        public int PostPartSmallMaxHeight { get; set; }
    }
    public class PostCollectionImageSettings
    {
        public string PostCollectionImageUrlTemplate { get; set; }
        public int PostCollectionThumbMaxWidth { get; set; }
        public int PostCollectionThumbMaxHeight { get; set; }
        public int PostCollectionSmallMaxWidth { get; set; }
        public int PostCollectionSmallMaxHeight { get; set; }
    }
    public class GroupImageSettings
    {
        public string GroupCoverImageUrlTemplate { get; set; }
        public int GroupCoverLargeWidth { get; set; }
        public int GroupCoverLargeHeight { get; set; }
        public int GroupCoverThumbWidth { get; set; }
        public int GroupCoverThumbHeight { get; set; }
        public int GroupCoverSmallWidth { get; set; }
        public int GroupCoverSmallHeight { get; set; }

        public string GroupProfileImageUrlTemplate { get; set; }
        public int GroupProfileThumbMaxWidth { get; set; }
        public int GroupProfileThumbMaxHeight { get; set; }
        public int GroupProfileSmallMaxWidth { get; set; }
        public int GroupProfileSmallMaxHeight { get; set; }
    }
}
