
using System.Threading.Tasks;

namespace fso.Caching.CachingServices
{
    public interface IUserInfoCacheService
    {

        double? GetUserReputation(string appUserId);

        Task<double?> GetUserReputationAsync(int appUserId);

        void SetUserReputation(string appUserId, double reputation, int cacheDurationInMinutes);

        Task SetUserReputationAsync(int appUserId, double reputation, int cacheDurationInMinutes);

        int? GetUserPostsCount(string appUserId);

        Task<int?> GetUserPostsCountAsync(int appUserId);

        void SetUserPostsCount(string appUserId, int postCount, int cacheDurationInMinutes);

        Task SetUserPostsCountAsync(int appUserId, int postCount, int cacheDurationInMinutes);

        int? GetUserInterestCount(string appUserId);

        Task<int?> GetUserInterestCountAsync(int appUserId);

        void SetUserInterestCount(string appUserId, int interestCount, int cacheDurationInMinutes);

        Task SetUserInterestCountAsync(int appUserId, int interestCount, int cacheDurationInMinutes);

        int? GetUserFavouriteCount(string appUserId);

        Task<int?> GetUserFavouriteCountAsync(int appUserId);

        void SetUserFavouriteCount(string appUserId, int favouriteCount, int cacheDurationInMinutes);

        Task SetUserFavouriteCountAsync(int appUserId, int favouriteCount, int cacheDurationInMinutes);

    }
}
