using fso.DataExtensions.DataServices;
using fso.Core.Domains;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace fso.Data.EntityRepositories
{
    public class UserActivityActionService : IUserActivityActionService
    {
        private readonly IEntityContext _context;
        public DbSet<UserActivity> _dbSet;
        public UserActivityActionService(
            IEntityContext context
            )
        {
            _context = context;
            _dbSet = _context.Set<UserActivity>();
        }

       

        public int AddUserActivity(UserActivity activity)
        {
            _dbSet.Add(activity);
            return _context.SaveChanges();
        }

        public async Task<int> AddUserActivityAsync(UserActivity activity)
        {
            await _dbSet.AddAsync(activity);
            return await _context.SaveChangesAsync();
        }
    }
}
