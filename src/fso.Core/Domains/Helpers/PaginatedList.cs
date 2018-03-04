using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace fso.Core.Domains.Helpers
{
    public class PaginatedList<T> : List<T>
    {
        public PaginatedList() : base()
        {

        }
        [JsonProperty("pageIndex")]
        public int PageIndex { get; private set; }
        [JsonProperty("pageSize")]
        public int PageSize { get; private set; }
        [JsonProperty("totalCount")]
        public int TotalCount { get; private set; }
        [JsonProperty("totalPageCount")]
        public int TotalPageCount { get; private set; }
        [JsonProperty("hasPreviousPage")]
        public bool HasPreviousPage
        {
            get
            {
                return (PageIndex > 1);
            }
        }
        [JsonProperty("hasNextPage")]
        public bool HasNextPage
        {

            get
            {
                return (PageIndex < TotalPageCount);
            }
        }
        public PaginatedList(IEnumerable<T> source, int pageIndex, int pageSize, int totalCount)
        {

            if (source == null)
            {
                throw new ArgumentNullException("source");
            }

            AddRange(source);
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalCount = totalCount;
            TotalPageCount = (int)Math.Ceiling(totalCount / (double)pageSize);
        }
    }
}
