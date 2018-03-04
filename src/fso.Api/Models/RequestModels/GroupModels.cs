

using fso.Api.Models.GetParameters;
using System.ComponentModel.DataAnnotations;

namespace fso.Api.Models.RequestModels
{
    public class GroupIdModel
    {
        [Required]
        public int GroupId { get; set; }
    }
    public class PaginatedGroupUrlkeyModel : WithBasePaginateParameters
    {
        [Required]
        public string Urlkey { get; set; }
    }
    public class GroupUrlKeyModel
    {
        [Required]
        public string UrlKey { get; set; }
    }

    public class GroupAddModel
    {
        [StringLength(64,MinimumLength =3)]
        public string Name { get; set; }
        public string Description { get; set; }
        [StringLength(128, MinimumLength = 3)]
        public string Urlkey { get; set; }
    }
}
