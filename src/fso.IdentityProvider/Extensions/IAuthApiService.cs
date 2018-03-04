using fso.IdentityData.Domains;

namespace fso.IdentityProvider.Extensions
{
    public interface IAuthApiService
    {
        void AddUserInfoAsync(string userId, string jwt);
        void RemoveUserInfoAsync(string userId, string jwt);
    }
}
