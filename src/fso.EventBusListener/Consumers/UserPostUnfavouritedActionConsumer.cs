using EasyNetQ.AutoSubscribe;
using fso.Core.Domains;
using fso.Data;
using fso.EventCore.PostActions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace fso.EventBusListener.Consumers
{
    // Reputation game desing TODO
    public class UserPostUnfavouritedActionConsumer : IConsume<UserPostUnfavouritedAction>
    {
        public void Consume(UserPostUnfavouritedAction message)
        {
            try
            {
            using (FsoContext db = new FsoContext())
            {
                Post favouritedPost = db.Set<Post>().Include(p => p.ReputationGains).FirstOrDefault(p => p.Id == message.PostId);
                 double previousRating = favouritedPost.Rating.Value;
                favouritedPost.Rating = previousRating - 10;
                ReputationGain rg = db.Set<ReputationGain>().FirstOrDefault(p => p.PostId == message.PostId && p.UserInfoId == message.PostAuthorId);
                if (rg != null)
                {
                    db.Update(favouritedPost);

                    rg.GainedReputationValue -= 10;
                    db.Update(rg);
                }                
                int z = db.SaveChanges();
                if (z > 0)
                {
                    Console.WriteLine("User UnFavourited Post Activity Handled For User {0} and Post {1}", message.UserId, message.PostId);
                }
                else
                {
                    Console.WriteLine("User UnFavourited Post Activity CANNOT Handled For User {0} and Post {1}", message.UserId, message.PostId);
                }
            }
            }
            catch (Exception ex)
            {
                Console.WriteLine("User Favourited Post Activity CANNOT Handled For User {0} and Post {1}", message.UserId, message.PostId);
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                }
            }

        }
    }
}
