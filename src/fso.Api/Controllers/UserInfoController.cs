
using EasyNetQ;
using fso.Api.Models.GetParameters;
using fso.Caching.CachingServices;
using fso.Core.Domains;
using fso.Core.Domains.Helpers;
using fso.Core.Extensions;
using fso.Core.Services;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using fso.DataExtensions.Models.Review;
using fso.DataExtensions.Models.UserInfo;
using fso.EventCore.UserActions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace fso.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class UserInfoController : BaseAPIController
    {
        private readonly IUserInfoDataService _userInfoDataService;
        private readonly IUserActivityDataService _userActivityDataService;
        private readonly IGroupDataService _groupDataService;
        private readonly IReviewDataService _reviewDataService;
        private readonly IBus _bus;

        public UserInfoController(
            IService<UserInfo> userInfoService,
            IUserActivityDataService userActivityDataService,
            IUserInfoDataService userInfoDataService,
            IReviewDataService reviewDataService,
            IGroupDataService groupDataService,
            IBus bus
            ) : base()
        {
            _userActivityDataService = userActivityDataService;
            _userInfoDataService = userInfoDataService;
            _groupDataService = groupDataService;
            _reviewDataService = reviewDataService;
            _bus = bus;

        }

       
        [HttpGet("[action]")]
        public IActionResult GetUserInfo([FromQuery]string userName)
        {
            UserInfoProfileReturn ret = new UserInfoProfileReturn();
            try
            {
                Claim idClaim = User.FindFirst("sub");
                ret = _userInfoDataService.GetUserProfileInfo(userName, idClaim?.Value);
                ret.IsActionSucceed = true;
                return Ok(Json(ret));
            }
            catch (System.Exception ex)
            {
                ret.IsActionSucceed=false;
                ret.ErrorInformation.UserInformation = ex.Message;
                return Ok(Json(ret));
            }
        }

        [HttpGet("[action]")]
        [Authorize(Policy = "fso.AngularUser")]
        public IActionResult GetUserFeed([FromQuery]string userName, int pageIndex, int pageSize)
        {
            Claim idClaim = User.FindFirst("sub");

            UserFeedReturn ret = new UserFeedReturn();
            
            string userId = _userInfoDataService.GetUserId(userName);

            PaginatedList<UserActivity> uActs = _userActivityDataService.GetUserActivities(userId, pageIndex, pageSize);
            ret.Entities = _userActivityDataService.GetActivityDTO(uActs, idClaim == null ? "" : idClaim.Value).ToPaginatedList(pageIndex, pageSize, uActs.TotalCount);
            
            return Ok(ret);
        }

        [HttpGet("[action]")]
        [Authorize(Policy = "fso.AngularUser")]
        public IActionResult GetUserReviews([FromQuery]UserNameParameters model)
        {
            Claim idClaim = User.FindFirst("sub");
            UserReviewsReturnModel revs;
            
            revs = _userInfoDataService.GetUserReviews(model.Username, model.PageIndex, model.PageSize, model.Order, idClaim?.Value);
            
            return Ok(revs);
            //}
            //catch (System.Exception)
            //{
            //    return BadRequest();
            //}
        }
        [HttpGet("[action]")]
        [Authorize(Policy = "fso.AngularUser")]
        public IActionResult GetUserPosts([FromQuery]UserNameParameters model)
        {
            Claim idClaim = User.FindFirst("sub");
            UserPostsReturn ret;

            ret = _userInfoDataService.GetUserPosts(model.Username, idClaim?.Value, model.PageIndex, model.PageSize);

            return Ok(Json(ret));
            //}
            //catch (System.Exception)
            //{
            //    return BadRequest();
            //}
        }
        [HttpGet("[action]")]
        [Authorize(Policy = "fso.AngularUser")]
        public IActionResult GetUserFollowings([FromQuery]UserNameParameters model)
        {
            
            Claim idClaim = User.FindFirst("sub");
            UserFollowUsersReturn ret = new UserFollowUsersReturn
            {
                Entities = _userInfoDataService.GetUserFollowings(model.Username, model.PageIndex, model.PageSize, idClaim?.Value)
            };
            return Ok(Json(ret));
            //}
            //catch (System.Exception)
            //{
            //    return BadRequest();
            //}
        }

        [HttpGet("[action]")]
        [Authorize(Policy = "fso.AngularUser")]
        public IActionResult GetUserFollowers([FromQuery]UserNameParameters model)
        {
            
            Claim idClaim = User.FindFirst("sub");
            UserFollowUsersReturn ret = new UserFollowUsersReturn
            {
                Entities = _userInfoDataService.GetUserFollowers(model.Username, model.PageIndex, model.PageSize, idClaim?.Value)
            };

            return Ok(Json(ret));
            //}
            //catch (System.Exception)
            //{
            //    return BadRequest();
            //}
        }

        [HttpGet("[action]")]
        public IActionResult GetUserInterests([FromQuery]UserNameParameters model)
        {
            UserInterestsReturn ret;
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            if (idClaim == null)
            {
                ret = _userInfoDataService.GetUserInterests(model.Username, model.PageIndex, model.PageSize);
            }
            else
            {
                ret = _userInfoDataService.GetUserInterests(model.Username, model.PageIndex, model.PageSize, idClaim.Value);
            }
            return Ok(Json(ret));
            //}
            //catch (System.Exception)
            //{
            //    return BadRequest();
            //}
        }
        [HttpGet("[action]")]
        public IActionResult GetUserBestPosts([FromQuery]string userName, int pageSize)
        {
            var ret = _userInfoDataService.GetBestPosts(userName, pageSize);
            return Ok(Json(ret));
        }
        [HttpGet("[action]")]
        [Authorize(Policy = "fso.AngularUser")]
        public IActionResult GetUserCollections([FromQuery]UserNameParameters model)
        {
            Claim idClaim = User.FindFirst("sub");
            UserPostCollectionsReturn ret = _userInfoDataService.GetUserPostCollections(model.Username,model.PageIndex, model.PageSize, model.Order);
            return Ok(ret);
        }
        [HttpGet("[action]")]
        [Authorize(Policy = "fso.AngularUser")]
        public IActionResult GetUserFavourites([FromQuery]UserNameParameters model)
        {
            Claim idClaim = User.FindFirst("sub");
            PaginatedPostCardReturn ret = _userInfoDataService.GetUserFavourites(model.Username, model.PageIndex, model.PageSize, model.Order,idClaim?.Value);
            return Ok(ret);
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult FollowUser([FromBody]UserNameModel model)
        {
            FollowUserReturn ret = new FollowUserReturn();
            
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            Claim usernameClaim = User.FindFirst("nickname");

            ret = _userInfoDataService.FollowUser(model.Username, idClaim.Value);
            if (ret.IsActionSucceed && !string.IsNullOrEmpty(ret.FollowedUserId))
            {
                _bus.Publish(new UserFollowedUserAction()
                {
                    DateUtcAction = DateTime.UtcNow,
                    FollowedUserId = ret.FollowedUserId,
                    FollowingUsername = usernameClaim.Value,
                    FollowingUserId = idClaim.Value
                });
            }

            return Ok(Json(ret));
            
        }

        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult UnFollowUser([FromBody]UserNameModel model)
        {
            FollowUserReturn ret = new FollowUserReturn();
            //try
            //{
                var user = HttpContext.User;
                Claim idClaim = User.FindFirst("sub");

                ret = _userInfoDataService.UnFollowUser(model.Username, idClaim.Value);
                
                return Ok(Json(ret));
            //}
            //catch (System.Exception ex)
            //{
            //    ret.IsActionSucceed = false;
            //    ret.ErrorInformation.UserInformation = ex.Message;
            //    return Ok(Json(ret));
            //}
        }

        
    }
}