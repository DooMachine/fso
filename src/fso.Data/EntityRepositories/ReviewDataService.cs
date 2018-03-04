using fso.Core.Domains;
using fso.DataExtensions.DataServices;
using Microsoft.EntityFrameworkCore;
using fso.DataExtensions.Models;
using System.Linq;
using fso.Core.Domains.MMEntities;
using fso.Core.Domains.Helpers;
using fso.Core.Extensions;
using fso.DataExtensions.Models.UserInfo;
using fso.DataExtensions.Models.Review;
using System.Collections.Generic;
using fso.Caching.CachingServices;
using fso.DataExtensions.Models.Comment;

namespace fso.Data.EntityRepositories
{
    public class ReviewDataService : IReviewDataService
    {
        private readonly IEntityContext _context;
        private readonly IReviewCacheService _reviewCacheService;
        private readonly IUserLikeCacheService _userLikeCacheService;
        private readonly IUserLikesDataService _userLikeDataService;
        private readonly ICommentCacheService _commentCacheService;
        private readonly ICommentDataService _commentDataService;
        private DbSet<Review> _dbEntitySet;
        private DbSet<UserInfo> _userEntitySet;
        private DbSet<UserReview> _userReviewLikeSet;
        private DbSet<Comment> _commentSet;

        int[] userReviewLikesIds;
        int[] userCommentLikesIds;
        int[] userReviewDislikesIds;
        int[] userCommentDislikesIds;

        public ReviewDataService(
            IEntityContext context,
            IReviewCacheService reviewCacheService,
            IUserLikeCacheService userLikeCacheService,
            ICommentCacheService commentCacheService,
            ICommentDataService commentDataService,
            IUserLikesDataService userLikeDataService
            )
        {
            _context = context;
            _dbEntitySet = _context.Set<Review>();
            _userEntitySet = _context.Set<UserInfo>();
            _userReviewLikeSet = _context.SetChild<UserReview>();
            _commentSet = _context.Set<Comment>();
            _reviewCacheService = reviewCacheService;
            _userLikeCacheService = userLikeCacheService;
            _commentCacheService = commentCacheService;
            _commentDataService = commentDataService;
            _userLikeDataService = userLikeDataService;
        }

