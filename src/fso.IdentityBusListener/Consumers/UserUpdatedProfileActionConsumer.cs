

using EasyNetQ.AutoSubscribe;
using fso.EventCore.UserSettingsActions;
using fso.IdentityData.Domains;
using Microsoft.AspNetCore.Identity;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace fso.IdentityBusListener.Consumers
{
    
    public class UserUpdatedProfileActionConsumer : IConsumeAsync<UserUpdatedProfileAction>
    {
        public async Task Consume(UserUpdatedProfileAction message)
        {
            try
            {
                // Notworking
                Console.WriteLine("User Profile Settigs Action Handled For User {0} and Name {1}", message.AppUserId, message.Name);
                AspNetUserManager<AppUser> manager = new AspNetUserManager<AppUser>(null,null,null,null,null,null,null,null,null);
                var user = await manager.FindByIdAsync(message.AppUserId);
                user.Name = message.Name;
                user.Surname = message.Surname;
                user.Status = message.Status;
                var upd  = await manager.UpdateAsync(user);
                manager.Dispose();
                Console.WriteLine("User Profile Settigs Action Handled For User {0} and Name {1}", message.AppUserId, message.Name);
            }
            catch (Exception ex)
            {
                Console.WriteLine("User Profile Settigs Action CANNOT Handled For User {0} and Name {1}", message.AppUserId, message.Name);
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                }
            }

        }
    }
}
