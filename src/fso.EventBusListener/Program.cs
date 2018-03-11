using EasyNetQ;
using EasyNetQ.AutoSubscribe;
using fso.EventBusListener.Response;
using fso.EventCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace fso.EventBusListener
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

            _bus.Respond<CheckUserPostPartOwner, CheckUserPostPartOwnerResponse>(request => new CheckUserPostPartOwnerResponse { IsOkay = new ResponseActions().IsUserOwnerPostpart(request.UserId, request.PostPartId) });
            _bus.Respond<CheckUserCollectionOwner, CheckUserCollectionOwnerResponse>(request => new CheckUserCollectionOwnerResponse { IsOkay = new ResponseActions().IsUserOwnerPostCollection(request.UserId, request.CollectionId) });

            Console.WriteLine("Main API Eventhandler Listening");
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
