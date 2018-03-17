using fso.Core.Caching;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace fso.Caching
{
    public class CacheProvider : ICacheProvider
    {
        private readonly IDistributedCache _distributedCache;

        public CacheProvider(IDistributedCache distributedCache)
        {
            _distributedCache = distributedCache;
        }

        public byte[] Get(string key)
        {
           return _distributedCache.Get(key);
        }

        public Task<byte[]> GetAsync(string key)
        {
            return _distributedCache.GetAsync(key);
        }

        public void Refresh(string key)
        {
            _distributedCache.Refresh(key);
        }

        public Task RefreshAsync(string key)
        {
           return _distributedCache.RefreshAsync(key);
        }

        public void Remove(string key)
        {
            _distributedCache.Remove(key);
        }

        public Task RemoveAsync(string key)
        {
            return _distributedCache.RemoveAsync(key);
        }

        public void Set(string key, byte[] value, DistributedCacheEntryOptions options)
        {
            _distributedCache.Set(key, value, options);
        }

        public Task SetAsync(string key, byte[] value, DistributedCacheEntryOptions options)
        {
            return _distributedCache.SetAsync(key, value, options);            
        }
        public void SetString(string key,string value)
        {
            _distributedCache.SetString(key, value);
        }
        public void SetString(string key,string value,DistributedCacheEntryOptions options)
        {
            _distributedCache.SetString(key, value, options);
        }
        public Task SetStringAsync(string key,string value)
        {
           return _distributedCache.SetStringAsync(key, value);
        }
        public Task SetStringAsync(string key,string value, DistributedCacheEntryOptions options)
        {            
            return _distributedCache.SetStringAsync(key, value, options);
        }
        public string GetString(string key)
        {
            return _distributedCache.GetString(key);
        }
        public Task<string> GetStringAsync(string key)
        {
            return _distributedCache.GetStringAsync(key);
        }
        public Task<string> GetStringAsync(string key,CancellationToken token)
        {
            return _distributedCache.GetStringAsync(key, token);
        }

        public void SaveToCache<T>(string key, T item, int expirationInHours,int expirtaionInMinutes)
        {
            var json = JsonConvert.SerializeObject(item, new JsonSerializerSettings() {
                ReferenceLoopHandling=ReferenceLoopHandling.Ignore
            });

            _distributedCache.SetStringAsync(key, json, new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(expirationInHours) + TimeSpan.FromMinutes(expirtaionInMinutes)
            });
        }

        public T RetrieveFromCache<T>(string key)
        {
            var json =  _distributedCache.GetString(key);
            if (string.IsNullOrEmpty(json))
            {
                return JsonConvert.DeserializeObject<T>("");
            }
            return JsonConvert.DeserializeObject<T>(json);
        }
        public async Task SaveToCacheAsync<T>(string key, T item, int expirationInHours, int expirtaionInMinutes)
        {
            var json = JsonConvert.SerializeObject(item, new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });

            await _distributedCache.SetStringAsync(key, json, new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(expirationInHours) + TimeSpan.FromMinutes(expirtaionInMinutes)
            });
            
        }

        public async Task<T> RetrieveFromCacheAsync<T>(string key)
        {
            var json = await _distributedCache.GetStringAsync(key);
            if (string.IsNullOrEmpty(json))
            {
                return JsonConvert.DeserializeObject<T>("");
            }
            return JsonConvert.DeserializeObject<T>(json);
        }
    }
}
