using EasyNetQ.AutoSubscribe;
using fso.EventCore;
using fso.NotificationData.Data;
using fso.NotificationData.Domains;
using fso.NotificationData.Extensions.JsonExtensions;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace fso.NotificationBusListener.Consumers.UserConsumers
{
    public class UserRegisteredConsumer : IConsume<UserRegisteredAction>
    {
        
        public void Consume(UserRegisteredAction message)
        {
            // TODO: REWRITE 
            try
            {
                using (NotificationContext db = new NotificationContext())
                {
                    
                        List<NotificationUserInfo> lu = new List<NotificationUserInfo>();
                        
                        Notification firstNot = new Notification()
                        {
                            DateUtcAdd = DateTime.UtcNow,
                            DateUtcModified = DateTime.UtcNow,
                            NotificationType = NotificationType.Registered,
                            ImageUrl = "/assets/default.png",
                            ActivityDescription="Activity Description",
                            IsSoftDeleted = false,
                            IsSeen = false,
                            UserId = message.UserId,
                            RedirectUrl = "/explore",
                        };
                        db.Set<Notification>().Add(firstNot);
                                                          
                    if ( db.SaveChanges() > 0)
                    {
                        Console.WriteLine("Notification Created for User {0}", message.UserId);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        
    }
}
