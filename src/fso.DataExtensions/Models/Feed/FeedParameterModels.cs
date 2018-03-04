

namespace fso.DataExtensions.Models.Feed
{
    public class PaginatedRequest
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string Order { get; set; }
    }
    public class PaginatedLangRequest
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string Order { get; set; }
        public string LangCode { get; set; }
    }

    public class HomeFeedRequest
    {
        public int ActivityPageIndex { get; set; }
        public int ActivityPageSize { get; set; }
        public string ActivityOrder { get; set; }
        public int GroupRecommendationsPageIndex { get; set; }
        public int GroupRecommendationsPageSize { get; set; }
        public string GroupRecommendationsOrder { get; set; }
        public int UserRecommendationPageIndex { get; set; }
        public int UserRecommendationPageSize { get; set; }
        public string UserRecommendationOrder { get; set; }

        public string BrowserLanguage { get; set; }
    }
}
