
namespace fso.DataExtensions.Models
{
    public class GroupIndexReturn
    {
        public GroupIndexReturn()
        {
        }
        public GroupIndexDetail Group { get; set; }
        public PaginatedPostCardReturn Posts { get; set; }
    }
}
