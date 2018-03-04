using fso.Core.Domains;
using fso.Core.Domains.Helpers;
using fso.DataExtensions.Models;
using System;
using System.Collections.Generic;

namespace fso.DataExtensions.DataServices
{
    public interface IUserActivityDataService
    {

        PaginatedList<UserActivity> GetUserActivities(string userId, int pageIndex, int pageSize);

        List<UserActivityDTO<IActivityEntity>> GetActivityDTO(List<UserActivity> activities, string currUserId);
        /// <summary>
        /// Get User Activity With Time Before Style
        /// </summary>
        /// <param name="appUserId"> Activities Of User</param>
        /// <param name="fromNow">How Much Time Activity Happened</param>
        /// <returns></returns>
        //List<UserActivity> GetUserActivity(string appUserId, TimeSpan fromNow);
        /// <summary>
        /// Get User Activity With Paginated Style
        /// </summary>
        /// <param name="appUserId"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        //List<UserActivity> GetUserActivityPaginated(string appUserId,int pageIndex,int pageSize);
    }
}
