using EasyNetQ;
using fso.Api.Models.GetParameters;
using fso.DataExtensions.DataServices;
using fso.EventCore.UserSettingsActions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace fso.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class ProfileSettingsController : BaseAPIController
    {
        private readonly IProfileSettingsDataService _profileSettingsService;
        private readonly IBus _bus;
        public ProfileSettingsController(
            IProfileSettingsDataService profileSettingsService,
            IBus bus
            )
        {
            _profileSettingsService = profileSettingsService;
            _bus = bus;
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpGet("[action]")]
        public IActionResult GetProfileSettings()
        {
            Claim idClaim = User.FindFirst("sub");
            var resp = _profileSettingsService.GetUserSettings(idClaim.Value);
            return Ok(Json(resp));
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult SaveProfileSettings([FromBody] UpdateProfileSettings model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            Claim idClaim = User.FindFirst("sub");
            var resp = _profileSettingsService.SaveUserSettings(model.Model, idClaim.Value);
            if (resp.IsActionSucceed)
            {
                _bus.Publish<UserUpdatedProfileAction>(new UserUpdatedProfileAction()
                {
                    Name = model.Model.Name,
                    DateUtcAction = DateTime.UtcNow,
                    Status = model.Model.Status,
                    Surname = model.Model.Surname
                });
            }
            return Ok(Json(resp));
        }
    }
}
