using EasyNetQ.AutoSubscribe;
using fso.Core.Domains;
using fso.Data;
using fso.EventCore.PostActions;
using System;

namespace fso.EventBusListener.Consumers
{
    public class UserPublishedPostActionConsumer : IConsume<UserPublishedPostAction>
    {
        public void Consume(UserPublishedPostAction message)
        {
            try
            {
                using (FsoContext db = new FsoContext())
                {
                    UserActivity activity = new UserActivity()
                    {
                        AppUserId = message.UserId,
                        DateUtcAdd = message.DateUtcAction,
                        DateUtcModified = message.DateUtcAction,
                        SourceEntityId = message.PostId,
                        FeedType = UserActivityType.Add_New_Post,
                        IsSoftDeleted = false
                    };

                    db.Set<UserActivity>().Add(activity);
                    int z = db.SaveChanges();
                    
                    
                    if (z > 0)
                    {
                        Console.WriteLine("User Published Post Activity Handled For User {0} and Post {1}", message.UserId, message.PostId);
                    }
                    else
                    {
                        Console.WriteLine("User Published Post  Activity CANNOT Handled For User {0} and Post {1}", message.UserId, message.PostId);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("User Published Post  CANNOT Handled For User {0} and Post {1}", message.UserId, message.PostId);
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                }
            }

        }
    }
}
