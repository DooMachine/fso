using fso.Core.Domains;
using System.Threading.Tasks;

namespace fso.DataExtensions.DataServices
{
    public interface IUserActivityActionService
    {
        int AddUserActivity(UserActivity activity);
        Task<int> AddUserActivityAsync(UserActivity activity);
    }
}
