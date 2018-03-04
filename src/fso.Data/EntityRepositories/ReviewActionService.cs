using fso.Core.Domains.MMEntities;
using fso.DataExtensions.DataServices;
using Microsoft.EntityFrameworkCore;
using System;
using fso.DataExtensions.Models.Review;
using System.Linq;
using fso.Caching.CachingServices;
using fso.Core.Domains;
using System.Collections.Generic;
using fso.DataExtensions.Models;
using Microsoft.Extensions.Options;
using fso.Settings.Image;
using fso.Core.Settings;
using fso.Data.Extensions;

namespace fso.Data.EntityRepositories
{
    public class ReviewActionService : IReviewActionService
    {
        private readonly IEntityContext _context;
        private readonly IUserLikeCacheService _userLikeCacheService;
        private readonly IUserLikesDataService _userLikeDataService;
        private readonly IPostCacheService _postCacheService;
        private readonly IUserInfoCacheService _userCacheService;
        private readonly DbSet<UserReview> _dbEntitySet;
        private readonly DbSet<Review> _reviewSet;
        private readonly DbSet<ReputationGain> _reputationSet;
        private readonly DbSet<Post> _postSet;
        private readonly UserProfileImageSettings _userProfileImageSettings;
        private readonly ReputationSettings _reputationSettings;
        int[] prevLikedReviews = { };
        int[] prevDislikedReviews = { };

        public ReviewActionService(
            IEntityContext context,
            IUserLikeCacheService userLikeCacheService,
            IUserInfoCacheService userCacheService,
            IPostCacheService postCacheService,            
            IUserLikesDataService userLikeDataService,
            IOptions<UserProfileImageSettings> userImageSettings,
            IOptions<ReputationSettings> reputationSettings
            )
        {
            _context = context;
            _userLikeCacheService = userLikeCacheService;
            _postCacheService = postCacheService;
            _userLikeDataService = userLikeDataService;
            _userCacheService = userCacheService;
            _userProfileImageSettings = userImageSettings.Value;
            _dbEntitySet = _context.SetChild<UserReview>();
            _reviewSet = _context.Set<Review>();
            _postSet = _context.Set<Post>();
            _reputationSet = _context.Set<ReputationGain>();
            _reputationSettings = reputationSettings.Value;


        }
        /// <summary>
        ///  Add review to post
        /// </summary>
        /// <param name="postId">PostId</param>
        /// <param name="rating">Assigned Review Rate</param>
        /// <param name="content">Content of review</param>
        /// <param name="currUserId">Current User Id from Claims</param>
        /// <returns> AddReviewReturnModel which contains information needed for return to user and publish to eventbus</returns>
        public AddReviewReturnModel AddReview(int postId, double rating, string content, string currUserId, string currUsername)
        {
            AddReviewReturnModel ret = new AddReviewReturnModel();
            Post post = _postSet.Include(p=>p.Reviews).FirstOrDefault(p => p.Id == postId);
            UserInfo reviewer = _context.Set<UserInfo>().FirstOrDefault(p => p.AppUserId == currUserId);
            UserInfo reviewed = _context.Set<UserInfo>().FirstOrDefault(p => p.AppUserId == post.UserInfoId);
            if (post.UserInfoId == currUserId)
            {
                ret.IsActionSucceed = false;
                ret.ErrorInformation.UserInformation = "You cannot review your own post";
                //TODO: UNCOMMENT THIS LINE return ret;
            }
            bool isPreReviewed = _reviewSet.Any(p => p.PostId == postId && p.UserId == currUserId);

            // Check if user already reviewed this post
            // TODO: remove !isPreReviewed
            if (isPreReviewed && !isPreReviewed)
            {
                ret.IsActionSucceed = false;
                ret.ErrorInformation.UserInformation = "You can only have one review each post";
                return ret;
            }
            var reviewerReputation = GetUserReputation(reviewer.AppUserId, int.MaxValue);
            Review newReview = new Review()
            {
                Content = TagHelpers.RemoveUnwantedTags(content),
                DateUtcPublished = DateTime.UtcNow,
                PostId = postId,
                UserId = currUserId,
                PostRate = rating,
                UserReputation = reviewerReputation
            };
            _reviewSet.Add(newReview);
            if (_context.SaveChanges() != 0)
            {
                // Reputation for adding review
                ReputationGain rg = new ReputationGain()
                {
                    DateUtcAdd = DateTime.UtcNow,
                    DateUtcModified = DateTime.UtcNow,
                    GainedReputationValue = _reputationSettings.InitialReviewReputationValue,
                    UserInfoId = currUserId,
                    PostId = postId,
                    ReviewId = newReview.Id,
                };
                // Reputatin gain of post owner
                ReputationGain rgofPost = new ReputationGain()
                {
                    DateUtcAdd = DateTime.UtcNow,
                    DateUtcModified = DateTime.UtcNow,
                    GainedReputationValue = rating,
                    UserInfoId = post.UserInfoId,
                    PostId = postId,
                    ReviewId = newReview.Id,
                };
                _reputationSet.Add(rg);
                _reputationSet.Add(rgofPost);
                
                _postSet.Update(post);
                ret.PostAuthorId = post.UserInfoId;
                // Remove post rate to calculate when needed
                _postCacheService.RemovePostRateCache(post.Id);
                _context.SaveChanges();
                ret.IsActionSucceed = true;               
                ret.Review = new ReviewActivityEntity()
                {
                    DateUtcPublished = newReview.DateUtcPublished,
                    DislikeCount = 0,
                    Id = newReview.Id,
                    Content = newReview.Content,
                    LikeCount = 0,                    
                    PostId = newReview.PostId.Value,
                    PostRate = newReview.PostRate.Value,
                    CommentCount = 0,
                    LikeStatus = LikeStatus.None,
                    AuthorInfo = new BaseUserInfoDisplay()
                    {
                        AppUserId = currUserId,
                        ProfileImage = _userProfileImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", currUserId),
                        Username = currUsername
                    }                    
                };
                
                return ret;
            }
            ret.IsActionSucceed = false;
            return ret;
        }


