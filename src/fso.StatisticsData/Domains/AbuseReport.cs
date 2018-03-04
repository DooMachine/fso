using fso.Core;
using System.ComponentModel.DataAnnotations;

namespace fso.StatisticsData.Domains
{
    public class AbuseReport : BaseEntity
    {
        public AbuseType AbuseType { get; set; }
        [StringLength(32)]
        public string ReportedEntityType { get; set; }
        [StringLength(64)]
        public string ReporterId { get; set; }
        public int EntityId { get; set; }
        public string UserEntityId { get; set; }

        public int? CommentStatId { get; set; }
        public virtual CommentStatic Comment { get; set; }
        public int? PostStatId { get; set; }
        public virtual PostStatic Post { get; set; }
        public int? ReviewStatId { get; set; }
        public virtual ReviewStatic Review { get; set; }
        public int? UserStatId { get; set; }
        public virtual UserStatic User { get; set; }
        public int? GroupStatId { get; set; }
        public virtual GroupStatic Group { get; set; }

        [StringLength(512)]
        public string Details { get; set; }
        
    }

    public enum AbuseType
    {
        Spam, Advertising, Nudism,Violating_Rules, Other
    }
}
