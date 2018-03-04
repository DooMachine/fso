
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public interface IExploreCacheService
    {
        int[] GetExploreInterestIds(string langCode, int pageIndex);
        Task<int[]> GetExploreInterestIdsAsync(string langCode, int pageIndex);
        void SetExploreInterestIds(string langCode, int pageIndex, int[] likeCount, int cacheDurationInMinutes);
        Task SetExploreInterestIdsAsync(string langCode, int pageIndex, int[] likeCount, int cacheDurationInMinutes);
    }
}
