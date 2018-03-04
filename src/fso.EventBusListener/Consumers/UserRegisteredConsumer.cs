using EasyNetQ.AutoSubscribe;
using fso.Core.Domains;
using fso.Data;
using fso.EventCore;
using System;
using System.Collections.Generic;

namespace fso.EventBusListener.Consumers
{
    public class UserRegisteredConsumer : IConsume<UserRegisteredAction>
    {
        public void Consume(UserRegisteredAction message) {
            try
            {
                using (FsoContext db = new FsoContext())
                {
                    var registeredUserInfo = new UserInfo()
                    {
                        AppUserId = message.UserId,
                        DateUtcAdd = DateTime.UtcNow,
                        DateUtcModified = DateTime.UtcNow,
                        IsSoftDeleted = false,
                        Name = message.Name,
                        FollowSetting = UserFollowSetting.Confirm_All,
                        Surname = message.Surname,
                        UName = message.UName,
                        ProfilePicture = new AppMediaFile()
                        {
                            DateUtcAdd = DateTime.UtcNow,
                            DateUtcModified = DateTime.UtcNow,
                            ImageDimension = "1",
                            IsSoftDeleted = false,
                            FileExtension = "jpeg",
                        },
                        AlphaColor = "#3d3d3d",
                        ReputationGains = new List<ReputationGain>()
                        {
                            new ReputationGain()
                            {
                                DateUtcAdd = DateTime.UtcNow,
                                DateUtcModified = DateTime.UtcNow,
                                GainedReputationValue = 10,
                            }
                        },
                        Status = "",                        
                    };                    
                    db.Set<UserInfo>().Add(registeredUserInfo);
                    int z = db.SaveChanges();
                    if (z > 0)
                    {
                        Console.WriteLine("UserInfo Created for User {0}",message.UserId);
                    }
                    else
                    {
                        Console.WriteLine("UserInfo CANNOT Created for User {0}", message.UserId);
                    }
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
            }
            
        }
    }
}
