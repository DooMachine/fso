using AutoMapper;
using fso.Api.Extensions;
using fso.Api.Models.Auth;
using fso.Core.Domains;
using fso.Core.Domains.Helpers;
using fso.Core.Services;
using fso.DataExtensions.Models.GroupReturnModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using fso.Core.Caching;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models.Trending;
using System.Security.Claims;

namespace fso.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class TrendingController : BaseAPIController
    {
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;
        private readonly ICacheProvider _cacheProvider;
        private readonly IUserInfoDataService _userInfoDataService;
        private readonly ITrendingDataService _trendingDataService;

        public TrendingController(
            IOptions<AppSettings> appSettings,
            IMapper mapper,
            ILoggerFactory loggerFactory,
            ICacheProvider cacheProvider,
            IUserInfoDataService userInfoDataService,
            ITrendingDataService trendingDataService
            )
        {
            _logger = _logger = loggerFactory.CreateLogger<AuthController>();
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _cacheProvider = cacheProvider;
            _userInfoDataService = userInfoDataService;
            _trendingDataService = trendingDataService;
        }
        
        
        [HttpGet("[action]")]
        public TrendingGroupsReturnModel GetGroups([FromQuery]int pageSize, int pageIndex, string culture)
        {
            TrendingGroupsReturnModel model = new TrendingGroupsReturnModel();
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            if (string.IsNullOrEmpty(culture)) culture = "WW";
            if (idClaim != null)
            {
                return _trendingDataService.GetTrendingGroups(pageIndex, pageSize, idClaim.Value, culture);
            }
            else
            {
                return _trendingDataService.GetTrendingGroups(pageIndex, pageSize, null, culture);
            }
        }
        
        [HttpGet("[action]")]
        public TrendingPostsReturnModel GetPosts([FromQuery]int pageSize, int pageIndex, string culture)
        {
            TrendingPostsReturnModel model = new TrendingPostsReturnModel();
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            if (string.IsNullOrEmpty(culture)) culture = "WW";
            if (idClaim != null)
            {
                return _trendingDataService.GetTrendingPosts(pageIndex, pageSize, idClaim.Value, culture);
            }
            else
            {
                return _trendingDataService.GetTrendingPosts(pageIndex, pageSize, null, culture);
            }
        }
    }
}