        public PaginatedList<PostReviewDisplay> GetPostReviews(int postId, int reviewPageIndex, int reviewPageSize, string currUserId, string order = "publishDate")
        {
            PaginatedList<PostReviewDisplay> ret = new PaginatedList<PostReviewDisplay>();
            // TODO : "best" OPTION IS NOT WORKING (ToList() Throws Exception)
            if (order == "best")
            {
                var asd = _dbEntitySet.AsNoTracking()
               .Where(p => p.PostId == postId && p.IsPublished)
               .Include(p => p.UserLikes)
               .Select(p => new { DbEntity = p, LikeCount = p.UserLikes.Where(f => f.LikeStatus == LikeStatus.Like).Count(), DislikeCount = p.UserLikes.Where(f => f.LikeStatus == LikeStatus.Dislike).Count() })
               .OrderByDescending(p => p.LikeCount - p.DislikeCount)
               .Skip((reviewPageIndex - 1) * reviewPageSize)
               .Take(reviewPageSize)
               .Select(p => new PostReviewDisplay()
               {
                   CommentCount = p.DbEntity.Comments.Count(),
                   DislikeCount = p.DislikeCount,
                   LikeCount = p.LikeCount,
                   IsCurrentUserDisliked = p.DbEntity.UserLikes.Any(w => w.UserInfoId == currUserId && w.LikeStatus == LikeStatus.Dislike),
                   IsCurrentUserLiked = p.DbEntity.UserLikes.Any(w => w.UserInfoId == currUserId && w.LikeStatus == LikeStatus.Like),

                   Content = p.DbEntity.Content,
                   Id = p.DbEntity.Id,
                   UserInfo = new UserInfoExtraSmall()
                   {
                       AppUserId = p.DbEntity.UserInfo.AppUserId,
                       UserName = p.DbEntity.UserInfo.UName,
                       ProfileImage = p.DbEntity.UserInfo.ProfilePicture.SmallPath
                   }
               });
               return asd.ToPaginatedList(reviewPageIndex, reviewPageSize, _dbEntitySet.Where(p => p.PostId == postId && p.IsPublished).Count());
            }
            else if(order=="publishDate")
            {
                ret = _dbEntitySet.AsNoTracking()
               .Where(p => p.PostId == postId && p.IsPublished)
               .Include(p => p.UserLikes)
               .OrderByDescending(p=>p.DateUtcPublished)
               .Skip((reviewPageIndex - 1) * reviewPageSize)
               .Take(reviewPageSize)
               .Select(p => new PostReviewDisplay()
               {
                   CommentCount = p.Comments.Count(),
                   DislikeCount = p.UserLikes.Where(q => q.LikeStatus == LikeStatus.Dislike).Count(),
                   LikeCount = p.UserLikes.Where(q => q.LikeStatus == LikeStatus.Like).Count(),

                   IsCurrentUserDisliked = p.UserLikes.Any(w => w.LikeStatus == LikeStatus.Dislike && w.UserInfoId == currUserId),
                   IsCurrentUserLiked = p.UserLikes.Any(w => w.LikeStatus == LikeStatus.Like && w.UserInfoId == currUserId),

                   Content = p.Content,
                   Id = p.Id,
                   UserInfo = new UserInfoExtraSmall()
                   {
                       AppUserId = p.UserInfo.AppUserId,
                       UserName = p.UserInfo.UName,
                       ProfileImage = p.UserInfo.ProfilePicture.SmallPath
                   }
               })
               .ToPaginatedList(reviewPageIndex, reviewPageSize, _dbEntitySet.Where(p => p.PostId == postId && p.IsPublished).Count());
            }
            return ret;
                
        }
        public PaginatedList<PostReviewDisplay> GetPostReviews(int postId, int reviewPageIndex, int reviewPageSize, string order = "publishDate")
        {
            PaginatedList<PostReviewDisplay> ret = new PaginatedList<PostReviewDisplay>();
            if (order == "best")
            {
                IQueryable<PostReviewDisplay> reviews = _dbEntitySet.AsNoTracking()
               .Where(p => p.PostId == postId && p.IsPublished)
               .Include(p => p.UserLikes)
               .OrderByDescending(p => p.UserLikes.Select(f => f.LikeStatus == LikeStatus.Like).Count() - p.UserLikes.Select(f => f.LikeStatus == LikeStatus.Dislike).Count())
               .Skip((reviewPageIndex - 1) * reviewPageSize)
               .Take(reviewPageSize)
               .Select(p => new PostReviewDisplay()
               {
                   CommentCount = p.Comments.Count(),
                   DislikeCount = p.UserLikes.Where(q => q.LikeStatus == LikeStatus.Dislike).Count(),
                   LikeCount = p.UserLikes.Where(q => q.LikeStatus == LikeStatus.Like).Count(),
                   IsCurrentUserDisliked = false,
                   IsCurrentUserLiked = false,

                   Content = p.Content,
                   Id = p.Id,
                   UserInfo = new UserInfoExtraSmall()
                   {
                       AppUserId = p.UserInfo.AppUserId,
                       UserName = p.UserInfo.UName,
                       ProfileImage = p.UserInfo.ProfilePicture.SmallPath
                   }
               });

               ret = reviews.ToPaginatedList(reviewPageIndex, reviewPageSize, _dbEntitySet.Where(p => p.PostId == postId && p.IsPublished).Count());
            }
            else if (order == "publishDate")
            {
                IQueryable<PostReviewDisplay> reviews = _dbEntitySet.AsNoTracking()
               .Where(p => p.PostId == postId && p.IsPublished)
               .Include(p => p.UserLikes)
               .OrderByDescending(p => p.DateUtcPublished)
               .Skip((reviewPageIndex - 1) * reviewPageSize)
               .Take(reviewPageSize)
               .Select(p => new PostReviewDisplay()
               {
                   CommentCount = p.Comments.Count(),
                   DislikeCount = p.UserLikes.Where(q => q.LikeStatus == LikeStatus.Dislike).Count(),
                   LikeCount = p.UserLikes.Where(q => q.LikeStatus == LikeStatus.Like).Count(),
                   Content = p.Content,
                   IsCurrentUserDisliked = false,
                   IsCurrentUserLiked = false,
                   Id = p.Id,
                   UserInfo = new UserInfoExtraSmall()
                   {
                       AppUserId = p.UserInfo.AppUserId,
                       UserName = p.UserInfo.UName,
                       ProfileImage = p.UserInfo.ProfilePicture.SmallPath
                   }
               });

               ret = reviews.ToPaginatedList(reviewPageIndex, reviewPageSize, _dbEntitySet.Where(p => p.PostId == postId && p.IsPublished).Count());

            }
            return ret;

        }

        
         
