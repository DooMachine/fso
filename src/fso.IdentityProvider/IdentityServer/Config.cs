using IdentityModel;
using IdentityServer4.Models;
using System.Collections.Generic;
using System.Security.Claims;

namespace fso.IdentityProvider.IdentityServer
{
    public class Config
    {
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource()
                {
                    Name = "fso.Api",
                    DisplayName = "fso.Api",
                    ApiSecrets =
                    {
                        new Secret("fso.ApiSecret".Sha256()),
                    },
                    Scopes =
                    {
                        new Scope("fso.Api")
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
                        JwtClaimTypes.AuthenticationTime,
                        ClaimTypes.Role,
                        "sub",
                        "fso.Api"
                    }
                },         
                new ApiResource()
                {
                    Name = "fso.NotificationApi",
                    DisplayName = "fso.NotificationApi",
                    ApiSecrets =
                    {
                        new Secret("fso.NotificationApiSecret".Sha256()),
                    },
                    Scopes =
                    {
                        new Scope("fso.NotificationApi")
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
                        JwtClaimTypes.AuthenticationTime,
                        ClaimTypes.Role,
                        "sub",
                        "fso.NotificationApi"
                    },
                },
                new ApiResource()
                {
                    Name = "fso.StatsApi",
                    DisplayName = "fso.StatsApi",
                    ApiSecrets =
                    {
                        new Secret("fso.StatsApiSecret".Sha256()),
                    },
                    Scopes =
                    {
                        new Scope("fso.StatsApi")
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
                        JwtClaimTypes.AuthenticationTime,
                        ClaimTypes.Role,
                        "sub",
                        "fso.StatsApi"
                    },
                },
                new ApiResource()
                {
                    Name = "fso.AppFileProvider",
                    DisplayName = "fso.AppFileProvider",
                    ApiSecrets =
                    {
                        new Secret("fso.AppFileProviderSecret".Sha256()),
                    },
                    Scopes =
                    {
                        new Scope("fso.AppFileProvider")
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
                        JwtClaimTypes.AuthenticationTime,
                        ClaimTypes.Role,
                        "sub",
                        "fso.AppFileProvider"
                    },
                },
            };
        }
        public static List<IdentityResource> GetIdentityResources() => new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                new IdentityResources.Profile(),
                new IdentityResource("fso.ApiScope",new []{ "role", "admin", "user", "fso.Api", "fso.NotificationApi, fso.StatsApi, fso.AppFileProvider" } )

            };

        // client want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients() => new List<Client>
            {
                new Client
                {
                    ClientName = "feasion",
                    ClientId = "fso.AngularClient",
                    AccessTokenType = AccessTokenType.Reference,
                    AccessTokenLifetime = 3600,// 120 seconds, default 60 minutes
                    IdentityTokenLifetime = 3600,
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent=false,
                    //ClientSecrets= new List<Secret>
                    //{
                    //    new Secret("fso.ApiSecret")
                    //},
                    RedirectUris = new List<string>
                    {
                        "http://localhost",
                        "http://localhost/oAuthCallback",
                        "http://localhost/silent-refresh.html",

                        "http://192.168.1.67",
                        "http://192.168.1.67/oAuthCallback",
                        "http://192.168.1.67/silent-refresh.html",

                        "http://localhost:10575",
                        "http://localhost:10575/oAuthCallback",
                        "http://localhost:10575/silent-refresh.html",
                        "http://192.168.1.67:10575",
                        "http://192.168.1.67:10575/oAuthCallback",
                        "http://192.168.1.67:10575/silent-refresh.html",
                    },
                    PostLogoutRedirectUris = new List<string>
                    {
                        "http://localhost:80/",
                        "http://192.168.1.67:80",

                        "http://localhost:10575/",
                        "http://192.168.1.67:10575",
                    },
                    AllowedCorsOrigins = new List<string>
                    {
                        "https://localhost:80",
                        "http://localhost:80",
                        "http://192.168.1.67:80",
                        "https://192.168.1.67:80",

                        "https://localhost:10575",
                        "http://localhost:10575",
                        "http://192.168.1.67:10575",
                        "https://192.168.1.67:10575",
                    },
                    AllowedScopes = new List<string>
                    {
                        "openid",
                        "fso.Api",
                        "fso.NotificationApi",
                        "fso.StatsApi",
                        "fso.AppFileProvider",
                        "securedApi",
                        "role",
                        "profile",
                        "email"
                    }
                },
                new Client
                {
                    ClientName = "feasionWebClient",
                    ClientId = "feasionWebClient",
                    AccessTokenType = AccessTokenType.Reference,
                    AccessTokenLifetime = 3600,// 120 seconds, default 60 minutes
                    IdentityTokenLifetime = 300,
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    AllowAccessTokensViaBrowser = true,
                    //ClientSecrets= new List<Secret>
                    //{
                    //    new Secret("fso.ApiSecret")
                    //},
                    RedirectUris = new List<string>
                    {
                        "http://localhost:3000",
                        "http://localhost:3000/explore"

                    },
                    PostLogoutRedirectUris = new List<string>
                    {
                        "http://localhost:3000/unauthorized"
                    },
                    AllowedCorsOrigins = new List<string>
                    {
                        "https://localhost:3000",
                        "http://localhost:3000"
                    },
                    AllowedScopes = new List<string>
                    {
                        "openid",
                        "fso.Api",
                        "securedApi",
                        "role",
                        "profile",
                        "email"
                    }
                }

            };
    }
}
