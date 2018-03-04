
using fso.NotificationData.Domains;
using fso.NotificationData.Extensions.JsonExtensions;
using System;
using System.Collections.Generic;

namespace fso.NotificationData.Models.Notification.SubModels
{
    public class NavbarNotificationDisplay
    {
        public int Id { get; set; }

        public bool IsSeen { get; set; }

        public string Content { get; set; }

        public List<NotificationUserInfo> ActivityUsers { get; set; }

        public DateTime DateUtcAdded { get; set; }
        public DateTime DateUtcModified { get; set; }

        public string ImageUrl { get; set; }
        public string UserId { get; set; }
        public string RedirectUrl { get; set; }
        public string NotificationTypeIcon { get; set; } = " ";

        public NotificationType NotificationType { get; set; }

    }
}
