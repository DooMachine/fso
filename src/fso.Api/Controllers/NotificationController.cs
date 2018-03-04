using AutoMapper;
using fso.Api.Models.GetParameters;
using fso.Core.Domains;
using fso.Core.Services;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using fso.DataExtensions.Models.Notification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace fso.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class NotificationController : BaseAPIController
    {
        private readonly IService<Notification> _notificationService;
        private readonly IService<UserInfo> _userInfoService;
        private readonly INotificationDataService _notificationDataService;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public NotificationController(
            IService<Notification> notificationService,
            IService<UserInfo> userInfoService,
            INotificationDataService notificationDataService,
            ILoggerFactory loggerFactory,
            IMapper mapper
            )
        {
            _notificationService = notificationService;
            _userInfoService = userInfoService;
            _notificationDataService = notificationDataService;
            _logger = loggerFactory.CreateLogger<GroupController>();
            _mapper = mapper;
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpGet("[action]")]
        public IActionResult GetUserNotifications([FromQuery]int pageSize,int pageNumber)
        {
            NavbarNotificationsReturnModel ret = new NavbarNotificationsReturnModel();
            
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            if (idClaim == null)
            {
                ret.IsActionSucceed = false;
                ret.ErrorInformation.RedirectUrl = "Auth";

                return Ok(Json(ret));
            }
            ret.Notifications = _notificationDataService.GetNavbarNotifications(pageSize, pageNumber, idClaim.Value);
            ret.IsActionSucceed = true;
            

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