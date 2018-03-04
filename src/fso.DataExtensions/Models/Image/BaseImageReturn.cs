

namespace fso.DataExtensions.Models
{
    public class BaseImageReturn
    {
        public string Url { get; set; }
        /// <summary>
        /// May Implemented
        /// </summary>
        public string LazyUrl { get; set; }
        public string ThumbUrl { get; set; }
        public string SmallUrl { get; set; }
        public string Dimension { get; set; }

        public string Extension { get; set; }
    }
}
