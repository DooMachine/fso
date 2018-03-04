
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    /// <summary>
    /// Depreciated
    /// </summary>
    public interface IUserInterestCacheService
    {
        /// <summary>
        /// Depreciated
        /// </summary>
        int[] GetUserInterestsIds(string userId);

        Task<int[]> GetUserInterestsIdsAsync(string userId);

        void SetUserInterestsIds(string userId, int[] interestIds, int expirationInMinutes);

        Task SetUserInterestsIdsAsync(string userId, int[] interestIds, int expirationInMinutes);

        void RefreshInterestIds(string userId);

        Task RefreshInterestIdsAsync(string userId);
    }
}
