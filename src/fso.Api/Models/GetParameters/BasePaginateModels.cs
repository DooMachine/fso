
namespace fso.Api.Models.GetParameters
{
    public class WithBasePaginateParameters
    {
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; }
        public string Order { get; set; }
    }
}
