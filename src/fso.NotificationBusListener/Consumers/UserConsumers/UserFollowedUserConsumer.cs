using EasyNetQ.AutoSubscribe;
using fso.EventCore.UserActions;
using fso.NotificationData.Data;
using fso.NotificationData.Domains;
using fso.NotificationData.Extensions.JsonExtensions;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace fso.NotificationBusListener.Consumers.UserConsumers
{
    public class UserFollowedUserConsumer : IConsume<UserFollowedUserAction>
    {
        private readonly string UserSmallImageUrl = "http://192.168.1.67:7100/fimg/u/{appUserId}/230x230.jpeg";
        public UserFollowedUserConsumer(
               ) : base()
        {
        }
        public void Consume(UserFollowedUserAction message)
        {
            try
            {
                List<NotificationUserInfo> lu = new List<NotificationUserInfo>
                {
                    new NotificationUserInfo
                    {
                        DateUtcAdd = DateTime.UtcNow,
                        ImageUrl = UserSmallImageUrl.Replace("{appUserId}", message.FollowingUserId),
                        UserId = message.FollowingUserId,
                        Username = message.FollowingUsername
                    }
                };
                Notification firstNot = new Notification()
                {
                    DateUtcAdd = DateTime.UtcNow,
                    DateUtcModified = DateTime.UtcNow,
                    NotificationType = NotificationType.Followed,
                    ActivityUserJsonArray = JsonConvert.SerializeObject(lu),
                    IsSoftDeleted = false,
                    ImageUrl = UserSmallImageUrl.Replace("{appUserId}", message.FollowingUserId),
                    RedirectUrl = "/user/" + message.FollowingUsername,
                    IsSeen = false,
                    UserId = message.FollowedUserId
                };
                using (NotificationContext db = new NotificationContext())
                {   
                    
                    db.Set<Notification>().Add(firstNot);                    
                    if (db.SaveChanges() > 0)
                    {
                        Console.WriteLine("User With Id = {0} --> {1} Follow Notification Added succesfully => ", message.FollowingUserId,message.FollowedUserId);
                    }
                }
            }
            catch (Exception ex)
            {                
                Console.WriteLine("User With Id = {0} --> {1} Notification LISTENER ERROR => ", message.FollowingUserId, message.FollowedUserId, ex.Message);
            }
        }
    }
}
