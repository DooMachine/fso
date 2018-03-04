using System.Collections.Generic;

namespace fso.StatisticsData.Domains
{
    public class CommentStatic : BaseStatsEntity
    {
        public int CommentId { get; set; }
        public long ViewCount { get; set; }
        public virtual ICollection<AbuseReport> AbuseReports { get; set; }
    }
}
