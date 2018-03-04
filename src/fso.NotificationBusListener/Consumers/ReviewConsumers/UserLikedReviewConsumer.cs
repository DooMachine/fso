using EasyNetQ.AutoSubscribe;
using fso.EventCore.ReviewActions;
using fso.NotificationData.Data;
using fso.NotificationData.Domains;
using fso.NotificationData.Extensions.JsonExtensions;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace fso.NotificationBusListener.Consumers.ReviewConsumers
{
    public class UserLikedReviewConsumer : IConsume<UserLikedReviewAction>
    {
        private readonly string UserSmallImageUrl = "http://192.168.1.67:7100/fimg/u/{appUserId}/230x230.jpeg";

        public void Consume(UserLikedReviewAction message)
        {
            try
            {
                using (NotificationContext db = new NotificationContext())
                {
                    Notification existingNot = db.Set<Notification>()
                        .FirstOrDefault(p => p.NotificationType == NotificationType.Review_Liked && p.UserId == message.ReviewAuthorId && p.EntityId == message.ReviewId);
                    if (existingNot == null)
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
                            DateUtcAdd = message.DateUtcAction,
                            DateUtcModified = message.DateUtcAction,
                            NotificationType = NotificationType.Review_Liked,
                            ImageUrl = UserSmallImageUrl.Replace("{appUserId}", message.UserId),
                            ActivityUserJsonArray = JsonConvert.SerializeObject(lu),
                            IsSoftDeleted = false,
                            IsSeen = false,
                            UserId = message.ReviewAuthorId,
                            RedirectUrl = "/post/" + message.PostId + "/review/" + message.ReviewId,
                            EntityId = message.ReviewId
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
                        existingNot.DateUtcModified = message.DateUtcAction;
                        db.Update(existingNot);
                    }
                    db.SaveChanges();
                    Console.WriteLine("User Reviewed Post Notification Activity Handled for User {0} and Post{1}", message.UserId, message.PostId);
                }
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}
