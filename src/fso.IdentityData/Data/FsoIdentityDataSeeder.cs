using fso.IdentityData.Domains;
using Microsoft.AspNetCore.Identity;

namespace fso.IdentityData.Data
{
    public class DbInitializer : IDbInitializer
    {
        private readonly FsoIdentityContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public DbInitializer(
            FsoIdentityContext context,
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        //This example just creates an Administrator role and one Admin users
        public async void Initialize()
        {
            //create database schema if none exists
            await _context.Database.EnsureCreatedAsync();

            //If there is already an Administrator role, abort
            //if (_context.Roles.Any(r => r.Name == "Administrator")) return;

            //////Create the Administartor Role
            //await _roleManager.CreateAsync(new IdentityRole("fso.api.user"));

            ////Create the default Admin account and apply the Administrator role
            //string user = "okn.aslnkn@gmail.com";
            //string password = "958413Okan-";
            //await _userManager.CreateAsync(new AppUser { UserName = user,BirthDate=DateTime.UtcNow,Active=true,Locale="tr-TR",Name="Okan",Surname="Aslankan", Email = user, EmailConfirmed = true }, password);
            //await _userManager.AddToRoleAsync(await _userManager.FindByNameAsync(user), "fso.api.user");
        }
    }
}

