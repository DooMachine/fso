using EasyNetQ.AutoSubscribe;
using fso.EventCore.PostActions;
using fso.NotificationData.Data;
using fso.NotificationData.Domains;
using fso.NotificationData.Extensions.JsonExtensions;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace fso.NotificationBusListener.Consumers.PostConsumers
{
    public class UserPostFavouritedActionConsumer : IConsume<UserPostFavouritedAction>
    {
        private readonly string UserSmallImageUrl = "http://192.168.1.67:7100/fimg/u/{appUserId}/230x230.jpeg";
        public void Consume(UserPostFavouritedAction message)
        {
            try
            {
                using (NotificationContext db = new NotificationContext())
                {
                    Notification existingNot = db.Set<Notification>()
                        .FirstOrDefault(p => p.NotificationType == NotificationType.Post_Favourited && p.UserId == message.PostAuthorId && p.EntityId == message.PostId);
                    if(existingNot == null)
                    {
                        List<NotificationUserInfo> lu = new List<NotificationUserInfo>
                        {
                            new NotificationUserInfo
                            {
                                DateUtcAdd = DateTime.UtcNow,
                                ImageUrl = UserSmallImageUrl.Replace("{appUserId}", message.UserId),
                                UserId = message.UserId,
                                Username = message.Username
                            }
                        };
                        Notification firstNot = new Notification()
                        {
                            DateUtcAdd = DateTime.UtcNow,
                            DateUtcModified = DateTime.UtcNow,
                            NotificationType = NotificationType.Post_Favourited,
                            ImageUrl = UserSmallImageUrl.Replace("{appUserId}", message.UserId),
                            ActivityUserJsonArray = JsonConvert.SerializeObject(lu),
                            IsSoftDeleted = false,
                            IsSeen = false,
                            UserId = message.PostAuthorId,
                            RedirectUrl = "/post/"+message.PostId,
                            EntityId = message.PostId
                        };
                        db.Add(firstNot);
                    }
                    else
                    {
                        List<NotificationUserInfo> lu = JsonConvert.DeserializeObject<List<NotificationUserInfo>>(existingNot.ActivityUserJsonArray);
                        if (lu == null)
                            lu = new List<NotificationUserInfo>();
                        Boolean isExtistBefore = lu.Any(p => p.UserId == message.UserId);
                        if (!isExtistBefore)
                        {
                            lu.Add(new NotificationUserInfo
                            {
                                DateUtcAdd = DateTime.UtcNow,
                                ImageUrl = UserSmallImageUrl.Replace("{appUserId}", message.UserId),
                                UserId = message.UserId,
                                Username = message.Username
                            });
                        }

                        existingNot.IsSeen = false;
                        existingNot.ActivityUserJsonArray = JsonConvert.SerializeObject(lu);
                        existingNot.DateUtcModified = DateTime.UtcNow;
                        db.Update(existingNot);

                    }
                    db.SaveChanges();
                    Console.WriteLine("User Favourite Post Notification Activity Handled for User {0} and Post{1}",message.UserId,message.PostId);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}
