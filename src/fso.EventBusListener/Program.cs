using EasyNetQ;
using EasyNetQ.AutoSubscribe;
using fso.EventBusListener.Response;
using fso.EventCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Reflection;

namespace fso.EventBusListener
{
    class Program
    {
        static void Main(string[] args)
        {
            var bus = RabbitHutch.CreateBus("username=guest;password=guest;host=localhost");
            var subscriber = new AutoSubscriber(bus, "#");

            subscriber.Subscribe(Assembly.GetExecutingAssembly());

            bus.Respond<CheckUserPostPartOwner, CheckUserPostPartOwnerResponse>(request => new CheckUserPostPartOwnerResponse { IsOkay = new ResponseActions().IsUserOwnerPostpart(request.UserId, request.PostPartId) });
            bus.Respond<CheckUserCollectionOwner, CheckUserCollectionOwnerResponse>(request => new CheckUserCollectionOwnerResponse { IsOkay = new ResponseActions().IsUserOwnerPostCollection(request.UserId, request.CollectionId) });

            Console.WriteLine("Main API Eventhandler Listening");
        }
    }
}
