using Microsoft.Extensions.Caching.Distributed;
using System.Threading;
using System.Threading.Tasks;

namespace fso.Core.Caching
{
    public interface ICacheProvider
    {
        byte[] Get(string key);
        Task<byte[]> GetAsync(string key);
        void Refresh(string key);
        Task RefreshAsync(string key);
        void Remove(string key);
        Task RemoveAsync(string key);

        void Set(string key, byte[] value, DistributedCacheEntryOptions options);
        Task SetAsync(string key, byte[] value, DistributedCacheEntryOptions options);

        void SetString(string key, string value);
        void SetString(string key, string value, DistributedCacheEntryOptions options);
        Task SetStringAsync(string key, string value);
        Task SetStringAsync(string key, string value, DistributedCacheEntryOptions options);
        string GetString(string key);
        Task<string> GetStringAsync(string key);
        Task<string> GetStringAsync(string key, CancellationToken token);

        void SaveToCache<T>(string key, T item, int expirationInHours, int expirtaionInMinutes);

        T RetrieveFromCache<T>(string key);

        Task SaveToCacheAsync<T>(string key, T item, int expirationInHours, int expirtaionInMinutes);

        Task<T> RetrieveFromCacheAsync<T>(string key);
    }
}
