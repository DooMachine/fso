using EasyNetQ;
using EasyNetQ.AutoSubscribe;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
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
            var connection = new ConnectionConfiguration();
            connection.Port = 5672;
            connection.UserName = "seph";
            connection.Password = "seph1w12";
           
            connection.Hosts = new List<HostConfiguration> {
                 new HostConfiguration(){Host= @"rabbitmq", Port=5672}
                };
            connection.ConnectIntervalAttempt = TimeSpan.FromSeconds(4);
            connection.RequestedHeartbeat = 6;
            connection.Timeout = 60;
            var _bus = RabbitHutch.CreateBus(connection, ser => ser.Register<IEasyNetQLogger>(logger => new DoNothingLogger()));
            
            
            var subscriber = new AutoSubscriber(_bus, "#");
            subscriber.Subscribe(Assembly.GetExecutingAssembly());
            Console.WriteLine("Notifications EventHandler Listening");
            string typed = Console.ReadLine();
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
