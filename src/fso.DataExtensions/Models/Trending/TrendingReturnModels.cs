using fso.Core.Domains.Helpers;
using fso.DataExtensions.Models.GroupReturnModels;
using fso.DataExtensions.Models.GroupReturnModels.GroupIndex;
using System;
using System.Collections.Generic;
using System.Text;

namespace fso.DataExtensions.Models.Trending
{
    public class TrendingGroupsReturnModel
    {
        public PaginatedList<InterestCard> Groups { get; set; }
    }    
    public class TrendingPostsReturnModel
    {
        public PaginatedList<PostCard> Posts { get; set; }
        
    }
}
