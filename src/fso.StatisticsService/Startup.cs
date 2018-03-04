
using fso.StatisticsData;
using fso.StatisticsData.Data;
using fso.StatisticsData.DataServices;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;

namespace fso.StatisticsService
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
                .RequireClaim("scope", "fso.StatsApi")
                .Build();

            services.AddScoped<IEntityContext, StatsContext>();
            services.AddScoped<IAbuseService, AbuseService>();
            services.AddLogging();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .WithOrigins(
                        "http://localhost:10572",
                        "https://localhost:10572",
                        "http://localhost:10575",
                        "https://localhost:10575",
                        "http://localhost:7000",
                        "https://localhost:7000",
                        "http://localhost:5000",
                        "https://localhost:5000"
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
                options.AddPolicy("fso.ModUser", policyUser =>
                {
                    policyUser.RequireRole("role", "fso.api.mod.user");
                });
            });
            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
               .AddIdentityServerAuthentication(options =>
               {
                   options.Authority = "http://localhost:5000/";
                   options.ApiName = "fso.StatsApi";
                   options.ApiSecret = "fso.StatsApiSecret";
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
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }
    }
}
