using EasyNetQ.AutoSubscribe;
using fso.EventCore.ReviewActions;
using Microsoft.Extensions.Options;
using System;

namespace fso.NotificationBusListener.Consumers.ReviewConsumers
{
    public class UserDeletedReviewConsumer : IConsume<UserDeletedReviewAction>
    {
        public UserDeletedReviewConsumer(
            ) : base()
        {
        }
        public void Consume(UserDeletedReviewAction message)
        {
            try
            {
                Console.WriteLine("User With Id = {0} Deleted Review With Id = {1} LOGIC NOT IMPLEMENTED => ", message.Review.UserId, message.Review.Id);

            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
