

using fso.Core.Domains.Helpers;
using fso.DataExtensions.Models.Notification.SubModels;
using System.Collections.Generic;

namespace fso.DataExtensions.Models.Notification
{
    public class NavbarNotificationsReturnModel : BaseReturnModel
    {
        public PaginatedList<NavbarNotificationDisplay> Notifications { get; set; }
    }
}
