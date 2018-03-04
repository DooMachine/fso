using fso.DataExtensions.DataServices;
using System;
using fso.DataExtensions.Models.Comment;
using fso.Core.Domains;
using Microsoft.EntityFrameworkCore;
using fso.Core.Domains.MMEntities;
using fso.DataExtensions.Models;
using System.Linq;
using fso.DataExtensions.Models.UserInfo;
using fso.Caching.CachingServices;
using fso.Settings.Image;
using Microsoft.Extensions.Options;
using fso.Data.Extensions;

namespace fso.Data.EntityRepositories
{
    public class CommentActionService : ICommentActionService
    {
        private readonly IEntityContext _context;
        private readonly DbSet<CommentUser> _dbEntitySet;
        private readonly DbSet<Comment> _dbSet;
        private readonly IUserLikeCacheService _userLikeCacheService;
        private readonly UserProfileImageSettings _userImageSettings;

        public CommentActionService(
            IEntityContext context,
            IUserLikeCacheService userLikeCacheService,
            IOptions<UserProfileImageSettings> userImageSettings
            )
        {
            _context = context;
            _dbEntitySet = _context.SetChild<CommentUser>();
            _dbSet = _context.Set<Comment>();
            _userLikeCacheService = userLikeCacheService;
            _userImageSettings = userImageSettings.Value;
        }
        public CommentAddReturnModel PublishComment(string content, string currUserId,int reviewId= -1)
        {
            CommentAddReturnModel ret = new CommentAddReturnModel();
            if (reviewId==-1)
            {
                ret.IsActionSucceed = false;
                return ret;
            }
            Comment comment = new Comment()
            {
                DateUtcAdd = DateTime.UtcNow,
                DateUtcModified = DateTime.UtcNow,
                ReviewId = reviewId,
                AuthorId = currUserId,
                Content = TagHelpers.RemoveUnwantedTags(content),
            };
            _dbSet.Add(comment);
            if (_context.SaveChanges()!=0)
            {
                ret.Comment = new ReviewCommentDTO
                {
                    Id = comment.Id,
                    DateUtcPublished = comment.DateUtcAdd,
                    Content = comment.Content,
                    DislikeCount = 0,
                    LikeCount = 0,
                    ReviewId = reviewId,
                    UserInfo = new UserInfoExtraSmall()
                    {
                        AppUserId = currUserId,
                        ProfileImage = _userImageSettings.UserImageUrlTemplate.Replace("{#appUserId}", currUserId)
                    },
                    LikeStatus = LikeStatus.None,
                    AuthorId = currUserId
                };
                ret.IsActionSucceed = true;
                return ret;
            }
            ret.IsActionSucceed = false;
            return ret;
        }

        public CommentLikeReturnModel DislikeComment(string currUserId,int commentId=-1)
        {
            CommentLikeReturnModel ret = new CommentLikeReturnModel();
            if (commentId == -1 || string.IsNullOrEmpty(currUserId))
            {
                ret.IsActionSucceed = false;
                ret.ErrorInformation.ErrorType = ErrorType.NoAction;
                ret.ErrorInformation.UserInformation = "An Error Occured";
                return ret;
            }
            else
            {
                CommentUser cl = _dbEntitySet.Where(p=>p.UserInfoId==currUserId && p.CommentId== commentId).FirstOrDefault();
                if (cl==null)
                {
                    _dbEntitySet.Add(new CommentUser()
                    {
                        LikeStatus = LikeStatus.Dislike,
                        CommentId = commentId,
                        UserInfoId = currUserId
                    });
                    if (_context.SaveChanges() != 0)
                    {
                        ret.LikeStatus = LikeStatus.Dislike;
                        ret.IsActionSucceed = true;
                        return ret;
                    }

                }
                else if (cl.LikeStatus == LikeStatus.Like || cl.LikeStatus==LikeStatus.None)
                {
                    cl.LikeStatus = LikeStatus.Dislike;
                    _dbEntitySet.Update(cl);
                    if (_context.SaveChanges() != 0)
                    {
                        ret.LikeStatus = LikeStatus.Dislike;
                        ret.IsActionSucceed = true;
                        return ret;
                    }
                }
                else
                {
                    ret.IsActionSucceed = false;
                    ret.LikeStatus = LikeStatus.Dislike;
                    ret.ErrorInformation.UserInformation = "Already Disliked";
                }
                
            }
            if (ret.IsActionSucceed)
            {
                int[] prevDislikedCache = _userLikeCacheService.GetUserDisikedCommentsIds(currUserId);
                if(prevDislikedCache != null)
                {
                    prevDislikedCache.Append(commentId);
                    _userLikeCacheService.SetUserDisikedCommentsIds(currUserId, prevDislikedCache, 30);
                }
                int[] prevlikedCache = _userLikeCacheService.GetUserLikedCommentsIds(currUserId);
                if (prevlikedCache != null)
                {
                    if (prevlikedCache.Contains(commentId)){
                        prevlikedCache.Prepend(commentId);
                    }
                    _userLikeCacheService.SetUserLikedCommentsIds(currUserId, prevlikedCache, 30);
                }
            }
            return ret;
        }

