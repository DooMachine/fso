using fso.Core.Domains.Helpers.Enum;
using System.ComponentModel.DataAnnotations;

namespace fso.DataExtensions.Models
{
    public class PublishPostParametersGetter
    {
        public PublishPostParameters FormValues { get; set; }
    }
    public class PublishPostParameters
    {
        [StringLength(128)]
        [Required]
        public string Title { get; set; }
        [StringLength(1024)]
        public string Content { get; set; }
        [StringLength(1024)]
        public string Description { get; set; }
        public PrivacyStatus PrivacyStatus { get; set; }
        [Required]
        public int[] SelectedInterestIds { get; set; }
        public int? SelectedCollectionId { get; set; }
        [Required]
        public int Id { get; set; }
    }
}
