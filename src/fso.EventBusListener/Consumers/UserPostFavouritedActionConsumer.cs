using EasyNetQ.AutoSubscribe;
using fso.Core.Domains;
using fso.Data;
using fso.EventCore.PostActions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace fso.EventBusListener.Consumers
{
    // Reputation game desing TODO
    public class UserPostFavouritedActionConsumer : IConsume<UserPostFavouritedAction>
    {
        public void Consume(UserPostFavouritedAction message)
        {
            //try
            //{
                using (FsoContext db = new FsoContext())
                {
                    Post favouritedPost = db.Set<Post>().Include(p=>p.ReputationGains).FirstOrDefault(p=>p.Id == message.PostId);
                    double previousRating = favouritedPost.Rating ?? 0;
                    IQueryable<ReputationGain> userReputations = db.SetChild<ReputationGain>().Where(p => p.UserInfoId == message.UserId);
                    if (userReputations != null)
                    {
                        double total = userReputations.Sum(p => p.GainedReputationValue);
                        favouritedPost.Rating = previousRating + 10;
                    }
                    if(favouritedPost.ReputationGains == null)
                    {
                        favouritedPost.ReputationGains = new List<ReputationGain>();
                    }
                    ReputationGain rpG = db.Set<ReputationGain>().FirstOrDefault(p => p.PostId == message.PostId && p.UserInfoId == message.PostAuthorId);
                    if (rpG==null)
                    {
                        favouritedPost.ReputationGains.Add(new ReputationGain()
                        {
                            Post = favouritedPost,
                            DateUtcAdd = message.DateUtcAction,
                            DateUtcModified = message.DateUtcAction,
                            GainedReputationValue = 10,
                            UserInfoId = message.PostAuthorId
                        });
                        db.Update(favouritedPost);
                    }
                    else
                    {
                        rpG.GainedReputationValue += 10;
                        db.Update(rpG);
                    }                   
                    
                    int z = db.SaveChanges();
                    if (z > 0)
                    {
                        Console.WriteLine("User Favourited Post Activity Handled For User {0} and Post {1}", message.UserId, message.PostId);
                    }
                    else
                    {
                        Console.WriteLine("User Favourited Post Activity CANNOT Handled For User {0} and Post {1}", message.UserId, message.PostId);
                    }
                }
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine("User Favourited Post Activity CANNOT Handled For User {0} and Post {1}", message.UserId, message.PostId);
            //    Console.WriteLine(ex.Message);
            //    if (ex.InnerException != null)
            //    {
            //        Console.WriteLine(ex.InnerException.Message);
            //    }
            //}

        }
    }
}
