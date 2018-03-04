using fso.Caching.CachingServices;
using fso.Core.Domains;
using fso.Core.Domains.MMEntities;
using fso.DataExtensions.DataServices;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fso.Data.EntityRepositories
{
    public class UserLikesDataService : IUserLikesDataService
    {
        private readonly IEntityContext _context;
        private DbSet<CommentUser> _commentUserDbSet;
        private DbSet<UserReview> _reviewUserDbSet;
        private DbSet<UserPostLike> _postUserDbSet;
        private DbSet<UserGroup> _groupUserDbSet;
        private DbSet<FollowInfo> _followDbSet;

        public UserLikesDataService(IEntityContext context, IUserLikeCacheService userLikesCacheService)
        {
            _context = context;
            _commentUserDbSet = _context.SetChild<CommentUser>();
            _reviewUserDbSet = _context.SetChild<UserReview>();
            _postUserDbSet = _context.SetChild<UserPostLike>();
            _groupUserDbSet = _context.SetChild<UserGroup>();
            _followDbSet = _context.SetChild<FollowInfo>();
        }
        public int[] GetUserLikedCommentsIds(string appUserId)
        {
            return _commentUserDbSet.Where(p => p.UserInfoId == appUserId && p.LikeStatus == LikeStatus.Like).Select(p => p.CommentId.Value).ToArray();
        }

        public Task<int[]> GetUserLikedCommentsIdsAsync(string appUserId)
        {
            return _commentUserDbSet.Where(p => p.UserInfoId == appUserId && p.LikeStatus == LikeStatus.Like).Select(p => p.CommentId.Value).ToArrayAsync();
        }

        public int[] GetUserLikedReviewsIds(string appUserId)
        {
            return _reviewUserDbSet.Where(p => p.UserInfoId == appUserId && p.LikeStatus == LikeStatus.Like).Select(p => p.ReviewId).ToArray();
        }

        public Task<int[]> GetUserLikedReviewsIdsAsync(string appUserId)
        {
            return _reviewUserDbSet.Where(p => p.UserInfoId == appUserId && p.LikeStatus == LikeStatus.Like).Select(p => p.ReviewId).ToArrayAsync();
        }

        public int[] GetUserDisikedCommentsIds(string appUserId)
        {
            return _commentUserDbSet.Where(p => p.UserInfoId == appUserId && p.LikeStatus == LikeStatus.Dislike).Select(p => p.CommentId.Value).ToArray();
        }

        public Task<int[]> GetUserDisikedCommentsIdsAsync(string appUserId)
        {
            return _commentUserDbSet.Where(p => p.UserInfoId == appUserId && p.LikeStatus == LikeStatus.Dislike).Select(p => p.CommentId.Value).ToArrayAsync();
        }

        public int[] GetUserDisikedReviewsIds(string appUserId)
        {
            return _reviewUserDbSet.Where(p => p.UserInfoId == appUserId && p.LikeStatus == LikeStatus.Dislike).Select(p => p.ReviewId).ToArray();
        }

        public Task<int[]> GetUserDisikedReviewsIdsAsync(string appUserId)
        {
            return _reviewUserDbSet.Where(p => p.UserInfoId == appUserId && p.LikeStatus == LikeStatus.Dislike).Select(p => p.ReviewId).ToArrayAsync();
        }

        public int[] GetUserLikedPostsIds(string appUserId)
        {
            return _postUserDbSet.Where(p => p.UserInfoId == appUserId).OrderByDescending(p=>p.DateUtcLiked).Select(p => p.PostId).ToArray();
        }

        public Task<int[]> GetUserLikedPostsIdsAsync(string appUserId)
        {
            return _postUserDbSet.Where(p => p.UserInfoId == appUserId).OrderByDescending(p => p.DateUtcLiked).Select(p => p.PostId).ToArrayAsync();
        }

        public int[] GetUserFollowingGroups(string appUserId, int cacheTreshold)
        {
            return  _groupUserDbSet.Where(p => p.UserId == appUserId && p.GroupFollowState == GroupFollowState.Followed)
                    .OrderByDescending(p=>p.DateUtcFollowed)
                    .Select(p=>p.GroupId).ToArray();
            
        }

        public Task<int[]> GetUserFollowingGroupsAsync(string appUserId, int cacheTreshold)
        {
            return   _groupUserDbSet.Where(p => p.UserId == appUserId && p.GroupFollowState == GroupFollowState.Followed)
                        .Select(p => p.GroupId).ToArrayAsync();
        }

        public Dictionary<string, FollowState> GetFollowingUserIds(string userId)
        {
            return _followDbSet.AsNoTracking()
                    .Where(p => p.FollowerId == userId && p.FollowState == FollowState.Confirmed)
                        .Select(f => new { f.FollowedId, f.FollowState }).ToDictionary(p => p.FollowedId, p => p.FollowState);
        }

        public int? GetUserFollowingCount(string appUserId)
        {
            return _followDbSet.AsNoTracking()
                .Where(p => p.FollowerId == appUserId && p.FollowState == FollowState.Confirmed).Count();
        }
    }
}
