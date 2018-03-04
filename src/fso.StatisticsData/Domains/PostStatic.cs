
using System.Collections.Generic;

namespace fso.StatisticsData.Domains
{
    public class PostStatic : BaseStatsEntity
    {
        public long ViewCount { get; set; }
        public int PostId { get; set; }
        public virtual ICollection<AbuseReport> AbuseReports { get; set; }
    }
}
