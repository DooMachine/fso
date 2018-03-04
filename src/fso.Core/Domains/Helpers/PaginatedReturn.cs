
using Newtonsoft.Json;

namespace fso.Core.Domains.Helpers
{
    public abstract class PaginatedReturn<T> where T: class
    {
        public PaginatedList<T> Entities { get; set; } = new PaginatedList<T>();

        [JsonProperty]
        public int TotalCount { get => Entities.TotalCount; }
        [JsonProperty]
        public int TotalPageCount { get => Entities.TotalPageCount; }
        [JsonProperty]
        public int PageIndex { get => Entities.PageIndex; }
        [JsonProperty]
        public int PageSize { get => Entities.PageSize; }
        [JsonProperty]
        public bool HasNextPage { get => Entities.Count == 0 ? false : Entities.HasNextPage; }
    }
}
