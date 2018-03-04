using System;
using System.Collections.Generic;
using System.Text;

namespace fso.StatisticsData.Domains
{
    public class ReviewStatic : BaseStatsEntity
    {
        public int ReviewId { get; set; }
        public long ViewCount { get; set; }
        public virtual ICollection<AbuseReport> AbuseReports { get; set; }
    }
}
