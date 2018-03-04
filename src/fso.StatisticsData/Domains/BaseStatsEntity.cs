using fso.Core;
using System;

namespace fso.StatisticsData.Domains
{
    public class BaseStatsEntity : BaseEntity
    {
        public DateTime StartTimeUtc { get; set; }
        public DateTime EndTimeUtc { get; set; }

        public bool IsCalculateActive => DateTime.UtcNow < EndTimeUtc;
        public bool IsCalculateFinished => DateTime.UtcNow > EndTimeUtc;
    }
}
