using EasyNetQ;
using fso.Api.Models.GetParameters;
using fso.Caching.CachingServices;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using fso.EventCore.PostActions;
using fso.EventCore.PostPartActions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace fso.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class AddPostController : BaseAPIController
    {
        private readonly IPostDataService _postDataService;
        private readonly IPostActionService _postActionService;
        private readonly IPostPartService _postPartService;
        private readonly IGroupDataService _groupDataService;
        
        private readonly IBus _bus;
        public AddPostController(
            IPostDataService postDataService,
            IPostPartService postPartService,
            IGroupDataService groupDataService,
            IPostActionService postActionService,
            IBus bus
            )
        {
            _postDataService = postDataService;
            _postPartService = postPartService;
            _groupDataService = groupDataService;
            _postActionService = postActionService;
            _bus = bus;
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpGet("[action]")]
        public IActionResult GetPublishingPost()
        {
            Claim idClaim = User.FindFirst("sub");
            var ret = _postDataService.GetUserUnpublishedPost(idClaim.Value);
            return Ok(Json(ret));
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpGet("[action]")]
        public IActionResult GetEditingPost([FromQuery]int postId)
        {
            Claim idClaim = User.FindFirst("sub");
            var ret = _postDataService.GetEditingPost(postId,idClaim.Value);
            return Ok(ret);
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpGet("[action]")]
        public IActionResult GetAutoCompleteInterest([FromQuery]string query, int pageSize=6)
        {
            Claim idClaim = User.FindFirst("sub");
            var ret = _groupDataService.GetAutoCompleteInterest(query, pageSize);
            return Ok(Json(ret));
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult AddPostPart([FromBody] AddPostPartParameters model)
        {
            Claim idClaim = User.FindFirst("sub");
            AddPostPartReturnModel ret = _postPartService.AddPostPart(model.PostId, model.Title, idClaim.Value);
            return Ok(Json(ret));
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult RemovePostPart([FromBody] PostPartIdParameters model)
        {
            Claim idClaim = User.FindFirst("sub");
            RemovePostPartReturnModel ret = _postPartService.RemovePostPart(model.PostPartId, idClaim.Value);
            if (ret.IsActionSucceed)
            {
                // Publish to remove Image
                _bus.Publish<PostPartRemovedAction>(new PostPartRemovedAction()
                {
                    PostPartId = model.PostPartId,                    
                    DateUtcAction = DateTime.UtcNow,
                    LargeUrl = ret.LargeImageUrl,
                    SmallUrl = ret.SmallImageUrl,
                    ThumbUrl = ret.ThumbImageUrl
                });
            }
            return Ok(Json(ret));
        }

        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult PublishPost([FromBody]PublishPostParameters model)
        {
            PublishPostReturnModel ret = new PublishPostReturnModel();
            if (!ModelState.IsValid)
            {
                ret.IsActionSucceed = false;
                ret.Errors = new Dictionary<string, string>();
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var error in modelState.Errors)
                    {
                        ret.Errors.Add(error.Exception.HResult.ToString(),error.ErrorMessage);
                    }
                }
                return Ok(Json(ret));
            }
            Claim idClaim = User.FindFirst("sub");

            ret = _postActionService.PublishPost(model, idClaim.Value);
            if (ret.IsActionSucceed)
            {
                _bus.Publish<UserPublishedPostAction>(new UserPublishedPostAction()
                {
                    DateUtcAction = DateTime.UtcNow,
                    PostUrlKey = ret.PostUrlKey,
                    PostId = ret.PublishedPostId,
                    UserId = idClaim.Value
                });
            }
            return Ok(Json(ret));
        }

        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult SaveEditingPost([FromBody]SaveEditingPostParameters model)
        {
            SaveEditingPostReturnModel ret = new SaveEditingPostReturnModel();
            if (!ModelState.IsValid)
            {
                ret.IsActionSucceed = false;
                ret.Errors = new Dictionary<string, string>();
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var error in modelState.Errors)
                    {
                        ret.Errors.Add(error.Exception.HResult.ToString(),error.ErrorMessage);
                    }
                }
                return Ok(ret);
            }
            Claim idClaim = User.FindFirst("sub");
            if(idClaim==null) return Unauthorized();
            ret = _postActionService.SaveEditingPost(model, idClaim?.Value);
            
            return Ok(ret);
        }
    }
}
