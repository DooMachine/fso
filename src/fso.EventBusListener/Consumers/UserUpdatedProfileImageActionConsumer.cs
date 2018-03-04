using EasyNetQ.AutoSubscribe;
using fso.Core.Domains;
using fso.Data;
using fso.EventCore.UserSettingsActions;
using System;
using System.Linq;

namespace fso.EventBusListener.Consumers
{
    public class UserUpdatedProfileImageActionConsumer : IConsume<UserUpdatedProfileImageAction>
    {
        public void Consume(UserUpdatedProfileImageAction message)
        {
            try
            {
                using (FsoContext db = new FsoContext())
                {
                    var dbSet = db.Set<AppMediaFile>();
                    AppMediaFile fileDom = dbSet.FirstOrDefault(p => p.UserInfoId == message.UserId);
                    fileDom.SmallPath = message.ImagePath;
                    dbSet.Update(fileDom);
                    int z = db.SaveChanges();
                    if (z > 0)
                    {
                        Console.WriteLine("User Update profile Image Activity Handled For User {0} and Path {1}", message.UserId, message.ImagePath);
                    }
                    else
                    {
                        Console.WriteLine("User Unfollow Group Activity CANNOT Handled For User {0} and Path {1}", message.UserId, message.ImagePath);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("User Unfollow Group Activity CANNOT Handled For User {0} and Path {1}", message.UserId, message.ImagePath);
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                }
            }

        }
    }
}