        public CommentLikeReturnModel LikeComment(string currUserId, int commentId = -1)
        {
            CommentLikeReturnModel ret = new CommentLikeReturnModel();
            if (commentId == -1 || string.IsNullOrEmpty(currUserId))
            {
                ret.ErrorInformation.ErrorType = ErrorType.NoAction;
                ret.ErrorInformation.UserInformation = "An Error Occured";
                return ret;
            }
            else
            {
                CommentUser cl = _dbEntitySet.Where(p => p.UserInfoId == currUserId && p.CommentId == commentId).FirstOrDefault();
                if (cl == null)
                {
                    _dbEntitySet.Add(new CommentUser()
                    {
                        LikeStatus = LikeStatus.Like,
                        CommentId = commentId,
                        UserInfoId = currUserId
                    });
                    if (_context.SaveChanges() != 0)
                    {
                        ret.LikeStatus = LikeStatus.Like;
                        ret.IsActionSucceed = true;
                        return ret;
                    }

                }
                else if (cl.LikeStatus == LikeStatus.Dislike || cl.LikeStatus == LikeStatus.None)
                {
                    cl.LikeStatus = LikeStatus.Like;                    
                    _dbEntitySet.Update(cl);
                    if (_context.SaveChanges() != 0)
                    {
                        ret.LikeStatus = LikeStatus.Like;
                        ret.IsActionSucceed = true;
                        return ret;
                    }
                }
                else
                {
                    ret.IsActionSucceed = false;
                    ret.LikeStatus = LikeStatus.Like;
                    ret.ErrorInformation.UserInformation = "Already Liked";
                }
            }
            if (ret.IsActionSucceed)
            {
                int[] prevDislikedCache = _userLikeCacheService.GetUserDisikedCommentsIds(currUserId);
                if (prevDislikedCache != null)
                {
                    if(prevDislikedCache.Contains(commentId)) prevDislikedCache.Prepend(commentId);
                    _userLikeCacheService.SetUserDisikedCommentsIds(currUserId, prevDislikedCache, 30);
                }
                int[] prevlikedCache = _userLikeCacheService.GetUserLikedCommentsIds(currUserId);
                if (prevlikedCache != null)
                {
                    prevlikedCache.Append(commentId);
                    _userLikeCacheService.SetUserLikedCommentsIds(currUserId, prevlikedCache, 30);
                }
                
            }
            return ret;
        }

