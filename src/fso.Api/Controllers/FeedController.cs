using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using fso.DataExtensions.Models.Feed;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace fso.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class FeedController : BaseAPIController
    {
        private readonly IFeedDataService _feedDataService;
        public FeedController(
            IFeedDataService feedDataService
            ) : base()
        {
            _feedDataService = feedDataService;
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpGet("[action]")]
        public IActionResult Hfeed([FromQuery]HomeFeedRequest model)
        {
            HomeFeedReturn ret;
            Claim idClaim = User.FindFirst("sub");

            PaginatedRequest feedReq = new PaginatedRequest()
            {
                Order = model.ActivityOrder,
                PageIndex = model.ActivityPageIndex,
                PageSize = model.ActivityPageSize
            };
            PaginatedRequest urecReq = new PaginatedRequest()
            {
                Order = model.UserRecommendationOrder,
                PageIndex = model.UserRecommendationPageIndex,
                PageSize = model.UserRecommendationPageSize
            };
            PaginatedRequest grecReq = new PaginatedRequest()
            {
                Order = model.GroupRecommendationsOrder,
                PageIndex = model.GroupRecommendationsPageIndex,
                PageSize = model.GroupRecommendationsPageSize
            };

            ret = _feedDataService.GetUserFeed(idClaim?.Value,feedReq, urecReq, grecReq);

            return Ok(ret);
        }

        [Authorize(Policy = "fso.AngularUser")]
        [HttpGet("[action]")]
        public IActionResult Hfinterests([FromQuery]PaginatedRequest model)
        {
            PaginatedInterestCard ret;
            Claim idClaim = User.FindFirst("sub");
            ret = _feedDataService.GetUserInterests(idClaim?.Value, model);
            return Ok(ret);
        }
    }
}
