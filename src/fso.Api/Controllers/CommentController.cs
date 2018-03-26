using EasyNetQ;
using fso.Api.Models.GetParameters;
using fso.Api.Models.RequestModels;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using fso.EventCore.CommentActions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Security.Claims;

namespace fso.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class CommentController : BaseAPIController
    {
        private readonly ICommentDataService _commentDataService;
        private readonly ICommentActionService _commentActionService;
        private readonly ILogger _logger;
        private readonly IBus _bus;
        public CommentController(
            ICommentDataService commentDataService,
            ICommentActionService commentActionService,
            ILoggerFactory loggerFactory,
            IBus bus
            )
        {
            _commentDataService = commentDataService;
            _commentActionService = commentActionService;
            _logger = loggerFactory.CreateLogger<GroupController>();
            _bus = bus;
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult PublishComment([FromBody]CommentAddModel model)
        {
            CommentAddReturnModel ret = new CommentAddReturnModel();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            Claim idClaim = User.FindFirst("sub");
            Claim unameClaim = User.FindFirst("nickname");
            if (idClaim == null)
            {
                return StatusCode(401);
            }
            else
            {
                ret = _commentActionService.PublishComment(model.Content,idClaim.Value,model.ReviewId);
                if (ret.IsActionSucceed)
                {
                    ret.Comment.UserInfo.UserName = unameClaim.Value;
                    _bus.Publish<UserAddedCommentAction>(new UserAddedCommentAction()
                    {
                        DateUtcAction = DateTime.UtcNow,
                        PostUrlKey = ret.PostUrlKey,
                        CommentId = ret.Comment.Id,
                        ReviewId = model.ReviewId,
                        UserId = idClaim.Value,
                        ReviewAuthorId = ret.ReviewAuthorId,
                        Username = unameClaim.Value,
                        PostId=ret.PostId
                    });
                }
            }
            return Ok(ret);
        }
        /// <summary>
        /// Depreciated See Reviews Controller
        /// </summary>
        /// <param name="reviewId"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public IActionResult GetReviewComments([FromQuery]int reviewId,int pageIndex,int pageSize,string order)
        {
            ReviewCommentsReturnModel ret = new ReviewCommentsReturnModel();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            Claim idClaim = User.FindFirst("sub");
            if (idClaim==null)
            {
                ret = _commentDataService.GetReviewComments(reviewId, pageIndex, pageSize,order, null);
            }
            else
            {
                ret = _commentDataService.GetReviewComments(reviewId, pageIndex, pageSize, order, idClaim.Value);
            }
            ret.HasNextPage = ret.Comments.HasNextPage;
            ret.TotalCommentCount = ret.Comments.TotalCount;
            return Ok(ret);
        }
        
        [HttpGet("[action]")]
        public IActionResult GetCommentSubComments([FromQuery]int commentId, int pageIndex, int pageSize, string order)
        {
            ReviewCommentsReturnModel ret = new ReviewCommentsReturnModel();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            Claim idClaim = User.FindFirst("sub");
            if (idClaim == null)
            {
                ret = _commentDataService.GetSubComments(commentId, pageIndex, pageSize,order, null);
            }
            ret = _commentDataService.GetSubComments(commentId, pageIndex, pageSize,order, idClaim.Value);
            ret.HasNextPage = ret.Comments.HasNextPage;
            ret.TotalCommentCount = ret.Comments.TotalCount;
            return Ok(ret);
        }

        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult LikeComment([FromBody]CommentIdModel model)
        {
            CommentLikeReturnModel ret;
            if (model == null)
            {
                return BadRequest();
            }
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");

            if (idClaim==null)
            {           
                return StatusCode(401);
            }
            else
            {
                ret = _commentActionService.LikeComment(idClaim.Value, model.CommentId);
                if (ret.IsActionSucceed)
                {
                    _bus.Publish<UserLikedCommentAction>(new UserLikedCommentAction()
                    {
                        DateUtcAction = DateTime.UtcNow,
                        CommentId = model.CommentId,
                        UserId = idClaim.Value
                    });
                }
            }
            return Ok(ret);
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult UnLikeComment([FromBody]CommentIdModel model)
        {
            CommentLikeReturnModel ret;
            if (model == null)
            {
                return BadRequest();
            }
            Claim idClaim = User.FindFirst("sub");

            if (idClaim == null)
            {
                return StatusCode(401);
            }
            else
            {
                ret = _commentActionService.UnLikeComment(idClaim.Value, model.CommentId);
                if (ret.IsActionSucceed)
                {
                    _bus.Publish<UserUnlikedCommentAction>(new UserUnlikedCommentAction()
                    {
                        DateUtcAction = DateTime.UtcNow,
                        CommentId = model.CommentId,
                        UserId = idClaim.Value
                    });
                }
            }
            return Ok(ret);
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult DisLikeComment([FromBody]CommentIdModel model)
        {
            CommentLikeReturnModel ret;
            if (model == null)
            {
                return BadRequest();
            }
            Claim idClaim = User.FindFirst("sub");

            if (idClaim == null)
            {
                return StatusCode(401);
            }
            else
            {
                ret = _commentActionService.DislikeComment(idClaim.Value, model.CommentId);
                if (ret.IsActionSucceed)
                {
                    _bus.Publish<UserDislikedCommentAction>(new UserDislikedCommentAction()
                    {
                        DateUtcAction = DateTime.UtcNow,
                        CommentId = model.CommentId,
                        UserId = idClaim.Value
                    });
                }
            }
            return Ok(ret);
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult UnDisLikeComment([FromBody]CommentIdModel model)
        {
            CommentLikeReturnModel ret;
            if (model == null)
            {
                return BadRequest();
            }
            Claim idClaim = User.FindFirst("sub");

            if (idClaim == null)
            {
                return StatusCode(401);
            }
            else
            {
                ret = _commentActionService.UnDislikeComment(idClaim.Value, model.CommentId);
                if (ret.IsActionSucceed)
                {
                    _bus.Publish<UserUndislikedCommentAction>(new UserUndislikedCommentAction()
                    {
                        DateUtcAction = DateTime.UtcNow,
                        CommentId = model.CommentId,
                        UserId = idClaim.Value
                    });
                }
            }
            return Ok(ret);
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult DeleteComment([FromBody]CommentIdModel model)
        {
            BaseReturnModel ret;
            if (model == null)
            {
                return BadRequest();
            }
            Claim idClaim = User.FindFirst("sub");

            if (idClaim == null)
            {
                return Unauthorized();
            }
            else
            {
                ret = _commentActionService.RemoveComment(model.CommentId,idClaim.Value);                
            }
            return Ok(ret);
        }

        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult SaveEditingComment([FromBody]CommentEditModel model)
        {
            CommentEditReturnModel ret;
            if (model == null)
            {
                return BadRequest();
            }
            Claim idClaim = User.FindFirst("sub");

            if (idClaim == null)
            {
                return Unauthorized();
            }
            else
            {
                ret = _commentActionService.EditComment(model.CommentId,model.Content,idClaim.Value);                
            }
            return Ok(ret);
        }
    }
}
