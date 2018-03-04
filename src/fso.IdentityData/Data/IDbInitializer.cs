using fso.IdentityData.Domains;
using Microsoft.AspNetCore.Identity;

namespace fso.IdentityData.Data
{
    public interface IDbInitializer
    {
        void Initialize();
    }
}
