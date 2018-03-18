using EasyNetQ;
using fso.Api.Models.GetParameters;
using fso.Core.Domains;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using fso.EventCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace fso.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class CollectionsController : BaseAPIController
    {
        private readonly IPostCollectionActionService _collectionActionService;
        private readonly IPostCollectionDataService _collectionDataService;
        private readonly IBus _bus;
        public CollectionsController(
            IPostCollectionActionService collectionActionService,
            IPostCollectionDataService collectionDataService,
            IBus bus
            )
        {
            _collectionActionService = collectionActionService;
            _collectionDataService = collectionDataService;
            _bus = bus;
        }
        [HttpGet("[action]")]
        [Authorize(Policy = "fso.AngularUser")]
        public IActionResult GetCollection([FromQuery]CollectionIndexParameters model)
        {
            CollectionIndexReturnModel ret;

            Claim idClaim = User.FindFirst("sub");
            if (idClaim == null)
            {
                return Unauthorized();
            }
            ret = _collectionDataService.GetCollection(model.Id,model.PostPageIndex,model.PostPageSize, idClaim.Value);
            
            return Ok(ret);

        }
        [HttpPost("[action]")]
        [Authorize(Policy = "fso.AngularUser")]
        public IActionResult AddCollection([FromBody]AddCollectionParameters model)
        {
            AddCollectionReturnModel ret;

            Claim idClaim = User.FindFirst("sub");
            if(idClaim == null)
            {
                return Unauthorized();
            }
            ret = _collectionActionService.AddCollection(model.Name,model.Description, idClaim.Value);
            if (ret.IsActionSucceed)
            {
                _bus.Publish<UserAddedCollectionAction>(new UserAddedCollectionAction()
                {
                    PostCollection = new PostCollection()
                    {
                        Id = ret.Collection.Id,
                        DateUtcAdd = DateTime.UtcNow,
                        Name = ret.Collection.Name,
                        UserInfoId =ret.Collection.UserInfoId,                        
                    },
                    DateUtcAction = DateTime.UtcNow
                });
            }
            return Ok(ret);
            
        }
        [HttpPost("[action]")]
        [Authorize(Policy = "fso.AngularUser")]
        public IActionResult DeleteCollection([FromBody]IdParameter model)
        {
            DeleteCollectionReturnModel ret;

            Claim idClaim = User.FindFirst("sub");
            if (idClaim == null)
            {
                return Unauthorized();
            }
            ret = _collectionActionService.DeleteCollection(model.Id, idClaim.Value);
            if (ret.IsActionSucceed)
            {
                _bus.Publish<UserDeletedCollectionAction>(new UserDeletedCollectionAction()
                {
                    CollectionId = ret.CollectionId,
                    UserId = idClaim.Value
                });
            }
            return Ok(ret);

        }
    }
}
