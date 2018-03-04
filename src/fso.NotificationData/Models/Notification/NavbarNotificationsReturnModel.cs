

using fso.Core.Domains.Helpers;
using fso.NotificationData.Models.Notification.SubModels;
using System.Collections.Generic;

namespace fso.NotificationData.Models.Notification
{
    public class NavbarNotificationsReturnModel 
    {
        public PaginatedList<NavbarNotificationDisplay> Notifications { get; set; }
        public bool IsMoreNotifications { get; set; }
    }
}
