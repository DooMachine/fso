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
                    for(int i = 0; i < 12; i++)
                    {
                        List<NotificationUserInfo> lu = new List<NotificationUserInfo>();
                        for (int q = 1; q < ((i+1)%6)+1;q++)
                        {
                            lu.Add(new NotificationUserInfo
                            {
                                DateUtcAdd = DateTime.Now,
                                ImageUrl = "https://picsum.photos/70/70/",
                                UserId = message.UserId,
                                Username = message.UName
                            });
                        }
                            Notification firstNot = new Notification()
                        {
                            DateUtcAdd = DateTime.UtcNow,
                            DateUtcModified = DateTime.UtcNow,
                            NotificationType = (NotificationType)(i%8),
                            ImageUrl = "https://picsum.photos/60/60/",
                            ActivityDescription="Activity Description",
                            ActivityUserJsonArray = JsonConvert.SerializeObject(lu),
                            IsSoftDeleted = false,
                            IsSeen = false,
                            UserId = message.UserId,
                            RedirectUrl = "/trending",
                        };
                        db.Set<Notification>().Add(firstNot);
                    }                                        
                    if ( db.SaveChanges() > 0)
                    {
                        Console.WriteLine("Notification Created for User {0}", message.UserId);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
        
    }
}
