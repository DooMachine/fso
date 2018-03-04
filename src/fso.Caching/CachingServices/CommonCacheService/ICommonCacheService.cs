using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public interface ICommonCacheService
    {
        int? GetTotalGroupCount();

        Task<int?> GetTotalGroupCountAsync();

        void SetTotalGroupCount(int count, int expirationInMinutes);

        Task SetTotalGroupCountAsync(int count, int expirationInMinutes);

        int? GetTotalPostCount();

        Task<int?> GetTotalPostCountAsync();

        void SetTotalPostCount(int count, int expirationInMinutes);

        Task SetTotalPostCountAsync(int count, int expirationInMinutes);

        int? GetTotalReviewCount();

        Task<int?> GetTotalReviewCountAsync();

        void SetTotalReviewCount(int count, int expirationInMinutes);

        Task SetTotalReviewCountAsync(int count, int expirationInMinutes);
    }
}
