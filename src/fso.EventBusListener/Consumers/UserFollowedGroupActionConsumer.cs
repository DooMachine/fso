using EasyNetQ.AutoSubscribe;
using fso.Core.Domains;
using fso.Data;
using fso.EventCore.GroupActions;
using System;

namespace fso.EventBusListener.Consumers
{
    public class UserFollowedGroupActionConsumer : IConsume<UserFollowedGroupAction>
    {
        public void Consume(UserFollowedGroupAction message)
        {
            try
            {
                using (FsoContext db = new FsoContext())
                {
                    UserActivity activity = new UserActivity()
                    {
                        DateUtcAdd = message.DateUtcAction,
                        DateUtcModified = message.DateUtcAction,
                        IsSoftDeleted =false,
                        AppUserId=message.UserId,
                        FeedType = UserActivityType.Follow_Group,
                        ParentEntityType = ParentEntityType.Group,
                        ParentEntityId = message.GroupId
                    };
                    db.Set<UserActivity>().Add(activity);
                    int z = db.SaveChanges();
                    if (z > 0)
                    {
                        Console.WriteLine("User Follow Group Activity Handled For User {0} and Group {1}", message.UserId,message.GroupId);
                    }
                    else
                    {
                        Console.WriteLine("User Follow Group Activity CANNOT Handled For User {0} and Group {1}", message.UserId, message.GroupId);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("User Follow Group Activity CANNOT Handled For User {0} and Group {1}", message.UserId, message.GroupId);
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                }
            }

        }
    }
}
