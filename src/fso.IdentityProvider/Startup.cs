using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using fso.IdentityProvider.Services;
using fso.IdentityData.Data;
using fso.IdentityData.Domains;
using fso.IdentityProvider.IdentityServer;
using fso.IdentityProvider.Extensions;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using EasyNetQ;
using IdentityServer4;

namespace fso.IdentityProvider
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see https://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets<Startup>();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            
            // Add framework services.

            services.AddDbContext<FsoIdentityContext>();

            services.AddIdentity<AppUser, IdentityRole>(x =>
            {
                x.Password.RequireNonAlphanumeric = false;
                x.Password.RequireUppercase = false;
            })
                .AddEntityFrameworkStores<FsoIdentityContext>()
                .AddDefaultTokenProviders();
            

            services.Configure<IdentityOptions>(options =>
                options.ClaimsIdentity.RoleClaimType = ClaimTypes.Role);

            services.AddAuthentication().AddFacebook(facebookOptions =>
            {
                facebookOptions.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                
                facebookOptions.AppId = "1537291603008220";
                facebookOptions.AppSecret = "6e04752d9a8bcfaf55379f351620b426";
            });

            services.AddIdentityServer(options=> {
            })
                .AddDeveloperSigningCredential()
                .AddInMemoryCaching()
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddInMemoryClients(Config.GetClients())
                .AddAspNetIdentity<AppUser>()
                .AddProfileService<AuthProfileService>()
                .AddResourceOwnerValidator<AuthResourceOwnerPasswordValidator>();

            
            // event bus
            services.AddSingleton(p => RabbitHutch.CreateBus(
                "username=guest;password=guest;host=localhost"));

            services.AddTransient<IProfileService, AuthProfileService>();
            services.AddTransient<IResourceOwnerPasswordValidator, AuthResourceOwnerPasswordValidator>();
            
            var appSettings = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettings);
           

            services.AddMvc();
            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

            services.AddScoped<IDbInitializer, DbInitializer>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IDbInitializer dbInitializer)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseCors("ApiClientPolicy");
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
            // Add external authentication middleware below. To configure them please see https://go.microsoft.com/fwlink/?LinkID=532715
            //dbInitializer.Initialize();
            
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
