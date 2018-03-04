using fso.Core.Data;
using fso.Core.Domains.Helpers;
using fso.Core.Extensions;
using fso.NotificationData;
using fso.NotificationData.Domains;
using fso.NotificationData.Models.Notification.SubModels;
using fso.NotificationData.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using fso.NotificationData.Extensions.JsonExtensions;

namespace fso.NotificationApi.Services
{
    public class NotificationDataService : INotificationDataService
    {
        private readonly IEntityContext _context;
        private readonly DbSet<Notification> _dbEntitySet;

        public NotificationDataService(IEntityContext context)
        {
            _context = context;            
            _dbEntitySet = _context.Set<Notification>();
        }
        public PaginatedList<NavbarNotificationDisplay> GetNavbarNotifications(int pageSize, int pageNumber, string appUserId)
        {

            List<NavbarNotificationDisplay> retl = new List<NavbarNotificationDisplay>();

            int totalCount = _dbEntitySet.AsNoTracking()
                .Where(p => p.UserId == appUserId).Count();

            var notifications = _dbEntitySet
                .AsNoTracking()
                .Where(p => p.UserId == appUserId)
                .OrderByDescending(p => p.DateUtcModified)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);
            foreach (var not in notifications)
            {
                NavbarNotificationDisplay nd = new NavbarNotificationDisplay()
                {
                    DateUtcAdded = not.DateUtcAdd,
                    DateUtcModified = not.DateUtcModified,
                    Id = not.Id,
                    ImageUrl = not.ImageUrl,
                    IsSeen = not.IsSeen,
                    NotificationType = not.NotificationType,
                    RedirectUrl = not.RedirectUrl,
                };
                string usJson = not.ActivityUserJsonArray;
                if (string.IsNullOrEmpty(usJson))
                {
                    nd.ActivityUsers = new List<NotificationUserInfo>();
                }
                else
                {
                    nd.ActivityUsers = JsonConvert.DeserializeObject<List<NotificationUserInfo>>(not.ActivityUserJsonArray).OrderByDescending(p=>p.DateUtcAdd).ToList();
                }
                retl.Add(nd);
            }

            return retl.ToPaginatedList(pageNumber, pageSize, totalCount);
        }
        public List<NavbarNotificationDisplay> GetNotificationUpdates(int lastNotificationId, string appUserId)
        {
            List<NavbarNotificationDisplay> retl = new List<NavbarNotificationDisplay>();

            int totalCount = _dbEntitySet.AsNoTracking()
                .Where(p => p.UserId == appUserId).Count();

            var notifications = _dbEntitySet
                .AsNoTracking()
                .Where(p => p.UserId == appUserId && p.Id > lastNotificationId)
                .OrderByDescending(p => p.DateUtcModified)
                .ToList();

            foreach (var not in notifications)
            {
                NavbarNotificationDisplay nd = new NavbarNotificationDisplay()
                {
                    DateUtcAdded = not.DateUtcAdd,
                    DateUtcModified = not.DateUtcModified,
                    Id = not.Id,
                    ImageUrl = not.ImageUrl,
                    IsSeen = not.IsSeen,
                    NotificationType = not.NotificationType,
                    RedirectUrl = not.RedirectUrl,
                };
                string usJson = not.ActivityUserJsonArray;
                if (string.IsNullOrEmpty(usJson))
                {
                    nd.ActivityUsers = new List<NotificationUserInfo>();
                }
                else
                {
                    nd.ActivityUsers = JsonConvert.DeserializeObject<List<NotificationUserInfo>>(not.ActivityUserJsonArray).OrderByDescending(p => p.DateUtcAdd).ToList();
                }
                retl.Add(nd);
            }

            return retl;
        }
        public void SetReaded(int[] notificationIds)
        {
            foreach (var item in notificationIds)
            {
                Notification ntf = _dbEntitySet.Find(item);
                ntf.IsSeen = true;
                _context.SetAsModified(ntf);
            }
            _context.SaveChanges();
        }
        
    }
}
