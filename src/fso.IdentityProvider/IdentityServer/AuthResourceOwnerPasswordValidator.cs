using fso.IdentityData.Domains;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Identity;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace fso.IdentityProvider.IdentityServer
{
    public class AuthResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        //repository to get user from db
        private readonly UserManager<AppUser> _userManager;

        public AuthResourceOwnerPasswordValidator(UserManager<AppUser> userManager)
        {
            _userManager = userManager; //DI
        }

        //this is used to validate your user account with provided grant at /connect/token
        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            try
            {
                //get your user model from db (by username - in my case its email)
                var user = await _userManager.FindByEmailAsync(context.UserName);
                if (user != null)
                {
                    bool isPasswordCorrect = await _userManager.CheckPasswordAsync(user, context.Password);

                    //check if password match - remember to hash password if stored as hash in db
                    if (isPasswordCorrect)
                    {
                        //set the result
                        context.Result = new GrantValidationResult(
                            subject: user.Id.ToString(),
                            
                            authenticationMethod: "custom",
                            claims: GetUserClaims(user));

                        return;
                    }

                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Incorrect password");
                    return;
                }
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "User does not exist.");
                return;
            }
            catch (Exception)
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Invalid username or password");
            }
        }

        //build claims array from user data
        public static Claim[] GetUserClaims(AppUser user)
        {
            var claims =  new Claim[]
            {
                new Claim(JwtClaimTypes.Subject, user.Id ?? ""),
                new Claim(JwtClaimTypes.Name, (!string.IsNullOrEmpty(user.Name) && !string.IsNullOrEmpty(user.Surname)) ? (user.Name + " " + user.Surname) : ""),
                new Claim(JwtClaimTypes.GivenName, user.Name  ?? ""),
                new Claim(JwtClaimTypes.FamilyName, user.Surname  ?? ""),
                new Claim(JwtClaimTypes.Email, user.Email  ?? "")

            //roles
            //new Claim(JwtClaimTypes.Role, user.Role)
            };
            return claims;
        }
    }
}
