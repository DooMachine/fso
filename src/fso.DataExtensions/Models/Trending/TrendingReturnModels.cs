using fso.Core.Domains.Helpers;
using System;
using System.Collections.Generic;
using System.Text;

namespace fso.DataExtensions.Models
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
