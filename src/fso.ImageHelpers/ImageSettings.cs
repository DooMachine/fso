

namespace fso.ImageHelpers
{
    public class ImageParamsSettings : IImageParamsSettings
    {
        public string SmallUrlPattern { get; set; }
        public string ThumbnailUrlPattern{ get; set; }
        public string ResizedUrlPattern{ get; set; }
        public string DefaultUrlPattern{ get; set; }
    }
}
