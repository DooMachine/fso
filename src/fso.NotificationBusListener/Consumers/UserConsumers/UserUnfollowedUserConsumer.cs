using EasyNetQ.AutoSubscribe;
using fso.EventCore.UserActions;
using fso.NotificationData.Data;
using fso.NotificationData.Domains;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace fso.NotificationBusListener.Consumers.UserConsumers
{
    
    public class UserUnfollowedUserConsumer : IConsume<UserFollowedUserAction>
    {
        private readonly AppSettings _appSettings;
        public UserUnfollowedUserConsumer(
                IOptions<AppSettings> appSettings
                ) : base()
        {
            _appSettings = appSettings.Value;
        }
        public void Consume(UserFollowedUserAction message)
        {
            try
            {
                Console.WriteLine("User With Id = {0} --> {1} UnFollowed LOGIC NOT IMPLEMENTED => ", message.FollowingUserId, message.FollowedUserId);
                    
            }
            catch (Exception ex)
            {
                Console.WriteLine("User With Id = {0} --> {1} UnFollowed Event LISTENER ERROR => ", message.FollowingUserId, message.FollowedUserId, ex.Message);
            }
        }
    }
    
}
