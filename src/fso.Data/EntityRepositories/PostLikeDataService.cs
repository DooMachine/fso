using fso.Core.Domains.MMEntities;
using fso.DataExtensions.DataServices;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace fso.Data.EntityRepositories
{
    public class PostLikeDataService: IPostLikeDataService
    {
        private readonly IEntityContext _context;
        private readonly DbSet<UserPostLike> _dbEntitySet;
        public PostLikeDataService(
            IEntityContext context
            )
        {
            _context = context;
            _dbEntitySet = _context.SetChild<UserPostLike>();
        }
       
        public IQueryable<UserPostLike> GetPostLikesWithPostKey(int postId)
        {
            return _dbEntitySet.AsNoTracking().
               Where(p => p.PostId == postId);
        }

        public IQueryable<UserPostLike> GetPostLikesWithUserKey(string currUserId)
        {
            return _dbEntitySet.AsNoTracking().
               Where(p => p.UserInfoId == currUserId);
        }

        public UserPostLike GetPostLikeIfExist(int postId,string currUserId)
        {
            return _dbEntitySet.AsNoTracking()
                .FirstOrDefault(p => p.UserInfoId == currUserId && p.PostId == postId);
        }
    }
}