        /// <summary>
        /// Get Review Like Count 
        /// </summary>
        /// <param name="reviewId">Review Id</param>
        /// <param name="cacheTreshold">Cache Treshold *** If Count is bigger then treshold set cache</param>
        /// <returns></returns>
        public int GetReviewLikeCount(int reviewId, int cacheTreshold)
        {
            int likeCount = _userReviewLikeSet.AsNoTracking().Where(p => p.ReviewId == reviewId && p.LikeStatus == LikeStatus.Like).Count();
            if( likeCount >= cacheTreshold)
            {
                _reviewCacheService.SetReviewLikeCount(reviewId, likeCount, 60);
            }
            return likeCount;
        }
        public int GetReviewDislikeCount(int reviewId, int cacheTreshold)
        {
            int dislikeCount = _userReviewLikeSet.AsNoTracking().Where(p => p.ReviewId == reviewId && p.LikeStatus == LikeStatus.Dislike).Count();
            if (dislikeCount >=cacheTreshold)
            {
                _reviewCacheService.SetReviewDislikeCount(reviewId, dislikeCount, 60);
            }
            return dislikeCount;
        }
        public int GetReviewCommentCount(int reviewId, int cacheTreshold)
        {
            int commentCount = _commentSet.AsNoTracking().Where(p => p.ReviewId == reviewId).Count();
            if (commentCount>=cacheTreshold)
            {
                _reviewCacheService.SetReviewCommentCount(reviewId, commentCount, 60);
            }
            return commentCount;
        }

        private PaginatedList<ReviewViaPost> GetReviewStats(PaginatedList<ReviewViaPost> reviews, string currUserId)
        {
            if (string.IsNullOrWhiteSpace(currUserId))
            {
                foreach (var item in reviews)
                {
                    item.LikeStatus = LikeStatus.None;
                    item.CommentCount = _reviewCacheService.GetReviewCommentCount(item.Id) ?? GetReviewCommentCount(item.Id,20);
                    item.LikeCount = _reviewCacheService.GetReviewLikeCount(item.Id) ?? GetReviewLikeCount(item.Id,300);
                    item.DislikeCount = _reviewCacheService.GetReviewDislikeCount(item.Id) ?? GetReviewDislikeCount(item.Id, 20);
                }
            }
            else
            {
                List<UserReview> currentUserLikes = _userLikeCacheService.GetUserReviewLikes(currUserId);
                foreach (var item in reviews)
                {
                    item.LikeStatus = userReviewDislikesIds == null ? LikeStatus.None: userReviewDislikesIds.Contains(item.Id) ? LikeStatus.Dislike : LikeStatus.None;
                    item.LikeStatus = userReviewLikesIds == null ? LikeStatus.None : userReviewLikesIds.Contains(item.Id) ? LikeStatus.Like : LikeStatus.None;
                    item.CommentCount = _reviewCacheService.GetReviewCommentCount(item.Id) ?? GetReviewCommentCount(item.Id, 20);
                    item.LikeCount = _reviewCacheService.GetReviewLikeCount(item.Id) ?? GetReviewLikeCount(item.Id,20);
                    item.DislikeCount = _reviewCacheService.GetReviewDislikeCount(item.Id) ?? GetReviewDislikeCount(item.Id, 20);
                }
            }            
            return reviews;
        }

