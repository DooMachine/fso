using EasyNetQ;
using fso.Api.Models.GetParameters;
using fso.Core.Caching;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using fso.EventCore.ReviewActions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Security.Claims;

namespace fso.Api.Controllers
{
    [Route("api/[controller]")]
    public class ReviewController : BaseAPIController
    {
        private readonly IReviewDataService _reviewDataService;
        private readonly IReviewActionService _reviewActionService;
        private readonly ILogger _logger;
        private readonly ICacheProvider _cacheProvider;
        private readonly IBus _bus;
        public ReviewController(
            ILoggerFactory loggerFactory,
            ICacheProvider cacheProvider,
            IReviewDataService reviewDataService,
            IReviewActionService reviewActionService,
            IBus bus
            )
        {
            _logger = loggerFactory.CreateLogger<ReviewController>();
            _cacheProvider = cacheProvider;
            _reviewDataService = reviewDataService;
            _reviewActionService = reviewActionService;
            _bus = bus;
        }
        [HttpGet("[action]")]
        public IActionResult GetReviewComments([FromQuery]int reviewId)
        {
            try
            {
                PaginatedComments ret;

                Claim idClaim = User.FindFirst("sub");
            
            
                ret = _reviewDataService.GetReviewComments(reviewId,idClaim==null ? "" : idClaim.Value);
            
                return Ok(ret);
                }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult AddReview([FromBody]AddReviewParameters model)
        {
            AddReviewReturnModel ret;
            Claim idClaim = User.FindFirst("sub");
            Claim userNameClaim = User.FindFirst("nickname");
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (idClaim == null)
            {
                return Unauthorized();
            }
            ret = _reviewActionService.AddReview(model.PostId, model.Rating, model.Content, idClaim?.Value,userNameClaim?.Value);
            if (ret.IsActionSucceed)
            {
                _bus.Publish<UserAddedReviewAction>(new UserAddedReviewAction()
                {
                    DateUtcAction = DateTime.UtcNow,
                    PostAuthorId = ret.PostAuthorId,
                    PostId = model.PostId,
                    ReviewId = ret.Review.Id,
                    UserId = idClaim.Value,
                    Username = userNameClaim.Value,
                });
            }
            return Ok(ret);
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult DeleteReview([FromBody]ReviewIdParameter model)
        {
            DeleteReviewModel ret;
            Claim idClaim = User.FindFirst("sub");
            if (idClaim==null)
            {
                return Unauthorized();
            }
            ret = _reviewActionService.DeleteReview(model.ReviewId,idClaim.Value);
            if (ret.IsActionSucceed)
            {
                _bus.Publish<UserDeletedReviewAction>(new UserDeletedReviewAction()
                {
                    Review = ret.Review,
                    DateUtcAction = DateTime.UtcNow
                }, "#");
            }
            return Ok(ret);
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult LikeReview([FromBody]ReviewIdParameter model)
        {
            ReviewLikeResult ret = new ReviewLikeResult();
            Claim idClaim = User.FindFirst("sub");
            Claim usernameClaim = User.FindFirst("nickname");
            if (idClaim==null)
            {
                return Unauthorized();
            }
            ret = _reviewActionService.LikeReview(idClaim.Value, model.ReviewId);
            if (ret.IsActionSucceed && ret.PostId != 0)
            {
                _bus.Publish<UserLikedReviewAction>(new UserLikedReviewAction()
                {
                    UserId = idClaim.Value,
                    ReviewAuthorId = ret.ReviewAuthorId,
                    ReviewId = model.ReviewId,
                    PostId = ret.PostId,
                    Username = usernameClaim.Value,
                    DateUtcAction = DateTime.UtcNow
                }, "#");
            }
            return Ok(Json(ret));
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult UnlikeReview([FromBody]ReviewIdParameter model)
        {
            ReviewLikeResult ret = new ReviewLikeResult();
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            Claim usernameClaim = User.FindFirst("nickname");
            if (idClaim == null)
            {
                return Unauthorized();
            }
            ret = _reviewActionService.UnlikeReview(idClaim.Value, model.ReviewId);
            
            if (ret.IsActionSucceed && ret.PostId != 0)
            {
                _bus.Publish<UserUnlikedReviewAction>(new UserUnlikedReviewAction()
                {
                    UserId = idClaim.Value,
                    ReviewAuthorId = ret.ReviewAuthorId,
                    ReviewId = model.ReviewId,
                    DateUtcAction = DateTime.UtcNow,
                    Username = usernameClaim.Value,
                    PostId = ret.PostId                    
                }, "#");
            }
            return Ok(Json(ret));

        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult DislikeReview([FromBody]ReviewIdParameter model)
        {
            ReviewLikeResult ret = new ReviewLikeResult();
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            if (idClaim == null)
            {
                return Unauthorized();
            }
            ret = _reviewActionService.DislikeReview(idClaim.Value, model.ReviewId);
            if (ret.IsActionSucceed)
            {
                _bus.Publish<UserDislikedReviewAction>(new UserDislikedReviewAction()
                {
                    UserId = idClaim.Value,
                    ReviewId = model.ReviewId,
                    DateUtcAction = DateTime.UtcNow
                }, "#");
            }
            return Ok(Json(ret));

        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult UndislikeReview([FromBody]ReviewIdParameter model)
        {
            ReviewLikeResult ret = new ReviewLikeResult();
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            if (idClaim == null)
            {
                return Unauthorized();
            }
            ret = _reviewActionService.UndislikeReview(idClaim.Value, model.ReviewId);
            if (ret.IsActionSucceed)
            {
                _bus.Publish<UserUndislikedReviewAction>(new UserUndislikedReviewAction()
                {
                    UserId = idClaim.Value,
                    ReviewId = model.ReviewId,
                    DateUtcAction = DateTime.UtcNow
                }, "#");
            }
            return Ok(Json(ret));

        }
    }
}
