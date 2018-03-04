using System.Collections.Generic;

namespace fso.StatisticsData.Domains
{
    public class UserStatic : BaseStatsEntity
    {
        public string AppUserId { get; set; }
        public long ProfileViewCount { get; set; }
        public long ImpactCount { get; set; }
        public virtual ICollection<AbuseReport> AbuseReports { get; set; }
    }
}
