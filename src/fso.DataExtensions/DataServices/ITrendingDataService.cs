using fso.DataExtensions.Models;
using System;
using System.Collections.Generic;

namespace fso.DataExtensions.DataServices
{
    public interface ITrendingDataService
    {
        TrendingGroupsReturnModel GetTrendingGroups(int pageIndex, int pageSize, string currUserId, string culture = "WW");
        TrendingPostsReturnModel GetTrendingPosts(int pageIndex, int pageSize, string currUserId, string culture = "WW");
        IEnumerable<int> GetTrendingPostIdsForGroup(int groupId, DateTime dateStart, DateTime dateEnd, bool saveToCache);
    }
}
