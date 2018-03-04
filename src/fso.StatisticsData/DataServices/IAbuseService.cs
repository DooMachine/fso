
using fso.Core.Domains.Helpers;
using fso.StatisticsData.Domains;
using System;
using System.Linq.Expressions;

namespace fso.StatisticsData.DataServices
{
    public interface IAbuseService
    {
        int AddAbuseReport(AbuseReport abuseReport);
        int DeleteAbuseReportAsync(AbuseReport abuseReport);
        int EditAbuseReport(AbuseReport abuseReport);
        AbuseReport GetSingleBy(Expression<Func<AbuseReport, bool>> keySelector);
        PaginatedList<AbuseReport> GetAllBy(Expression<Func<AbuseReport, bool>> keySelector, int pageSize = 10, int pageIndex = 1);
    }
}
