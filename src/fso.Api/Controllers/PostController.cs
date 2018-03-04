using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using fso.Core.Services;
using fso.Core.Domains;
using System;
using Microsoft.Extensions.Logging;
using fso.Api.Models.RequestModels;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using System.Security.Claims;
using fso.Core.Caching;
using fso.Api.Models.GetParameters;
using fso.EventCore.PostActions;
using EasyNetQ;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;

namespace fso.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class PostController : BaseAPIController
    {
        private readonly IService<Post> _postService;
        private readonly IPostActionService _postActionService;
        private readonly IPostDataService _postDataService;
        private readonly IPostLikeDataService _postLikeDataService;
        private readonly IUserInfoDataService _userInfoDataService;
        private readonly IReviewDataService _reviewDataService;
        private readonly ILogger _logger;
        private readonly ICacheProvider _cacheProvider;
        private readonly IBus _eventBus;
        public PostController(
            IService<Post> postService,
            IReviewDataService reviewDataService,
            IUserInfoDataService userInfoDataService,
            ILoggerFactory loggerFactory,
            IPostActionService postActionService,
            IPostLikeDataService postLikeDataService,
            IPostDataService postDataService,
            ICacheProvider cacheProvider,
            IBus eventBus
            )
        {
            _postService = postService;
            _userInfoDataService = userInfoDataService;
            _postLikeDataService = postLikeDataService;
            _postDataService = postDataService;
            _postActionService = postActionService;
            _logger = loggerFactory.CreateLogger<PostController>();
            _cacheProvider = cacheProvider;
            _reviewDataService = reviewDataService;
            _eventBus = eventBus;
        }
        
        [HttpGet("[action]")]
        public IActionResult GetPost([FromQuery]PostModalParameters model)
        {
            PostIndexReturn ret;
            Claim idClaim = User.FindFirst("sub");
            ret = _postDataService.GetPostIndex(model.PostId,model.ReviewId, idClaim?.Value);
            if (!ret.IsActionSucceed)
            {
                return NotFound();
            }
            return Ok(Json(ret));
        }

        [HttpGet("[action]")]
        public IActionResult GetPaginatedReviews([FromQuery]PostIdParameters model)
        {
            PaginatedReviews ret;
            Claim idClaim = User.FindFirst("sub");
            ret = _postDataService.GetPaginatedReviews(model.PostId, model.PageIndex,model.PageSize,model.Order, idClaim?.Value);
            
            return Ok(ret);
        }
        // Not using anymore
        [HttpGet("[action]")]
        public IActionResult GetPostModalPostParts([FromQuery]PostIdModel model)
        {
            ICollection<PostPartDisplay> ret;
            ret = _postDataService.GetPostParts(model.PostId);
            
            return Ok(Json(ret));
        }


        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult LikePost([FromBody]PostIdModel model)
        {
            var user = HttpContext.User;
            LikePostReturn ret = new LikePostReturn();
            try
            {
                Claim idClaim = User.FindFirst("sub");
                Claim userNameClaim = User.FindFirst("nickname");
                if (idClaim == null)
                {
                    ret.ErrorInformation.ErrorType = ErrorType.RedirectAuth;
                    ret.ErrorInformation.RedirectUrl = "";
                    ret.IsActionSucceed = false;
                    return Ok(Json(ret));
                }
                string userId = idClaim.Value;
                ret = _postActionService.LikePost(model.PostId, userId);
                if (ret.IsActionSucceed)
                {
                    _eventBus.Publish<UserPostFavouritedAction>(new UserPostFavouritedAction()
                    {
                        UserId = userId,
                        PostId = model.PostId,
                        PostAuthorId = ret.PostAuthorId,
                        DateUtcAction = DateTime.UtcNow,
                        Username = userNameClaim.Value
                    }, "#");
                }                
                return Ok(Json(ret));
            }
            catch (Exception)
            {
                ret.ErrorInformation.ErrorType = ErrorType.NoAction;
                ret.ErrorInformation.UserInformation = "Sorry, an error occured!";
                ret.IsActionSucceed = false;
                return Ok(Json(ret));

            }
        }
        
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult UnlikePost([FromBody]PostIdModel model)
        {
            var user = HttpContext.User;
            LikePostReturn ret = new LikePostReturn();
            try
            {
                Claim idClaim = User.FindFirst("sub");
                if (idClaim == null)
                {
                    ret.ErrorInformation.ErrorType = ErrorType.RedirectAuth;
                    ret.ErrorInformation.RedirectUrl = "/RedirectAuth";
                    ret.IsActionSucceed = false;
                    return Ok(Json(ret));
                }
                string userId = idClaim.Value;
                ret = _postActionService.UnlikePost(model.PostId, userId);
                if (ret.IsActionSucceed)
                {
                    _eventBus.Publish<UserPostUnfavouritedAction>(new UserPostUnfavouritedAction()
                    {
                        UserId = userId,
                        PostId = model.PostId,
                        PostAuthorId = ret.PostAuthorId,
                        DateUtcAction = DateTime.UtcNow,
                        
                    }, "#");                    
                }
                return Ok(Json(ret));
            }
            catch (Exception)
            {
                ret.ErrorInformation.ErrorType = ErrorType.NoAction;
                ret.ErrorInformation.UserInformation = "Sorry, an error occured!";
                ret.IsActionSucceed = false;
                return Ok(Json(ret));

            }
        }
    }
}
