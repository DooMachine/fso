using fso.DataExtensions.Models;
using fso.DataExtensions.Models.Feed;
using System;
using System.Collections.Generic;
using System.Text;

namespace fso.DataExtensions.DataServices
{
    public interface IExploreDataService
    {
        PaginatedInterestCard GetExploreInterests(PaginatedLangRequest req,string currUserId);
    }
}
