using fso.Core.Caching;
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public class CommonCacheService : ICommonCacheService
    {
        private static string Total_Group_Count_Id_Key = "Total_Group_Count_";
        private static string Total_Post_Count_Id_Key = "Total_Post_Count_";
        private static string Total_Review_Count_Id_Key = "Total_Review_Count_";
        private readonly ICacheProvider _cacheProvider;

        public CommonCacheService(ICacheProvider cacheProvider)
        {
            _cacheProvider = cacheProvider;
        }
        public int? GetTotalGroupCount()
        {
            return _cacheProvider.RetrieveFromCache<int?>(Total_Group_Count_Id_Key);
        }

        public Task<int?> GetTotalGroupCountAsync()
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>(Total_Group_Count_Id_Key);
        }

        public void SetTotalGroupCount(int count, int expirationInMinutes)
        {
            _cacheProvider.SaveToCache<int>(Total_Group_Count_Id_Key, count, 0, expirationInMinutes);
        }

        public Task SetTotalGroupCountAsync(int count, int expirationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>(Total_Group_Count_Id_Key, count, 0, expirationInMinutes);
        }
        
        public int? GetTotalPostCount()
        {
            return _cacheProvider.RetrieveFromCache<int?>(Total_Post_Count_Id_Key);
        }

        public Task<int?> GetTotalPostCountAsync()
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>(Total_Post_Count_Id_Key);
        }

        public void SetTotalPostCount(int count, int expirationInMinutes)
        {
            _cacheProvider.SaveToCache<int>(Total_Post_Count_Id_Key, count, 0, expirationInMinutes);
        }

        public Task SetTotalPostCountAsync(int count, int expirationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>(Total_Post_Count_Id_Key, count, 0, expirationInMinutes);
        }

        public int? GetTotalReviewCount()
        {
            return _cacheProvider.RetrieveFromCache<int?>(Total_Review_Count_Id_Key);
        }

        public Task<int?> GetTotalReviewCountAsync()
        {
            return _cacheProvider.RetrieveFromCacheAsync<int?>(Total_Review_Count_Id_Key);
        }

        public void SetTotalReviewCount(int count, int expirationInMinutes)
        {
            _cacheProvider.SaveToCache<int>(Total_Review_Count_Id_Key, count, 0, expirationInMinutes);
        }

        public Task SetTotalReviewCountAsync(int count, int expirationInMinutes)
        {
            return _cacheProvider.SaveToCacheAsync<int>(Total_Review_Count_Id_Key, count, 0, expirationInMinutes);
        }
    }
}
