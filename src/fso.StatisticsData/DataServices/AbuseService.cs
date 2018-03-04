using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using fso.Core.Domains.Helpers;
using fso.Core.Extensions;
using fso.StatisticsData.Domains;
using Microsoft.EntityFrameworkCore;

namespace fso.StatisticsData.DataServices
{
    public class AbuseService : IAbuseService
    {
        private readonly IEntityContext _entityContext;
        private readonly DbSet<AbuseReport> _dbSet;
        private readonly DbSet<PostStatic> _postStatsSet;
        private readonly DbSet<ReviewStatic> _reviewStatsSet;
        private readonly DbSet<CommentStatic> _commentStatsSet;
        private readonly DbSet<UserStatic> _userStatsSet;
        private readonly DbSet<GroupStatic> _groupStatsSet;
        public AbuseService(IEntityContext entityContext)
        {
            _entityContext = entityContext;
            _dbSet = _entityContext.Set<AbuseReport>();
            _postStatsSet = _entityContext.Set<PostStatic>();
            _reviewStatsSet = _entityContext.Set<ReviewStatic>();
            _userStatsSet = _entityContext.Set<UserStatic>();
            _commentStatsSet = _entityContext.Set<CommentStatic>();
            _groupStatsSet = _entityContext.Set<GroupStatic>();
        }
        public int AddAbuseReport(AbuseReport abuseReport)
        {
            switch (abuseReport.ReportedEntityType.ToLower())
            {
                case "post":
                    PostStatic ps = _postStatsSet.Where(p => p.IsCalculateActive && p.PostId==abuseReport.EntityId).FirstOrDefault();
                    if (ps == null)
                    {
                        PostStatic psnew = new PostStatic()
                        {
                            DateUtcAdd = DateTime.UtcNow,
                            DateUtcModified = DateTime.UtcNow,
                            IsSoftDeleted = false,
                            StartTimeUtc = DateTime.UtcNow,
                            PostId = abuseReport.EntityId,
                            EndTimeUtc = DateTime.UtcNow.AddMonths(1),
                            ViewCount = 1
                        };
                        _postStatsSet.Add(psnew);
                    }
                    else
                    {
                        ps.AbuseReports.Add(abuseReport);
                    }
                    _entityContext.SaveChanges();
                    return SaveChanges();
                case "review":
                    ReviewStatic rs = _reviewStatsSet.Where(p => p.IsCalculateActive && p.ReviewId == abuseReport.EntityId).FirstOrDefault();
                    if (rs == null)
                    {
                        ReviewStatic rsnew = new ReviewStatic()
                        {
                            DateUtcAdd = DateTime.UtcNow,
                            DateUtcModified = DateTime.UtcNow,
                            IsSoftDeleted = false,
                            StartTimeUtc = DateTime.UtcNow,
                            ReviewId = abuseReport.EntityId,
                            EndTimeUtc = DateTime.UtcNow.AddMonths(1),
                            ViewCount = 1
                        };
                        _reviewStatsSet.Add(rsnew);
                    }
                    else
                    {
                        rs.AbuseReports.Add(abuseReport);
                    }
                    _entityContext.SaveChanges();
                    return SaveChanges();
                case "user":
                    UserStatic us = _userStatsSet.Where(p => p.IsCalculateActive && p.AppUserId == abuseReport.UserEntityId).FirstOrDefault();
                    if (us == null)
                    {
                        UserStatic usnew = new UserStatic()
                        {
                            DateUtcAdd = DateTime.UtcNow,
                            DateUtcModified = DateTime.UtcNow,
                            IsSoftDeleted = false,
                            StartTimeUtc = DateTime.UtcNow,
                            AppUserId = abuseReport.UserEntityId,
                            EndTimeUtc = DateTime.UtcNow.AddMonths(1),
                            ProfileViewCount = 1
                        };
                        _userStatsSet.Add(usnew);
                    }
                    else
                    {
                        us.AbuseReports.Add(abuseReport);
                    }
                    _entityContext.SaveChanges();
                    return SaveChanges();
                case "comment":
                    CommentStatic cs = _commentStatsSet.Where(p => p.IsCalculateActive && p.CommentId == abuseReport.EntityId).FirstOrDefault();
                    if (cs == null)
                    {
                        CommentStatic csnew = new CommentStatic()
                        {
                            DateUtcAdd = DateTime.UtcNow,
                            DateUtcModified = DateTime.UtcNow,
                            IsSoftDeleted = false,
                            StartTimeUtc = DateTime.UtcNow,
                            CommentId = abuseReport.EntityId,
                            EndTimeUtc = DateTime.UtcNow.AddMonths(1),
                            ViewCount = 1
                        };
                        _commentStatsSet.Add(csnew);
                    }
                    else
                    {
                        cs.AbuseReports.Add(abuseReport);
                    }
                    _entityContext.SaveChanges();
                    return SaveChanges();
                default:
                    return 0;
            }
            
        }

        public int DeleteAbuseReportAsync(AbuseReport abuseReport)
        {
            var x = _dbSet.Remove(abuseReport);
            return SaveChanges();
        }

        public int EditAbuseReport(AbuseReport abuseReport)
        {
            var x = _dbSet.Update(abuseReport);
            return SaveChanges();
        }
        public AbuseReport GetSingleBy(Expression<Func<AbuseReport, bool>> keySelector)
        {
            return _dbSet.FirstOrDefault(keySelector);
        }
        public PaginatedList<AbuseReport> GetAbuseReports(int pageSize, int pageIndex)
        {
            var total = _dbSet.Count();
            return _dbSet.Skip(pageSize * (pageIndex - 1)).Take(pageSize).ToPaginatedList(pageSize,pageIndex, total);
        }

        public PaginatedList<AbuseReport> GetAllBy(Expression<Func<AbuseReport, bool>> keySelector, int pageSize =10, int pageIndex=1)
        {
            var total = _dbSet.Where(keySelector).Count();
            return _dbSet.Where(keySelector).Skip(pageSize * (pageIndex - 1)).Take(pageSize).ToPaginatedList(pageSize, pageIndex, total);
        }

        private int SaveChanges()
        {
            return _entityContext.SaveChanges();
        }
        private Task<int> SaveChangesAsync()
        {
            return _entityContext.SaveChangesAsync();
        }
    }
}
