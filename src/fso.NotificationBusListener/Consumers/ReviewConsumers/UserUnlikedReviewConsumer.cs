using EasyNetQ.AutoSubscribe;
using fso.EventCore.ReviewActions;
using System;

namespace fso.NotificationBusListener.Consumers.ReviewConsumers
{
    public class UserUnlikedReviewConsumer : IConsume<UserUnlikedReviewAction>
    {
        
        public UserUnlikedReviewConsumer(
            ) : base()
        {
        }
        public void Consume(UserUnlikedReviewAction message)
        {
            try
            {
                Console.WriteLine("User With Id = {0} Unliked Review With Id = {1} LOGIC NOT IMPLEMENTED => ", message.UserId, message.ReviewId);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}
