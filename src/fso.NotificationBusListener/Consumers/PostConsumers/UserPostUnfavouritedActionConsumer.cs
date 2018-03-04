using EasyNetQ.AutoSubscribe;
using fso.EventCore.PostActions;
using fso.NotificationData.Data;
using fso.NotificationData.Domains;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace fso.NotificationBusListener.Consumers.PostConsumers
{
    public class UserPostUnfavouritedActionConsumer : IConsume<UserPostUnfavouritedAction>
    {
        
        public void Consume(UserPostUnfavouritedAction message)
        {
            try
            {
                Console.WriteLine("User With Id => {0} --> PostId =>{1} UnFavourited POST LOGIC NOT IMPLEMENTED => ", message.UserId, message.PostId);
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}
