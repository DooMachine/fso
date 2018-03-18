using EasyNetQ;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;

namespace fso.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class AddGroupController : BaseAPIController
    {
        private readonly IGroupActionService _groupActionService;
        private readonly IGroupDataService _groupDataService;
        private readonly IBus _bus;
        public AddGroupController(
            IGroupDataService groupDataService,
            IGroupActionService groupActionService,
            IBus bus
            )
        {
            _groupActionService = groupActionService;
            _groupDataService = groupDataService;
            _bus = bus;
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult AddGroup([FromBody]AddGroupParameters model)
        {
            AddGroupReturn ret = new AddGroupReturn();
            if (!ModelState.IsValid)
            {
                ret.IsActionSucceed = false;
                ret.Errors = new Dictionary<string, string>();
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var error in modelState.Errors)
                    {
                        ret.Errors.Add(error.Exception.HResult.ToString(), error.ErrorMessage);
                    }
                }
                return Ok(Json(ret));
            }
            Claim idClaim = User.FindFirst("sub");
            ret = _groupActionService.AddGroup(model);
            return Ok(ret);
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpGet("[action]")]
        public IActionResult GetAutoCompleteInterest([FromQuery]string query, int pageSize = 4)
        {
            Claim idClaim = User.FindFirst("sub");
            var ret = _groupDataService.GetAutoCompleteInterest(query, pageSize);
            return Ok(Json(ret));
        }
    }
}
