using fso.Core.Domains;
using fso.Core.Domains.Helpers.Enum;
using fso.Core.Extensions;
using fso.Core.Settings;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using fso.DataExtensions.Models.Collections;
using fso.DataExtensions.Models.User;
using fso.DataExtensions.Models.UserInfo;
using fso.Settings.Image;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;

namespace fso.Data.EntityRepositories
{
    public class PostCollectionActionService : IPostCollectionActionService
    {
        private readonly IEntityContext _entityContext;
        private readonly PostCollectionSettings collectionSettings;
        private readonly UserProfileImageSettings _userImageSettings;

        public PostCollectionActionService(
            IEntityContext entityContext,
            IOptions<PostCollectionSettings> collectionOp,
            IOptions<UserProfileImageSettings> uiSettings
            )
        {
            _entityContext = entityContext;
            collectionSettings = collectionOp.Value;
            _userImageSettings = uiSettings.Value;
        }
        
        public AddCollectionReturnModel AddCollection(string name, string description, string currUserId)
        {
            AddCollectionReturnModel ret = new AddCollectionReturnModel();
            PostCollection pcol = new PostCollection()
            {
                PrivacyStatus = PrivacyStatus.All,
                DateUtcAdd = DateTime.UtcNow,
                DateUtcModified = DateTime.UtcNow,
                Description = description,
                Name = name,
                UserInfoId = currUserId,
            };
            _entityContext.Set<PostCollection>().Add(pcol);
            if (_entityContext.SaveChanges()!=0)
            {                
                ret.IsActionSucceed = true;
                var userCardInfo = _entityContext.Set<UserInfo>()
                    .AsNoTracking()
                    .Select(p => new UserInfoExtraSmall
                    {
                        AppUserId = p.AppUserId,
                        ProfileImage = p.ProfilePicture.SmallPath,
                        UserName = p.UName
                    })
                    .FirstOrDefault(p => p.AppUserId == currUserId);

                ret.Collection = new CollectionCard()
                {
                    DateUtcModified = pcol.DateUtcModified,
                    Id = pcol.Id,
                    Name = pcol.Name,
                    PostsCount = 0,
                    UserInfo = userCardInfo,
                    UserInfoId = currUserId
                };
                return ret;
            }
            ret.Errors.Add("common", "Oopss. an error occured. Please try again later");
            return ret;
        }

        public DeleteCollectionReturnModel DeleteCollection(int id, string currUserId)
        {
            DeleteCollectionReturnModel ret = new DeleteCollectionReturnModel();

            PostCollection pcol = _entityContext.Set<PostCollection>().Find(id);
            if (pcol.UserInfoId != currUserId)
            {
                ret.IsActionSucceed = false;
                return ret;
            }
            pcol.IsSoftDeleted = true;
            ret.CollectionId = pcol.Id;
            IQueryable<Post> colPosts = _entityContext.Set<Post>().Where(p=>p.CollectionId==id && p.IsPublished);
            foreach(var post in colPosts){
                post.Collection=null;                
                _entityContext.GetDbEntityEntrySafely(post).State =EntityState.Modified;                
            }
            _entityContext.GetDbEntityEntrySafely(pcol).State = EntityState.Modified;
            if (_entityContext.SaveChanges() !=0 )
            {
                ret.IsActionSucceed = true;                
                return ret;
            }
            ret.IsActionSucceed = false;
            
            return ret;
        }

        
    }
}
