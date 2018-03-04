using fso.Core.Domains;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace fso.Data.EntityRepositories
{
    public class PostPartService : IPostPartService
    {
        private readonly IEntityContext _entityContext;
        private readonly DbSet<PostPart> _postPartSet;
        private readonly DbSet<Post> _postSet;
        public PostPartService(IEntityContext entityContext)
        {
            _entityContext = entityContext;
            _postPartSet = _entityContext.Set<PostPart>();
            _postSet = _entityContext.Set<Post>();
        }
        public AddPostPartReturnModel AddPostPart(int postId, string title, string currUserId)
        {
            AddPostPartReturnModel ret = new AddPostPartReturnModel();
            Post post = _postSet.Include(p=>p.PostParts).FirstOrDefault(p=>p.Id == postId);
            
            if (post == null)
            {
                ret.IsActionSucceed = false;
                return ret;
            }
            if ( string.IsNullOrEmpty(currUserId) || post.UserInfoId != currUserId)
            {
                ret.IsActionSucceed = false;
                return ret;
            }
            if (post.PostParts == null)
            {
                post.PostParts = new List<PostPart>();
            }
            if (post.PostParts.Count >= 4)
            {
                ret.IsActionSucceed = false;
                return ret;
            }
            PostPart newPostPart = new PostPart()
            {
                Title = title,
                Post = post
            };
            _postPartSet.Add(newPostPart);
            if (_entityContext.SaveChanges() != 0)
            {
                ret.IsActionSucceed = true;
                ret.PostPartId = newPostPart.Id;                
            };
            return ret;
        }

        public RemovePostPartReturnModel RemovePostPart(int PostPartId, string currUserId)
        {
            RemovePostPartReturnModel ret = new RemovePostPartReturnModel()
            {
                IsActionSucceed = false
            };

            if (string.IsNullOrEmpty(currUserId))
            {
                return ret;
            }

            PostPart ppart = _postPartSet.Include(p => p.Post).Include(p=>p.Image).FirstOrDefault(p => p.Id == PostPartId);
            if (ppart.Post.UserInfoId != currUserId)
            {
                return ret;
            }
            ppart.IsSoftDeleted = true;
            if (ppart.Image != null)
            {
                ret.SmallImageUrl = ppart.Image.SmallPath;
                ret.LargeImageUrl = ppart.Image.ResizedPath;
                ret.ThumbImageUrl = ppart.Image.ThumbPath;
            }

            _postPartSet.Update(ppart);
            int z = _entityContext.SaveChanges();
            if (z==0)
            {
                ret.IsActionSucceed = false;
            }
            ret.IsActionSucceed = true;
            return ret;
        }
    }
}
