
using System;

namespace fso.Core.Domains
{
    public class Popularity : BaseEntity
    {
        public int? GroupId { get; set; }
        public int? PostId { get; set; }
        public string CultureCode { get; set; }
        public int PopularityLevel { get; set; } = 50;
        public DateTime OnTrendingStartUtcTime { get; set; }
        public DateTime OnTrendingEndUtcTime { get; set; }
    }
}
