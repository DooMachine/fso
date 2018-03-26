using EasyNetQ.AutoSubscribe;
using fso.EventCore.CommentActions;
using fso.NotificationData.Data;
using fso.NotificationData.Domains;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using Newtonsoft.Json;
using System.Collections.Generic;
using fso.NotificationData.Extensions.JsonExtensions;
using Microsoft.EntityFrameworkCore;

namespace fso.NotificationBusListener.Consumers.CommentConsumers
{
    public class UserAddedCommentConsumer : IConsume<UserAddedCommentAction>
    {
        private readonly string UserSmallImageUrl = "http://cdn.localhost/fimg/u/{appUserId}/230x230.jpeg";
        public UserAddedCommentConsumer(
            ) : base()
        {
        }
        public void Consume(UserAddedCommentAction message)
        {
            try
            {
                using (NotificationContext db = new NotificationContext())
                {
                    List<NotificationUserInfo> nUserDataList = new List<NotificationUserInfo>();
                    string urlKey = "post/" + message.PostId.ToString() + "/review=" + message.ReviewId.ToString() + "?c=" + message.CommentId.ToString();

                    Notification nIfExist = db.Notification
                        .FirstOrDefault(p => p.NotificationType == NotificationType.Review_Commended && p.EntityId == message.ReviewId && p.UserId == message.ReviewAuthorId);
                    NotificationUserInfo NotfUserInfo = new NotificationUserInfo()
                    {
                        ImageUrl = UserSmallImageUrl.Replace("{appUserId}", message.UserId),
                        UserId = message.UserId,
                        Username = message.Username,
                        DateUtcAdd = DateTime.UtcNow
                    };
                    // If same Notification Does Not Exist
                    // Add new one
                    if (nIfExist == null)
                    {
                        nUserDataList.Add(NotfUserInfo);
                        Notification not = new Notification()
                        {
                            DateUtcAdd = DateTime.UtcNow,
                            DateUtcModified = DateTime.UtcNow,
                            IsSoftDeleted = false,
                            ImageUrl = UserSmallImageUrl.Replace("{appUserId}", message.UserId),
                            IsSeen = false,
                            NotificationType = NotificationType.Review_Commended,
                            ActivityDescription = "LIKE_COMMENT",
                            ActivityUserJsonArray = JsonConvert.SerializeObject(nUserDataList) ,
                            RedirectUrl = "/post/" +message.PostUrlKey+ "/"+ message.PostId.ToString() + "/review/" + message.ReviewId.ToString() + "/c/" + message.CommentId.ToString(),
                            UserId = message.ReviewAuthorId,
                            EntityId = message.ReviewId
                        };
                        db.Set<Notification>().Add(not);
                    }
                    // If exist
                    // Update notification
                    else
                    {
                        nUserDataList = JsonConvert.DeserializeObject<List<NotificationUserInfo>>(nIfExist.ActivityUserJsonArray);
                        if (nUserDataList.Any(p => p.UserId != message.UserId))
                        {
                            nUserDataList.Add(NotfUserInfo);
                            nIfExist.ActivityUserJsonArray = JsonConvert.SerializeObject(nUserDataList);
                            nIfExist.DateUtcModified = DateTime.UtcNow;
                            nIfExist.IsSeen =false;
                        }
                        db.Entry(nIfExist).State = EntityState.Modified;
                    }

                    if (db.SaveChanges() != 0)
                    {
                        Console.WriteLine("User Added Comment Action Handled for {0} and {1} Review Author {2}", message.CommentId, message.UserId,message.ReviewAuthorId);
                    }
                    else
                    {
                        Console.WriteLine("User Added Comment Action Cannot Handled for {0} and {1}", message.CommentId, message.UserId);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("User Added Comment Action Cannot Handled for {0} and {1} WITH EXCEPTION =>", message.CommentId, message.UserId);
                Console.WriteLine(ex);
            }
        }
    }
}
