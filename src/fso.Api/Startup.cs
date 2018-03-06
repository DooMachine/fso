using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using Newtonsoft.Json.Serialization;
using IdentityServer4.AccessTokenValidation;
using fso.Api.Extensions;
using fso.Bootstrapper;
using AutoMapper;
using Swashbuckle.AspNetCore.Swagger;
using EasyNetQ;
using fso.Settings;
using fso.Settings.Image;
using Newtonsoft.Json;
using fso.Core.Settings;

namespace fso.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }
        public Startup(IHostingEnvironment env ,IConfiguration configuration)
        {
            _env = env;
            Configuration = configuration;
        }

        

        private IHostingEnvironment _env { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            WebBoot.RegisterServices(services, Configuration);
            var appSettings = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettings);

            var userImageSettings = Configuration.GetSection("UserProfileImage");
            services.Configure<UserProfileImageSettings>(userImageSettings);

            var reputationSettings = Configuration.GetSection("ReputationSettings");
            services.Configure<ReputationSettings>(reputationSettings);

            var guestPolicy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()                
                .RequireClaim("scope", "fso.Api")                
                .Build();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .WithOrigins(
                        "http://192.168.1.67:10572",
                        "https://192.168.1.67:10572",
                        "http://192.168.1.67:10575",
                        "https://192.168.1.67:10575",
                        "http://192.168.1.67:7000",
                        "https://192.168.1.67:7000",
                        "http://192.168.1.67:5000",
                        "https://192.168.1.67:5000")                    
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .Build());
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("fso.AngularUser", policyUser =>
                {
                    policyUser.RequireClaim("role", "fso.api.user");
                });
            });
            

            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
               .AddIdentityServerAuthentication(options =>
               {
                   options.Authority = "http://192.168.1.67:5000/";
                   options.ApiName = "fso.Api";
                   options.ApiSecret = "fso.ApiSecret";
                   options.RequireHttpsMetadata = false;
                   options.SupportedTokens = SupportedTokens.Both;
               });

            string rabbitConnString = Configuration.GetSection("CommonSettings")["RabbitMqConnectionString"];
            services.AddSingleton(p => RabbitHutch.CreateBus(rabbitConnString));

            services.AddMvc(options =>
            {
                
                //options.Filters.Add(new AuthorizeFilter(guestPolicy));
            }).AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "feasion API",
                    Description = "feasion Web API Doc",
                    TermsOfService = "None",
                    Contact = new Contact { Name = "Okan Aslankan", Email = "okn.aslnkn@gmail.com", Url = "https://www.facebook.com/DooooooMachinE" },
                    License = new License { Name = "Some licence with law.", Url = "https://www.facebook.com/DooooooMachinE" }
                });
            });
            services.AddAutoMapper();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
             //loggerFactory.AddConsole(Configuration.GetSection("Logging"));
             //loggerFactory.AddDebug();

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

            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseAuthentication();

            app.UseMvc();

        }
        
    }
}
