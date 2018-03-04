using EasyNetQ.AutoSubscribe;
using fso.Core.Domains;
using fso.Data;
using fso.EventCore.GroupActions;
using System;
using System.Linq;

namespace fso.EventBusListener.Consumers
{
    public class UserUnfollowedGroupConsumer : IConsume<UserUnfollowedGroupAction>
    {
        public void Consume(UserUnfollowedGroupAction message)
        {
            try
            {
                using (FsoContext db = new FsoContext())
                {
                    UserActivity activity = db.Set<UserActivity>()
                        .Where(p => p.AppUserId == message.UserId &&
                        p.FeedType == UserActivityType.Follow_Group &&
                        p.ParentEntityType == ParentEntityType.Group &&
                        p.ParentEntityId == message.GroupId)
                        .FirstOrDefault();
                    
                    db.Set<UserActivity>().Remove(activity);
                    int z = db.SaveChanges();
                    if (z > 0)
                    {
                        Console.WriteLine("User Unfollow Group Activity Handled For User {0} and Group {1}", message.UserId, message.GroupId);
                    }
                    else
                    {
                        Console.WriteLine("User Unfollow Group Activity CANNOT Handled For User {0} and Group {1}", message.UserId, message.GroupId);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("User Unfollow Group Activity CANNOT Handled For User {0} and Group {1}", message.UserId, message.GroupId);
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                }
            }

        }
    }
}
