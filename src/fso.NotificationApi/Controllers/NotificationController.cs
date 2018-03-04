using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using fso.NotificationApi.Helpers;
using fso.NotificationData.Models.Notification;
using fso.NotificationData.Models.Notification.SubModels;
using fso.NotificationData.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Security.Claims;

namespace fso.NotificationApi.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class NotificationController : Controller
    {        
        private readonly INotificationDataService _notificationDataService;
        private readonly ILogger _logger;

        public NotificationController(
            INotificationDataService notificationDataService,
            ILoggerFactory loggerFactory
            )
        {
            _notificationDataService = notificationDataService;
            _logger = loggerFactory.CreateLogger<NotificationController>();
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpGet("[action]")]
        public IActionResult GetUserNotifications([FromQuery]int pageSize, int pageNumber)
        {
            NavbarNotificationsReturnModel ret = new NavbarNotificationsReturnModel();
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            if (idClaim != null)
            {
                ret.Notifications = _notificationDataService.GetNavbarNotifications(pageSize, pageNumber, idClaim.Value);
                ret.IsMoreNotifications = ret.Notifications.HasNextPage;
            }            
            return Ok(Json(ret));
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpGet("[action]")]
        public IActionResult GetNotificationUpdates([FromQuery]int lastNotificationId)
        {
            List<NavbarNotificationDisplay> ret = new List<NavbarNotificationDisplay>();
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            if (idClaim==null)
            {
                return Ok(ret);
            }
            ret = _notificationDataService.GetNotificationUpdates(lastNotificationId, idClaim.Value);

            return Ok(Json(ret));
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult SetReaded([FromBody]NotificationIds model)
        {
            BaseReturnModel ret = new BaseReturnModel();
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            if (idClaim == null)
            {
                ret.IsActionSucceed = false;
                ret.ErrorInformation.RedirectUrl = "Auth";

                return Ok(Json(ret));
            }
            ret.IsActionSucceed = true;
            _notificationDataService.SetReaded(model.notificationIds);

            return Ok(Json(ret));
        }
    }
}
