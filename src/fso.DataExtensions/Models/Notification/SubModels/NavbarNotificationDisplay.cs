using fso.Core.Domains;
using System;

namespace fso.DataExtensions.Models.Notification.SubModels
{
    public class NavbarNotificationDisplay
    {
        public int Id { get; set; }

        public bool IsSeen { get; set; }

        public string Content { get; set; }

        public DateTime DateUtcAdded { get; set; }

        public string ImageUrl { get; set; }

        public string RedirectUrl { get; set; }

        public NotificationType NotificationType { get; set; }

    }
}
