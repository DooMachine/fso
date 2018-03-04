using EasyNetQ;
using EasyNetQ.AutoSubscribe;
using fso.AppMediaProvider.Settings;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json.Serialization;
using System;
using System.Reflection;

namespace fso.AppMediaProvider
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
                .RequireClaim("scope", "fso.AppFileProvider")
                .Build();

            services.AddLogging();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            string rabbitConnString = Configuration.GetSection("CommonSettings")["RabbitMqConnectionString"];
            services.AddSingleton(p => RabbitHutch.CreateBus(rabbitConnString));

            var appSettings = Configuration.GetSection("PostPartImage");
            services.Configure<PostPartImageSettings>(appSettings);

            var pcolSettings = Configuration.GetSection("PostCollectionImage");
            services.Configure<PostCollectionImageSettings>(pcolSettings);

            var gImgSettings = Configuration.GetSection("GroupImage");
            services.Configure<GroupImageSettings>(gImgSettings);

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
                   options.ApiName = "fso.AppFileProvider";
                   options.ApiSecret = "fso.AppFileProviderSecret";
                   options.RequireHttpsMetadata = false;
                   options.SupportedTokens = SupportedTokens.Both;
               });

            services.AddResponseCaching();
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
            loggerFactory.AddDebug();
            loggerFactory.AddConsole();
            loggerFactory.AddEventSourceLogger();
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
            // cache static files
            app.Use(async (context, next) =>
            {
                context.Response.GetTypedHeaders().CacheControl = new CacheControlHeaderValue()
                {
                    Public = true,
                    MaxAge = TimeSpan.FromSeconds(10)
                };
                context.Response.Headers[HeaderNames.Vary] = new string[] { "Accept-Encoding" };

                await next();
            });

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
