
namespace fso.DataExtensions.Models.GroupReturnModels.GroupIndex
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
