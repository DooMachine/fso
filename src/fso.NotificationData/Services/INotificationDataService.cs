using fso.Core.Domains.Helpers;
using fso.NotificationData.Models.Notification.SubModels;
using System;
using System.Collections.Generic;

namespace fso.NotificationData.Services
{
    public interface INotificationDataService 
    {
        PaginatedList<NavbarNotificationDisplay> GetNavbarNotifications(int pageSize, int pageNumber, string userInfoId);
        List<NavbarNotificationDisplay> GetNotificationUpdates(int lastNotificationId, string appUserId);
        void SetReaded(int[] notificationIds);
    }
}
