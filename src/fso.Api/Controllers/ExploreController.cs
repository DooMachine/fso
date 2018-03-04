using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models.Feed;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace fso.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class ExploreController : BaseAPIController
    {
        private readonly IExploreDataService _exploreDataService;

        public ExploreController(
            IExploreDataService exploreDataService
            )
        {
            _exploreDataService = exploreDataService;
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpGet("[action]")]
        public IActionResult GetExploreInterests([FromQuery]PaginatedLangRequest model)
        {
           
            Claim idClaim = User.FindFirst("sub");
            var ret = _exploreDataService.GetExploreInterests(model,idClaim?.Value);
            return Ok(ret);
        }
    }
}