        public CommentLikeReturnModel UnDislikeComment(string currUserId, int commentId = -1)
        {
            CommentLikeReturnModel ret = new CommentLikeReturnModel();
            if (commentId == -1 || string.IsNullOrEmpty(currUserId))
            {
                ret.ErrorInformation.ErrorType = ErrorType.NoAction;
                ret.ErrorInformation.UserInformation = "An Error Occured";
                return ret;
            }
            else
            {
                CommentUser cl = _dbEntitySet.Where(p => p.UserInfoId == currUserId && p.CommentId == commentId && p.LikeStatus ==LikeStatus.Dislike).FirstOrDefault();
                if (cl == null)
                {
                    ret.LikeStatus = LikeStatus.None;
                    ret.ErrorInformation.UserInformation = "Already Liked";
                }
                // ITS OK
                else if (cl.LikeStatus == LikeStatus.Dislike || cl.LikeStatus == LikeStatus.None)
                {
                    cl.LikeStatus = LikeStatus.None;
                    _dbEntitySet.Update(cl);
                    if (_context.SaveChanges() != 0)
                    {
                        ret.LikeStatus = LikeStatus.None;
                        ret.IsActionSucceed = true;
                        return ret;
                    }
                }
                else
                {
                    ret.LikeStatus = LikeStatus.Like;
                    ret.ErrorInformation.UserInformation = "Comment Liked";
                }

            }
            if (ret.IsActionSucceed)
            {
                int[] prevDislikedCache = _userLikeCacheService.GetUserDisikedCommentsIds(currUserId);
                if (prevDislikedCache != null)
                {
                    if (prevDislikedCache.Contains(commentId))
                    {
                        prevDislikedCache.Prepend(commentId);
                    }
                    _userLikeCacheService.SetUserDisikedCommentsIds(currUserId, prevDislikedCache, 30);
                }
                int[] prevlikedCache = _userLikeCacheService.GetUserLikedCommentsIds(currUserId);
                if (prevlikedCache != null)
                {
                    if (prevlikedCache.Contains(commentId))
                    {
                        prevlikedCache.Prepend(commentId);
                    }
                    _userLikeCacheService.SetUserLikedCommentsIds(currUserId, prevlikedCache, 30);
                }
            }
            return ret;
        }

        public CommentLikeReturnModel UnLikeComment(string currUserId, int commentId = -1)
        {
            CommentLikeReturnModel ret = new CommentLikeReturnModel();
            if (commentId == -1 || string.IsNullOrEmpty(currUserId))
            {
                ret.ErrorInformation.ErrorType = ErrorType.NoAction;
                ret.ErrorInformation.UserInformation = "An Error Occured";
                return ret;
            }
            else
            {
                CommentUser cl = _dbEntitySet.Where(p => p.UserInfoId == currUserId && p.CommentId == commentId && p.LikeStatus ==LikeStatus.Like).FirstOrDefault();
                if (cl == null)
                {
                    ret.LikeStatus = LikeStatus.None;
                    ret.ErrorInformation.UserInformation = "Already not Liked";
                }
                // ITS OK
                else if (cl.LikeStatus == LikeStatus.Like)
                {
                    cl.LikeStatus = LikeStatus.None;
                    _dbEntitySet.Update(cl);
                    if (_context.SaveChanges() != 0)
                    {
                        ret.LikeStatus = LikeStatus.None;
                        ret.IsActionSucceed = true;
                        return ret;
                    }
                }
                else
                {
                    ret.LikeStatus = LikeStatus.None;
                    ret.ErrorInformation.UserInformation = "Comment Unliked";
                }

            }
            if (ret.IsActionSucceed)
            {
                int[] prevDislikedCache = _userLikeCacheService.GetUserDisikedCommentsIds(currUserId);
                if (prevDislikedCache != null)
                {
                    if (prevDislikedCache.Contains(commentId))
                    {
                        prevDislikedCache.Prepend(commentId);
                    }
                    _userLikeCacheService.SetUserDisikedCommentsIds(currUserId, prevDislikedCache, 30);
                }
                int[] prevlikedCache = _userLikeCacheService.GetUserLikedCommentsIds(currUserId);
                if (prevlikedCache != null)
                {
                    if (prevlikedCache.Contains(commentId))
                    {
                        prevlikedCache.Prepend(commentId);
                    }
                    _userLikeCacheService.SetUserLikedCommentsIds(currUserId, prevlikedCache, 30);
                }
            }
            return ret;
        }

        

        public BaseReturnModel RemoveComment(int commentId, string currUserId)
        {
            BaseReturnModel ret = new BaseReturnModel();
            Comment cmd = _dbSet.FirstOrDefault(p=>p.Id==commentId);
            if (cmd.AuthorId != currUserId)
            {
                return ret;
            }
            else
            {
                cmd.IsSoftDeleted = true;
                _dbSet.Update(cmd);
                if (_context.SaveChanges() != 0)
                {
                    ret.IsActionSucceed = true;
                }
                return ret;
            }
        }

        
    }
}
