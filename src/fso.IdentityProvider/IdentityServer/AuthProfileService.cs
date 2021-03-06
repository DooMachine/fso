﻿
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using IdentityServer4;
using fso.IdentityData.Domains;

namespace fso.IdentityProvider.IdentityServer
{
    
    public class AuthProfileService : IProfileService
    {
        private readonly IUserClaimsPrincipalFactory<AppUser> _claimsFactory;
        private readonly UserManager<AppUser> _userManager;

        public AuthProfileService(UserManager<AppUser> userManager, IUserClaimsPrincipalFactory<AppUser> claimsFactory)
        {
            _userManager = userManager;
            _claimsFactory = claimsFactory;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var sub = context.Subject.GetSubjectId();

            var user = await _userManager.FindByIdAsync(sub);
            var principal = await _claimsFactory.CreateAsync(user);

            var claims = principal.Claims.ToList();

            claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();


            claims.Add(new Claim(JwtClaimTypes.PreferredUserName, user.UName));
            claims.Add(new Claim(JwtClaimTypes.NickName, user.UName));
            if (!string.IsNullOrEmpty(user.Name))
            {
                claims.Add(new Claim(JwtClaimTypes.GivenName, user.Name));
            }
            foreach (var item in await _userManager.GetRolesAsync(user))
            {
                claims.Add(new Claim(JwtClaimTypes.Role,item));
            }
            //new Claim(JwtClaimTypes.Role, "admin"),
            //new Claim(JwtClaimTypes.Role, "dataEventRecords.admin"),
            //new Claim(JwtClaimTypes.Role, "dataEventRecords.user"),
            //new Claim(JwtClaimTypes.Role, "dataEventRecords"),
            //new Claim(JwtClaimTypes.Role, "securedFiles.user"),
            //new Claim(JwtClaimTypes.Role, "securedFiles.admin"),
            //new Claim(JwtClaimTypes.Role, "securedFiles")
            
            if (await _userManager.IsInRoleAsync(user,"Admin"))
            {
                claims.Add(new Claim(JwtClaimTypes.Role, "admin"));
            }
            else
            {
                claims.Add(new Claim(JwtClaimTypes.Role, "user"));
            }

            

            claims.Add(new Claim(IdentityServerConstants.StandardScopes.Email, user.Email));


            context.IssuedClaims = claims;
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _userManager.FindByIdAsync(sub);
            context.IsActive = user != null;
        }
    }
}