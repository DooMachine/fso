using fso.StatisticsData.DataServices;
using fso.StatisticsData.Domains;
using fso.StatisticsService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace fso.StatisticsService.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class AbuseController : Controller
    {
        private readonly IAbuseService _abuseService;
        public AbuseController(IAbuseService abuseService)
        {
            _abuseService = abuseService;
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpGet("[action]")]
        public IActionResult AddAbuse([FromBody] AddAbuseModel model)
        {
            // TODO: IMPLEMENT SERVICES THEN END-CODE THIS ACTION
            Claim idClaim = User.FindFirst("sub");

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            AbuseReport report = new AbuseReport()
            {
                DateUtcAdd = DateTime.UtcNow,
                DateUtcModified = DateTime.UtcNow,
                Details = model.Details,                
                IsSoftDeleted = false,
                AbuseType = model.ReportType,
                ReporterId = idClaim.Value,                
            };
            var result = _abuseService.AddAbuseReport(report);
            if (result != 0)
            {
                return Ok();
            }
            return BadRequest();            
        }
    }

}
