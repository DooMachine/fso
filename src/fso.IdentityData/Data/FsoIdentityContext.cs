using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using fso.IdentityData.Domains;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Linq;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;

namespace fso.IdentityData.Data
{
    public class FsoIdentityContext : IdentityDbContext<AppUser,IdentityRole,string>
    {
        private static bool _databaseInitialized = false;
        public FsoIdentityContext()
        {
        }
        public FsoIdentityContext(DbContextOptions options) :base(options)
        {
            if (!_databaseInitialized)
            {
                // TODO HANDLE MIGRATION AND SEED RUNTIME
                if (!(this.GetService<IDatabaseCreator>() as RelationalDatabaseCreator).Exists())
                {
                    Database.EnsureCreated();
                    _databaseInitialized = true;
                }
                else if (this.Database.GetPendingMigrations().Any())
                {
                    Database.EnsureDeleted();
                    Database.EnsureCreated();
                    _databaseInitialized = true;
                }
            }
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            // define the database to use
            optionsBuilder
                .UseMySql("Server=localhost;Database=f_i_acc_db;Uid=root;Pwd=seph1w12");
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasMany(e => e.Claims)
                .WithOne()
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<AppUser>()
                .HasMany(e => e.Logins)
                .WithOne()
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<AppUser>()
                .HasMany(e => e.Roles)
                .WithOne()
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            //builder.Entity<IdentityUserLogin<string>>()
            //    .HasKey(f => f.ProviderKey);
            //builder.Entity<IdentityUserRole<string>>()
            //    .HasKey(f => new { f.RoleId, f.UserId });
            //builder.Entity<IdentityUserClaim<string>>()
            //    .HasKey(q => q.Id);
        }
    }
}
