using fso.StatisticsData.Domains;
using System.ComponentModel.DataAnnotations;

namespace fso.StatisticsService.Models
{
    public class AddAbuseModel 
    {
        [Required]
        public string ReporterId { get; set; }
        [Required]
        public string ReportedEntityType { get; set; }
        [Required]
        public int EntityId { get; set; }
        [Required]
        public AbuseType ReportType { get; set; }
        public string Details { get; set; }
        public string UserId { get; set; }
    }
}
