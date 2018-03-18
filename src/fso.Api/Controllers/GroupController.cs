using AutoMapper;
using EasyNetQ;
using fso.Api.Models.RequestModels;
using fso.Core.Domains;
using fso.Core.Domains.MMEntities;
using fso.Core.Services;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using fso.EventCore.GroupActions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Security.Claims;

namespace fso.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class GroupController : BaseAPIController
    {
        private readonly IService<Group> _groupService;
        private readonly IService<UserInfo> _userInfoService;
        private readonly IService<Post> _postService;
        private readonly IPostDataService _postDataService;
        private readonly IGroupDataService _groupDataService;
        private readonly IUserInfoDataService _userInfoDataService; 
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private readonly IBus _bus;

        public GroupController(
            IService<Group> groupService,
            IService<UserInfo> userInfoService,
            IService<Post> postService,
            IPostDataService postDataService,
            IGroupDataService groupDataService,
            IUserInfoDataService userInfoDataService,
            ILoggerFactory loggerFactory,
            IMapper mapper,
            IBus bus
            )
        {
            _groupService = groupService;
            _userInfoService=userInfoService;
            _postService = postService;
            _postDataService = postDataService;
            _groupDataService = groupDataService;
            _userInfoDataService = userInfoDataService;
            _logger = loggerFactory.CreateLogger<GroupController>();
            _mapper=mapper;
            _bus = bus;
        }
        /// <summary>
        /// Get Group Information With some Posts.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /Group/:urlKey
        ///     {
        ///        "urlKey": "hats",
        ///     }
        ///
        /// </remarks>
        /// <param name="item"></param>
        /// <returns>A Group With Some Posts</returns>
        /// <response code="201">Returns the group</response>
        /// <response code="400">If the item is null</response>   
        
        [HttpGet("[action]")]
        public IActionResult GetGroupIndex([FromQuery]PaginatedGroupUrlkeyModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            // Get group with followers
            GroupIndexReturn ret = _groupDataService.GetGroupIndex(model.Urlkey, idClaim?.Value, model.PageIndex, model.PageSize, model.Order);
            if(ret.Group == null)
            {
                return NotFound();
            }
            
            return Ok(ret);
        }
        [HttpGet("[action]")]
        public IActionResult GetGroupPosts([FromQuery]PaginatedGroupUrlkeyModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            // Get group with followers
            PaginatedPostCardReturn ret = _groupDataService.GetGroupPosts(model.Urlkey, idClaim?.Value, model.PageIndex, model.PageSize, model.Order);

            return Ok(ret);
        }

        [HttpGet("[action]")]
        public IActionResult GetGroupUnreviewedPosts([FromQuery]PaginatedGroupUrlkeyModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            // Get group with followers
            PaginatedPostCardReturn ret = _groupDataService.GeUnreviewedPosts(model.Urlkey, idClaim?.Value,model.PageIndex,model.PageSize,model.Order);
            
            return Ok(ret);
        }
        [HttpGet("[action]")]
        public IActionResult GetTrendingPosts([FromQuery]PaginatedGroupUrlkeyModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            // Get group with followers
            PaginatedPostCardReturn ret = _groupDataService.GetTrendingPosts(model.Urlkey, idClaim?.Value, model.PageIndex, model.PageSize, model.Order);

            return Ok(ret);
        }
        [HttpGet("[action]")]
        public IActionResult GetGroupUsers([FromQuery]PaginatedGroupUrlkeyModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = HttpContext.User;
            Claim idClaim = User.FindFirst("sub");
            // Get group with followers
            UserFollowUsersReturn ret = _groupDataService.GetGroupUsers(model.Urlkey, idClaim?.Value, model.PageIndex, model.PageSize, model.Order);

            return Ok(ret);
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult Join([FromBody]GroupIdModel model)
        {
            var user = HttpContext.User;
            FollowGroupReturn ret = new FollowGroupReturn();
            // try
            // {               
                Claim idClaim =  User.FindFirst("sub");
                string userId = idClaim.Value;
                ret = _userInfoDataService.FollowGroup(userId, model.GroupId);

                if(ret.IsActionSucceed && ret.LastFollowState == GroupFollowState.Followed)
                {
                    _bus.Publish<UserFollowedGroupAction>(new UserFollowedGroupAction()
                    {
                        DateUtcAction = DateTime.UtcNow,
                        GroupId = model.GroupId,
                        UserId = userId,
                    });
                }
                return Ok(Json(ret));
            // }
            // catch (Exception ex)
            // {
            //     ret.ErrorInformation.ErrorType = ErrorType.NoAction;
            //     ret.ErrorInformation.UserInformation = ex.Message;          
            //     ret.IsActionSucceed = false;
            //     return Ok(Json(ret));                
            // }            
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult Leave([FromBody]GroupIdModel model)
        {
            var user = HttpContext.User;
            FollowGroupReturn ret = new FollowGroupReturn();
            try
            {
                Claim idClaim = User.FindFirst("sub");
                string userId = idClaim.Value;
                ret = _userInfoDataService.UnfollowGroup(userId, model.GroupId);

                if (ret.IsActionSucceed || ret.LastFollowState == GroupFollowState.Unfollowed)
                {
                    _bus.Publish<UserUnfollowedGroupAction>(new UserUnfollowedGroupAction()
                    {
                        DateUtcAction = DateTime.UtcNow,
                        GroupId = model.GroupId,
                        UserId = userId
                    });
                }
                return Ok(Json(ret));
            }
            catch (Exception ex)
            {
                ret.ErrorInformation.ErrorType = ErrorType.NoAction;
                ret.ErrorInformation.UserInformation = ex.Message;
                ret.IsActionSucceed = false;
                return Ok(Json(ret));
            }
        }

        

        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult AddG([FromBody]GroupAddModel model)
        {
            GroupAddReturn ret = new GroupAddReturn();
            try
            {
                if (!ModelState.IsValid)
                {
                    ret.ErrorInformation.UserInformation = "An error has occured";
                    return Ok(Json(ret));
                }
                if (_groupDataService.IsUrlKeyAlreadyExist(model.Urlkey))
                {
                    ret.ErrorInformation.UserInformation = "There is already a group with id " + model.Urlkey;
                    return Ok(Json(ret));
                }
                Group groupToAdd = new Group()
                {
                    DateUtcAdd = DateTime.Now,
                    DateUtcModified = DateTime.Now,
                    Description = model.Description,
                    Name = model.Name,
                    UrlKey = model.Urlkey
                };
                _groupService.Add(groupToAdd);
                ret.IsActionSucceed = true;
                ret.SuccessInformation = new SuccessReturnInformation()
                {
                    RedirectUrl = "group/" + model.Urlkey,
                    SuccessType = SuccessType.Redirect,
                    UserInformation = "The new group is added",

                };
                return Ok(Json(ret));
            }
            catch (Exception ex)
            {
                ret.ErrorInformation.UserInformation = "An error has occured -> "+ex.Message;
                return Ok(Json(ret));
            }
            

        }


        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult IsUrlKeyExist([FromBody] GroupUrlKeyModel model)
        {
            GroupIsValidUrlKeyReturn ret = new GroupIsValidUrlKeyReturn();
            ret.IsActionSucceed = true;
            ret.IsExist = _groupDataService.IsUrlKeyAlreadyExist(model.UrlKey);
            return Ok(Json(ret));
        }
    }
}
