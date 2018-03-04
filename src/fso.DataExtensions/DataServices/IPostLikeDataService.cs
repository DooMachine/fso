using fso.Core.Domains.MMEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace fso.DataExtensions.DataServices
{
    public interface IPostLikeDataService
    {
        IQueryable<UserPostLike> GetPostLikesWithPostKey(int postId);

        IQueryable<UserPostLike> GetPostLikesWithUserKey(string currUserId);

        UserPostLike GetPostLikeIfExist(int postId, string currUserId);
    }
}