        public PaginatedComments GetReviewComments(int reviewId, string currUserId)
        {
            bool isLoggedIn = !string.IsNullOrEmpty(currUserId);
            if (isLoggedIn)
            {
                GetUserLikes(currUserId);
            }
            PaginatedComments ret = new PaginatedComments();
            int totalCount = _commentSet.Count(p => p.ReviewId == reviewId);
            if (totalCount==0)
            {
                return ret;
            }
            ret.Entities = _commentSet.AsNoTracking().Select(f => new
            {
                Entity = f,
                Likes = f.CommentLikes,
                UserInfo = f.Author
            })
            .Where(p => p.Entity.ReviewId == reviewId)
            .Select(p => new ReviewCommentDTO()
            {
                DislikeCount = p.Likes.Count(f => f.LikeStatus == LikeStatus.Dislike),
                LikeStatus = !isLoggedIn ? LikeStatus.None : p.Likes.FirstOrDefault(f=> f.UserInfoId == currUserId) == null ? LikeStatus.None : p.Likes.FirstOrDefault(f => f.UserInfoId == currUserId).LikeStatus,
                Content = p.Entity.Content,
                DateUtcPublished = p.Entity.DateUtcAdd,
                Id = p.Entity.Id,
                LikeCount = p.Likes.Count(f => f.LikeStatus == LikeStatus.Like),
                ReviewId = reviewId,
                ParentCommentId = p.Entity.ParentCommentId,
                UserInfo = new UserInfoExtraSmall()
                {
                    ProfileImage = p.UserInfo.ProfilePicture.SmallPath,
                    UserName = p.UserInfo.UName,
                    AppUserId = p.Entity.AuthorId
                },
                AuthorId = p.Entity.AuthorId
            }).ToPaginatedList(100,100,totalCount);
            // if (isLoggedIn)
            // {
            //     foreach (var item in ret.Entities)
            //     {
            //         if (userCommentLikesIds.Contains(item.Id))
            //         {
            //             item.LikeStatus = LikeStatus.Like;
            //         }
            //         else if (userCommentDislikesIds.Contains(item.Id))
            //         {
            //             item.LikeStatus = LikeStatus.Dislike;
            //         }
            //         else
            //         {
            //             item.LikeStatus = LikeStatus.None;
            //         }
            //     }
            // }            
            return ret;
        }
        private void GetUserLikes(string currUserId)
        {
            // Get from cache
            userReviewLikesIds = _userLikeCacheService.GetUserLikedReviewsIds(currUserId);
            userCommentLikesIds = _userLikeCacheService.GetUserLikedCommentsIds(currUserId);
            userReviewDislikesIds = _userLikeCacheService.GetUserDisikedReviewsIds(currUserId);
            userCommentDislikesIds = _userLikeCacheService.GetUserDisikedCommentsIds(currUserId);
           
            if (userCommentLikesIds == null || userCommentLikesIds.Count() == 0)
            {
                userCommentLikesIds = _userLikeDataService.GetUserLikedCommentsIds(currUserId);
                _userLikeCacheService.SetUserLikedCommentsIds(currUserId, userCommentLikesIds, 20);
            }
            if (userReviewDislikesIds == null || userReviewDislikesIds.Count() == 0)
            {
                userReviewDislikesIds = _userLikeDataService.GetUserDisikedReviewsIds(currUserId);
                _userLikeCacheService.SetUserDisikedReviewsIds(currUserId, userReviewDislikesIds, 20);
            }
            if (userCommentDislikesIds == null || userCommentDislikesIds.Count() == 0)
            {
                userCommentDislikesIds = _userLikeDataService.GetUserDisikedCommentsIds(currUserId);
                _userLikeCacheService.SetUserDisikedCommentsIds(currUserId, userCommentDislikesIds, 20);
            }  
            
        }
    }
}
