using EasyNetQ;
using EasyNetQ.AutoSubscribe;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace fso.IdentityBusListener
{
    class Program
    {
        static void Main(string[] args)
        {
            var connection = new ConnectionConfiguration();
            
            connection.Port = 5672;
            connection.UserName = "seph";
            connection.Password = "seph1w12";
           
            connection.Hosts = new List<HostConfiguration> {
                 new HostConfiguration(){Host="192.168.1.67", Port=5672}
                };
            var _bus = RabbitHutch.CreateBus(connection, ser => ser.Register<IEasyNetQLogger>(logger => new DoNothingLogger()));
            
            
            var subscriber = new AutoSubscriber(_bus, "#");
            subscriber.Subscribe(Assembly.GetExecutingAssembly());
            Console.WriteLine("Identity EventHandler Listening");
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
