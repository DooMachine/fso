using fso.Core.Domains;

namespace fso.DataExtensions.Models
{
    public class PostPartDisplay
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string Description { get; set; }

        public BaseImageReturn Image { get; set; }
        public int? PostId { get; set; }
    }
}
