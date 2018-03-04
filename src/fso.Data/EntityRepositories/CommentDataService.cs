using fso.DataExtensions.DataServices;
using System;
using System.Collections.Generic;
using System.Text;
using fso.DataExtensions.Models.Comment;
using Microsoft.EntityFrameworkCore;
using fso.Core.Domains;
using System.Linq;
using fso.DataExtensions.Models.Review;
using fso.Core.Domains.MMEntities;
using fso.DataExtensions.Models.UserInfo;
using fso.Core.Extensions;
using System.Threading.Tasks;

namespace fso.Data.EntityRepositories
{
    public class CommentDataService : ICommentDataService
    {
        private IEntityContext _context;
        private DbSet<Comment> _dbEntitySet;
        public CommentDataService(
            IEntityContext context            
            )
        {
            _context = context;
            _dbEntitySet = _context.Set<Comment>();
        }

        public int? GetCommentDislikeCount(int CommentId)
        {
            throw new NotImplementedException();
        }

        public Task<int?> GetCommentDislikeCountAsync(int CommentId)
        {
            throw new NotImplementedException();
        }

        public int? GetCommentLikeCount(int commentId)
        {
            throw new NotImplementedException();
        }

        public Task<int?> GetCommentLikeCountAsync(int commentId)
        {
            throw new NotImplementedException();
        }

        public ReviewCommentsReturnModel GetReviewComments(int reviewId, int pageIndex, int pageSize,string order, string currUserId)
        {
            ReviewCommentsReturnModel ret = new ReviewCommentsReturnModel();
            int TotalCommentCount = _dbEntitySet.AsNoTracking()
                .Where(p => p.ReviewId == reviewId).Count();

            if (TotalCommentCount<=0)
            {                
                return ret;
            }

            ret.Comments = _dbEntitySet.AsNoTracking()
                .Select(p => new { Entity=p, p.CommentLikes,p.Author})
                .Where(p => p.Entity.ReviewId == reviewId)
                .OrderByDescending(p => p.Entity.DateUtcAdd)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ReviewCommentDisplay()
                {
                    DateUtcAdd = p.Entity.DateUtcAdd,
                    DateUtcModified = p.Entity.DateUtcModified,
                    DislikeCount = p.CommentLikes.Where(f => f.LikeStatus == LikeStatus.Dislike).Count(),
                    LikeCount = p.CommentLikes.Where(f => f.LikeStatus == LikeStatus.Like).Count(),
                    IsCurrentUserDisliked = p.CommentLikes.Any(f => f.LikeStatus == LikeStatus.Dislike && f.UserInfoId == currUserId),
                    IsCurrentUserLiked = p.CommentLikes.Any(f => f.LikeStatus == LikeStatus.Like && f.UserInfoId == currUserId),
                    Content = p.Entity.Content,
                    AuthorInfo = new UserInfoExtraSmall()
                    {
                        AppUserId = p.Author.AppUserId,
                        UserName = p.Author.UName,
                        ProfileImage = p.Author.ProfilePicture.SmallPath
                    },
                    Id = p.Entity.Id,            
                }).ToPaginatedList(pageIndex, pageSize, TotalCommentCount);

                return ret;
        }

        public ReviewCommentsReturnModel GetSubComments(int commentId, int pageIndex, int pageSize, string order, string currUserId)
        {
            ReviewCommentsReturnModel ret = new ReviewCommentsReturnModel();
            int TotalCommentCount = _dbEntitySet.AsNoTracking()
                .Where(p => p.ParentCommentId == commentId).Count();

            if (TotalCommentCount <= 0)
            {
                return ret;
            }

            ret.Comments = _dbEntitySet.AsNoTracking()
                .Where(p => p.ParentCommentId == commentId)
                .OrderByDescending(p => p.DateUtcAdd)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ReviewCommentDisplay()
                {
                    DateUtcAdd = p.DateUtcAdd,
                    DateUtcModified = p.DateUtcModified,
                    DislikeCount = p.CommentLikes.Where(f => f.LikeStatus == LikeStatus.Dislike).Count(),
                    LikeCount = p.CommentLikes.Where(f => f.LikeStatus == LikeStatus.Like).Count(),
                    IsCurrentUserDisliked = p.CommentLikes.Any(f => f.LikeStatus == LikeStatus.Dislike && f.UserInfoId == currUserId),
                    IsCurrentUserLiked = p.CommentLikes.Any(f => f.LikeStatus == LikeStatus.Like && f.UserInfoId == currUserId),
                    Content = p.Content,
                    AuthorInfo = new UserInfoExtraSmall()
                    {
                        AppUserId = p.AuthorId,
                        UserName = p.Author.UName,
                        ProfileImage = p.Author.ProfilePicture.SmallPath
                    },
                    Id = p.Id
                }).ToPaginatedList(pageIndex, pageSize, TotalCommentCount);

            return ret;
        }
        
    }
}