        public ReviewLikeResult LikeReview( string currUserId, int reviewId = -1)
        {
            GetUserLikes(currUserId);
            ReviewLikeResult ret = new ReviewLikeResult
            {
                IsActionSucceed = true
            };
            ret.SuccessInformation.SuccessType = SuccessType.NoAction;
            if (reviewId ==-1 || string.IsNullOrEmpty(currUserId))
            {
                ret.IsActionSucceed = false;
                ret.SuccessInformation.SuccessType = SuccessType.NoAction;
                return ret;
            }
            UserReview rlike =  _dbEntitySet.FirstOrDefault(p => p.ReviewId == reviewId && p.UserInfoId == currUserId);
            var rev = _reviewSet.Select(p => new { p.Id, p.UserId,p.PostId }).FirstOrDefault(p => p.Id == reviewId);
            ret.ReviewAuthorId = rev.UserId;
            ret.PostId = rev.PostId ?? 0;
            if (rlike==null)
            {
                 _dbEntitySet.Add(new UserReview()
                {
                    LikeStatus = LikeStatus.Like,
                    ReviewId = reviewId,
                    UserInfoId = currUserId
                });
                ret.LikeStatus = LikeStatus.Like;
            }
            else if (rlike.LikeStatus == LikeStatus.Dislike || rlike.LikeStatus == LikeStatus.None)
            {
                rlike.LikeStatus = LikeStatus.Like;
                ret.LikeStatus = LikeStatus.Like;
                _context.SetChildAsModified(rlike);
            }
            else
            {
                ret.IsActionSucceed = false;
                return ret;
            }
            if (_context.SaveChanges() != 0)
            {
                prevDislikedReviews = prevDislikedReviews.Where(val => val != reviewId).ToArray();
                prevLikedReviews = prevLikedReviews.Append(reviewId).Distinct().ToArray();

                _userLikeCacheService.SetUserLikedReviewsIds(currUserId, prevLikedReviews, 10);
                _userLikeCacheService.SetUserDisikedReviewsIds(currUserId, prevDislikedReviews, 10);
            };
            return ret;
        }

        public ReviewLikeResult UnlikeReview(string currUserId, int reviewId=-1)
        {
            GetUserLikes(currUserId);
            ReviewLikeResult ret = new ReviewLikeResult
            {
                IsActionSucceed = true,
                LikeStatus = LikeStatus.Like
        };
            ret.SuccessInformation.SuccessType = SuccessType.NoAction;
            if (reviewId == -1 || string.IsNullOrEmpty(currUserId))
            {
                ret.IsActionSucceed = false;
                ret.ErrorInformation.ErrorType = ErrorType.NoAction;
                return ret;
            }
            UserReview rlike = _dbEntitySet.FirstOrDefault(p => p.ReviewId == reviewId && p.UserInfoId == currUserId);
            var rev = _reviewSet.Select(p => new { p.Id, p.UserId, p.PostId }).FirstOrDefault(p => p.Id == reviewId);
            ret.ReviewAuthorId = rev.UserId;
            ret.PostId = rev.PostId??0;
            if (rlike == null)
            {
                ret.IsActionSucceed = false;
                ret.LikeStatus = LikeStatus.None;
            }
            else
            {
                rlike.LikeStatus = LikeStatus.None;
                ret.LikeStatus = LikeStatus.None;
                _context.SetChildAsModified(rlike);
                
            }
            if (_context.SaveChanges() != 0)
            {
                prevLikedReviews = prevLikedReviews.Where(val => val != reviewId).ToArray();
                _userLikeCacheService.SetUserLikedReviewsIds(currUserId, prevLikedReviews, 10);
            };
            return ret;
        }

