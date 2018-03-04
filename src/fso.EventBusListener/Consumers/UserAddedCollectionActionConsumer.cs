using EasyNetQ.AutoSubscribe;
using fso.Core.Domains;
using fso.Data;
using fso.EventCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace fso.EventBusListener.Consumers
{
    
    public class UserAddedCollectionActionConsumer : IConsume<UserAddedCollectionAction>
    {
        public void Consume(UserAddedCollectionAction message)
        {
            try
            {
                using (FsoContext db = new FsoContext())
                {
                    UserActivity activity = new UserActivity()
                    {
                        AppUserId = message.PostCollection.UserInfoId,
                        DateUtcAdd = message.DateUtcAction,                        
                        DateUtcModified = message.DateUtcAction,
                        SourceEntityId = message.PostCollection.Id,
                        FeedType = UserActivityType.Add_New_Collection,
                        IsSoftDeleted = false
                    };

                    db.Set<UserActivity>().Add(activity);
                    int z = db.SaveChanges();
                    if (z > 0)
                    {
                        Console.WriteLine("Add Collection Activity Handled For Collection {0}", message.PostCollection.Id);
                    }
                    else
                    {
                        Console.WriteLine("Add Collection CANNOT Activity Handled For Collection {0}", message.PostCollection.Id);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Add Collection CANNOT Activity Handled For Collection {0}", message.PostCollection.Id);
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                }
            }

        }
    }
}
