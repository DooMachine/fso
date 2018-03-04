using fso.DataExtensions.DataServices;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace fso.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class UserController : BaseAPIController
    {
        private readonly IUserActivityDataService _userActivityDataService;
        private readonly IUserInfoDataService _userInfoDataService;
        private readonly IGroupDataService _groupDataService;
        public UserController(
            IUserActivityDataService userActivityDataService,
            IUserInfoDataService userInfoDataService,
            IGroupDataService groupDataService
            )
        {
            _userActivityDataService = userActivityDataService;
            _userInfoDataService = userInfoDataService;
            _groupDataService = groupDataService;
        }
        
        
    }
}
