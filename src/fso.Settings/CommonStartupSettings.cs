
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace fso.Settings
{
    public class CommonStartupSettings
    {
        public static IConfigurationRoot RegisterSettings(IServiceCollection services, IConfigurationRoot Configuration, IHostingEnvironment _env)
        {
            IConfigurationBuilder builder;
            if (_env ==null)
            {
                return Configuration;
            }
            else
            {
                
                if (_env.IsDevelopment())
                {
                    builder = new ConfigurationBuilder()
                        .AddEnvironmentVariables()
                        .SetBasePath(_env.ContentRootPath)
                        .AddJsonFile($"ImageSettings.{_env.EnvironmentName}.json", optional: true)
                        .AddJsonFile($"commonSettings.{_env.EnvironmentName}.json", optional: true)
                        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                        .AddJsonFile($"appsettings.{_env.EnvironmentName}.json", optional: true);
                }
                else
                {
                    builder = new ConfigurationBuilder()
                        .AddEnvironmentVariables()
                        .SetBasePath(_env.ContentRootPath)
                        .AddJsonFile($"ImageSettings.json", optional: true)
                        .AddJsonFile("commonSettings.json", optional: false, reloadOnChange: true)
                        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                        .AddJsonFile($"appsettings.{_env.EnvironmentName}.json", optional: true);
                }
            }
            
            Configuration = builder.Build();
            return Configuration;
        }
    }
}
