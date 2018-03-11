using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using fso.NotificationData.Data;
using Microsoft.AspNetCore.Authorization;
using IdentityServer4.AccessTokenValidation;
using MediatR;
using fso.NotificationData;
using fso.Core.Data;
using Microsoft.Extensions.Logging;
using fso.NotificationData.Services;
using fso.NotificationApi.Services;

namespace fso.NotificationApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var guestPolicy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .RequireClaim("scope", "fso.NotificationApi")
                .Build();
            services.AddDbContext<NotificationContext>();
            services.AddScoped<IEntityContext, NotificationContext>();
            services.AddScoped<INotificationDataService, NotificationDataService>();
            services.AddLogging();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .WithOrigins(
                    "http://192.168.1.67:10575",
                    "https://192.168.1.67:10575",
                    "http://192.168.1.67:7000",
                    "https://192.168.1.67:7000",
                    "http://192.168.1.67:5000",
                    "https://192.168.1.67:5000"
                    )
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .Build());
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("fso.AngularUser", policyUser =>
                {
                    policyUser.RequireRole("role", "fso.api.user");
                });
            });
            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
               .AddIdentityServerAuthentication(options =>
               {
                   options.Authority = "http://192.168.1.67:5000/";
                   options.ApiName = "fso.NotificationApi";
                   options.ApiSecret = "fso.NotificationApiSecret";
                   options.RequireHttpsMetadata = false;
                   options.SupportedTokens = SupportedTokens.Both;
               });
            services.AddMvc(options =>
            {
            }).AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });
                        
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseCors("CorsPolicy");
            app.UseStaticFiles();
            

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
