
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Cors;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using fso.IdentityData.Domains;
using IdentityServer4.AspNetIdentity;
using fso.IdentityData.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace fso.IdentityServer
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddScoped<IDbInitializer, DbInitializer>();

            services.AddDbContext<FsoIdentityContext>();

            services.AddIdentity<AppUser, IdentityRole>(options => {
                options.User.RequireUniqueEmail = true;
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
            }).AddEntityFrameworkStores<FsoIdentityContext>()
              .AddDefaultTokenProviders();
            

            services.AddIdentityServer()
                .AddTemporarySigningCredential()
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddInMemoryClients(Config.GetClients())
                .AddAspNetIdentity<AppUser>();

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IDbInitializer dbInitializer)
        {
            loggerFactory.AddConsole(LogLevel.Trace);
            
            app.UseIdentity();
            app.UseIdentityServer();
            app.UseCors("ApiClientPolicy");
            app.UseStaticFiles();
            dbInitializer.Initialize();
            app.UseMvcWithDefaultRoute();

        }
    }
}
