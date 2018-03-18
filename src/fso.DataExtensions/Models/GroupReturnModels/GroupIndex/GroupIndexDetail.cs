
using fso.Core.Domains.MMEntities;

namespace fso.DataExtensions.Models
{
    public class GroupIndexDetail
    {
        public GroupIndexDetail()
        {

        }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string UrlKey { get; set; }

        public BaseImageReturn ThumbnailImage { get; set; }

        public BaseImageReturn CoverImage { get; set; }

        public GroupFollowState FollowState { get; set; }
        
        public int FollowerCount { get; set; }

        public string AlphaColor { get; set; }
        
    }
}
