using EasyNetQ.AutoSubscribe;
using fso.EventCore.ReviewActions;
using Microsoft.Extensions.Options;
using System;

namespace fso.NotificationBusListener.Consumers.ReviewConsumers
{
    public class UserDeletedReviewConsumer : IConsume<UserDeletedReviewAction>
    {
        private readonly AppSettings _appSettings;
        public UserDeletedReviewConsumer(
            IOptions<AppSettings> appSettings
            ) : base()
        {
            _appSettings = appSettings.Value;
        }
        public void Consume(UserDeletedReviewAction message)
        {
            try
            {
                Console.WriteLine("User With Id = {0} Deleted Review With Id = {1} LOGIC NOT IMPLEMENTED => ", message.UserId, message.ReviewId);

            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}
