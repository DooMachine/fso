using EasyNetQ;
using EasyNetQ.AutoSubscribe;
using System;
using System.Reflection;

namespace fso.IdentityBusListener
{
    class Program
    {
        static void Main(string[] args)
        {
            var bus = RabbitHutch.CreateBus("host=localhost");
            var subscriber = new AutoSubscriber(bus, "#");

            subscriber.Subscribe(Assembly.GetExecutingAssembly());
            Console.WriteLine("Identity EventHandler Listening");
        }
    }
}
