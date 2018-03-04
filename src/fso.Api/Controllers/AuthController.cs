using fso.Api.Extensions;
using fso.Core.Domains;
using fso.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace fso.Api.Controllers
{

    [Route("api/[controller]")]
    public class AuthController : BaseAPIController
    {
        private readonly AppSettings _appSettings;
        private readonly IService<UserInfo> _userInfoService;
        private readonly ILogger _logger;

        public AuthController(
            IOptions<AppSettings> appSettings,
            ILoggerFactory loggerFactory,
            IService<UserInfo> userInfoService
            )
        {
            _logger = _logger = loggerFactory.CreateLogger<AuthController>();
            _appSettings = appSettings.Value;
            _userInfoService = userInfoService;
        }
        
        
    }
}