        public ReviewLikeResult DislikeReview( string currUserId, int reviewId = -1)
        {
            GetUserLikes(currUserId);
            ReviewLikeResult ret = new ReviewLikeResult
            {
                IsActionSucceed = true
            };
            ret.SuccessInformation.SuccessType = SuccessType.NoAction;
            if (reviewId == -1 || string.IsNullOrEmpty(currUserId))
            {
                ret.IsActionSucceed = false;
                ret.SuccessInformation.SuccessType = SuccessType.NoAction;
                return ret;
            }
            UserReview rlike = _dbEntitySet.FirstOrDefault(p => p.ReviewId == reviewId && p.UserInfoId == currUserId);
            if (rlike == null)
            {
                _dbEntitySet.Add(new UserReview()
                {
                    LikeStatus = LikeStatus.Dislike,
                    ReviewId = reviewId,
                    UserInfoId = currUserId
                });
                ret.LikeStatus = LikeStatus.Dislike;
            }
            else if (rlike.LikeStatus == LikeStatus.Like || rlike.LikeStatus == LikeStatus.None)
            {
                rlike.LikeStatus = LikeStatus.Dislike;
                ret.LikeStatus = LikeStatus.Dislike;
                _context.SetChildAsModified(rlike);
            }
            else
            {
                ret.IsActionSucceed = false;

            }
            if (_context.SaveChanges() != 0)
            {

                prevLikedReviews =  prevLikedReviews.Where(val => val != reviewId).ToArray();
                prevDislikedReviews = prevDislikedReviews.Append(reviewId).Distinct().ToArray();

                _userLikeCacheService.SetUserLikedReviewsIds(currUserId, prevLikedReviews, 10);
                _userLikeCacheService.SetUserDisikedReviewsIds(currUserId, prevDislikedReviews, 10);
            };
            return ret;
        }
        public ReviewLikeResult UndislikeReview(string currUserId, int reviewId = -1)
        {
            GetUserLikes(currUserId);
            ReviewLikeResult ret = new ReviewLikeResult
            {
                IsActionSucceed = true
            };
            ret.SuccessInformation.SuccessType = DataExtensions.Models.SuccessType.NoAction;
            if (reviewId == -1 || string.IsNullOrEmpty(currUserId))
            {
                ret.IsActionSucceed = false;
                ret.ErrorInformation.ErrorType = DataExtensions.Models.ErrorType.NoAction;
                return ret;
            }
            UserReview rlike = _dbEntitySet.FirstOrDefault(p => p.ReviewId == reviewId && p.UserInfoId == currUserId && p.LikeStatus == LikeStatus.Dislike);
            if (rlike == null)
            {
                ret.IsActionSucceed = false;
                return ret;
            }
            else
            {
                rlike.LikeStatus = LikeStatus.None;
                ret.LikeStatus = LikeStatus.None;
                _context.SetChildAsDeleted(rlike);
                
            }
            if (_context.SaveChanges() != 0)
            {

                prevDislikedReviews = prevDislikedReviews.Where(val => val != reviewId).ToArray();
                
                _userLikeCacheService.SetUserDisikedReviewsIds(currUserId, prevDislikedReviews, 10);
            };
            return ret;
        }

        private void GetUserLikes(string currUserId)
        {
            prevLikedReviews = _userLikeCacheService.GetUserLikedReviewsIds(currUserId) ?? _userLikeDataService.GetUserLikedReviewsIds(currUserId);
            prevDislikedReviews = _userLikeCacheService.GetUserDisikedReviewsIds(currUserId) ?? _userLikeDataService.GetUserDisikedReviewsIds(currUserId);
        }
        private double GetUserReputation(string appUserId, int cacheTreshold)
        {
            var allRepSum = _context.Set<ReputationGain>().Where(p => p.UserInfoId == appUserId).Sum(p => p.GainedReputationValue);
            double userReputationSum = allRepSum;
            if (userReputationSum >= cacheTreshold)
            {
                _userCacheService.SetUserReputation(appUserId, userReputationSum, 60);
            }
            return userReputationSum;
        }
    }
}
