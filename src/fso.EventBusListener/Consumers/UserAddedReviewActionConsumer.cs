using EasyNetQ.AutoSubscribe;
using fso.Core.Domains;
using fso.Data;
using fso.EventCore.ReviewActions;
using System;

namespace fso.EventBusListener.Consumers
{
    
    public class UserAddedReviewActionConsumer : IConsume<UserAddedReviewAction>
    {
        public void Consume(UserAddedReviewAction message)
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
                        SourceEntityId = message.ReviewId,
                        ParentEntityType = ParentEntityType.Post,
                        ParentEntityId = message.PostId,
                        FeedType = UserActivityType.Add_Review_To_Post,
                        IsSoftDeleted = false
                    };

                    db.Set<UserActivity>().Add(activity);
                    int z = db.SaveChanges();
                    if (z > 0)
                    {
                        Console.WriteLine("Add Review Activity Handled For Review {0} and Post {1}", message.ReviewId, message.PostId);
                    }
                    else
                    {
                        Console.WriteLine("Add Review CANNOT Handled For PostPart {0} and Image {1}", message.ReviewId, message.PostId);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Add Review Activity CANNOT Handled For PostPart {0} and Image {1}", message.ReviewId, message.PostId);
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                }
            }

        }
    }
}
