using System.Collections.Generic;
using IdentityServer4.Models;
using static IdentityServer4.IdentityServerConstants;
using IdentityModel;
using IdentityServer4;

namespace fso.IdentityServer
{
    public class Config
    {        
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {                
                new ApiResource()
                {
                    Name = "fso.AngularClient",                    
                    DisplayName = "fso.AngularClient",
                    Scopes =
                    {
                        new Scope("fso.AngularClient"),
                    },
                    UserClaims =
                    {
                        JwtClaimTypes.Subject,
                        JwtClaimTypes.EmailVerified,
                        JwtClaimTypes.Email,
                        JwtClaimTypes.Name, 
                        JwtClaimTypes.FamilyName,
                        JwtClaimTypes.PhoneNumber,
                        JwtClaimTypes.PhoneNumberVerified,
                        JwtClaimTypes.PreferredUserName,
                        JwtClaimTypes.Profile, 
                        JwtClaimTypes.Picture, 
                        JwtClaimTypes.Locale, 
                        JwtClaimTypes.IdentityProvider,
                        JwtClaimTypes.BirthDate, 
                        JwtClaimTypes.AuthenticationTime
                    }
                },
                
            };
        }
        public static List<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                new IdentityResources.Profile(),
            };
        }
        
        // client want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "fso.AngularClient",
                    ClientName = "fso.AngularClient",
                    AllowedGrantTypes =  GrantTypes.ResourceOwnerPassword,
                    AllowAccessTokensViaBrowser = true,
                    AccessTokenType=AccessTokenType.Jwt,
                    AllowOfflineAccess=true,
                    AllowedCorsOrigins = { "http://localhost:65271" },
                    ClientSecrets = new List<Secret>()
                    {
                        new Secret("fso-secret".Sha256())
                    },
                    AllowedScopes =
                    {
                        "fso.Api"
                    }
                }
            };
        }
    }
}
