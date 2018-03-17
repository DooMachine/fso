using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using EasyNetQ;
using Microsoft.AspNetCore.Authorization;
using IdentityServer4.AccessTokenValidation;
using Newtonsoft.Json;
using Microsoft.AspNetCore.HttpOverrides;
using Newtonsoft.Json.Serialization;

namespace fso.Search
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
                .RequireClaim("scope", "fso.Api")                
                .Build();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .WithOrigins(
                        "http://192.168.1.67:10575",
                        "https://192.168.1.67:10575",   
                        "http://localhost:80",
                        "https://localhost:80",                     
                        "http://localhost",
                        "https://localhost",
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
                    policyUser.RequireClaim("role", "fso.api.user");
                });
            });

            string isdev = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            if(isdev == "Development"){
                services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                    .AddIdentityServerAuthentication(options =>
                    {
                        options.Authority = "http://192.168.1.67:5000/";
                        options.ApiName = "fso.Api";
                        options.ApiSecret = "fso.ApiSecret";
                        options.RequireHttpsMetadata = false;
                        options.SupportedTokens = SupportedTokens.Both;
                    });
            }else{
                services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                    .AddIdentityServerAuthentication(options =>
                    {
                        options.Authority = "http://identityprovider:5000/";
                        options.ApiName = "fso.Api";
                        options.ApiSecret = "fso.ApiSecret";
                        options.RequireHttpsMetadata = false;
                        options.SupportedTokens = SupportedTokens.Both;
                    });
            }            

            var connection = new ConnectionConfiguration();
            
            connection.Port = 5672;
            connection.UserName = "seph";
            connection.Password = "seph1w12";
           
            if(isdev == "Development"){
             connection.Hosts = new List<HostConfiguration> {
                 new HostConfiguration(){Host=@"192.168.1.67",Port=5672}
                };
            }else{
                connection.Hosts = new List<HostConfiguration> {
                 new HostConfiguration(){Host=@"rabbitmq",Port=5672}
                };            }
            
            connection.ConnectIntervalAttempt = TimeSpan.FromSeconds(4);
            connection.RequestedHeartbeat = 4;
            connection.Timeout = 20;
            var _bus = RabbitHutch.CreateBus(connection, ser => ser.Register<IEasyNetQLogger>(logger => new DoNothingLogger()));
            // event bus
            Console.WriteLine("Bus connected {0}",_bus.IsConnected);
            services.AddSingleton(_bus);
             services.AddMvc(options =>
            {
                
                //options.Filters.Add(new AuthorizeFilter(guestPolicy));
            }).AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            app.UseAuthentication();
            app.UseMvc();
        }
    }
    public class DoNothingLogger : IEasyNetQLogger
    {
        public void DebugWrite(string format, params object[] args)
        {
           Console.Write(format,args);
        }

        public void ErrorWrite(string format, params object[] args)
        {
            Console.Write(format,args);
        }

        public void ErrorWrite(Exception exception)
        {
            Console.Write(exception.Message);
        }

        public void InfoWrite(string format, params object[] args)
        {
            Console.Write(format,args);
        }
    }
}
