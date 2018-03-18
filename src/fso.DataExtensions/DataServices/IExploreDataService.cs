using fso.DataExtensions.Models;
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
