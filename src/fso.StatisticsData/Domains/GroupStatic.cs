

using System.Collections.Generic;

namespace fso.StatisticsData.Domains
{
    public class GroupStatic : BaseStatsEntity
    {
        public int GroupId { get; set; }
        public long ViewCount { get; set; }
        public virtual ICollection<AbuseReport> AbuseReports { get; set; }
    }
}
