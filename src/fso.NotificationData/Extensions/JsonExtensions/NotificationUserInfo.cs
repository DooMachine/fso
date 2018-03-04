using System;

namespace fso.NotificationData.Extensions.JsonExtensions
{
    public class NotificationUserInfo 
    {
        public string UserId { get; set; }
        public string ImageUrl { get; set; }
        public string Username { get; set; }
        public DateTime? DateUtcAdd { get; set; }
    }
}
