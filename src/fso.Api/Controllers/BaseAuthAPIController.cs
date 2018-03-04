using Microsoft.AspNetCore.Authorization;

namespace fso.Api.Controllers
{
    [Authorize]
    public class BaseAuthAPIController : BaseAPIController
    {
        public BaseAuthAPIController() { }
    }
}
