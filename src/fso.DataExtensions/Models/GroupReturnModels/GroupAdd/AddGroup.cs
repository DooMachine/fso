using fso.Core.Domains;
using System.ComponentModel.DataAnnotations;

namespace fso.DataExtensions.Models.GroupReturnModels.GroupAdd
{
    public class AddGroupParameters
    {
        [Required]
        [StringLength(32)]
        public string Name { get; set; }
        [Required]
        [StringLength(32)]
        public string UrlKey { get; set; }
        [Required]
        [StringLength(1024)]
        public string Description { get; set; }
        public string About { get; set; }
        public string ColorAlpha { get; set; }
    }

    public class AddGroupReturn : BaseFormReturnModel
    {
        public AddGroupReturn() : base()
        {

        }
        public Group Group { get; set; }
    }
}
