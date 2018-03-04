using EasyNetQ;
using EasyNetQ.AutoSubscribe;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Reflection;

namespace fso.NotificationBusListener
{
    class Program
    {
        public static IConfigurationRoot Configuration { get; set; }
        static void Main(string[] args)
        {
            var builder = new ConfigurationBuilder()
           .SetBasePath(Directory.GetCurrentDirectory())
           .AddJsonFile("appsettings.json");
            //.AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true);

            Configuration = builder.Build();
            var services = new ServiceCollection();

            services.AddSingleton<IConfigurationRoot>(Configuration);
            services.AddSingleton(new LoggerFactory()
                .AddConsole()
                .AddDebug());
            services.AddLogging();
            
            // app settings
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            var provider = services.BuildServiceProvider();

            var bus = RabbitHutch.CreateBus("username=guest;password=guest;host=localhost");
            var subscriber = new AutoSubscriber(bus, "#");
            subscriber.Subscribe(Assembly.GetExecutingAssembly());
            Console.WriteLine("Notifications EventHandler Listening");
        }
    }
}
