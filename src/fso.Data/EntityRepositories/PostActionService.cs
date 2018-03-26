using fso.Caching.CachingServices;
using fso.Core.Domains;
using fso.Core.Domains.MMEntities;
using fso.Core.Settings;
using fso.Data.Extensions;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;

namespace fso.Data.EntityRepositories
{
    public class PostActionService : IPostActionService
    {
        private readonly IEntityContext _context;
        private readonly IUserLikeCacheService _userLikesCacheService;
        private readonly IGroupCacheService _groupCacheService;
        private readonly DbSet<UserPostLike> _dbEntitySet;
        private readonly DbSet<Post> _postSet;
        private readonly DbSet<PostCollection> _postCollectionDbSet;
        private readonly DbSet<Group> _groupDbSet;
        private readonly DbSet<UserGroup> _userGroupDbSet;
        private readonly ReputationSettings _reputationSettings;

        public PostActionService(
            IEntityContext context,
            IUserLikeCacheService userLikesCacheService,
            IGroupCacheService groupCacheService,
            IOptions<ReputationSettings> reputationSettings
            )
        {
            _context = context;
            _userLikesCacheService = userLikesCacheService;
            _groupCacheService = groupCacheService;
            _dbEntitySet = _context.SetChild<UserPostLike>();
            _postSet = _context.Set<Post>();
            _postCollectionDbSet = _context.Set<PostCollection>();
            _groupDbSet = _context.Set<Group>();
            _userGroupDbSet = _context.SetChild<UserGroup>();
            _reputationSettings = reputationSettings.Value;
        }
        public LikePostReturn LikePost(int postId, string currUserId)
        {
            LikePostReturn ret = new LikePostReturn
            {
                IsLiked = true,
                IsActionSucceed = true
            };
            UserPostLike rel = _dbEntitySet.FirstOrDefault(f => f.UserInfoId == currUserId && f.PostId == postId);
            if (rel==null)
            {
                _dbEntitySet.Add(new UserPostLike()
                {
                    PostId = postId,
                    UserInfoId = currUserId,         
                    DateUtcLiked = DateTime.UtcNow
                });
                Post pst = _context.Set<Post>().AsNoTracking().FirstOrDefault(p=>p.Id == postId);
                int[] gps = _context.SetChild<GroupPost>().Where(p => p.PostId == postId).Select(f=>f.GroupId).ToArray();
                List<UserGroup> ugs = _context.SetChild<UserGroup>().Where(p => gps.Contains(p.GroupId) && p.UserId == pst.UserInfoId).ToList();
                foreach (var item in ugs)
                {
                    item.UserReputationInGroup += 10;
                    _context.GetChildDbEntityEntrySafely<UserGroup>(item).State = EntityState.Modified;
                }
                if (!(_context.SaveChanges() <= 0))
                {
                    ret.IsActionSucceed = true;
                    int[] prevLikes = _userLikesCacheService.GetUserLikedPostsIds(currUserId);
                    prevLikes = prevLikes.Append(postId).ToArray();
                    _userLikesCacheService.SetUserLikedPostsIds(currUserId, prevLikes, 30);
                }
            }
            ret.PostAuthorId = _postSet.Where(p => p.Id == postId).Select(p => p.UserInfoId).FirstOrDefault();
            return ret;
        }

        public LikePostReturn UnlikePost(int postId, string currUserId)
        {
            LikePostReturn ret = new LikePostReturn();
            ret.IsActionSucceed = true;
            ret.IsLiked = false;
            UserPostLike uLike = _dbEntitySet.Where(f => f.UserInfoId == currUserId && f.PostId == postId).FirstOrDefault();
            if (uLike != null)
            {
                _dbEntitySet.Remove(uLike);
                Post pst = _context.Set<Post>().AsNoTracking().FirstOrDefault(p => p.Id == postId);
                int[] gps = _context.SetChild<GroupPost>().Where(p => p.PostId == postId).Select(f => f.GroupId).ToArray();
                List<UserGroup> ugs = _context.SetChild<UserGroup>().Where(p => gps.Contains(p.GroupId) && p.UserId == pst.UserInfoId).ToList();
                foreach (var item in ugs)
                {
                    item.UserReputationInGroup -= 10;
                    _context.GetChildDbEntityEntrySafely<UserGroup>(item).State = EntityState.Modified;
                }
                if (!(_context.SaveChanges() <= 0))
                {
                    int[] prevLikes = _userLikesCacheService.GetUserLikedPostsIds(currUserId);
                    prevLikes = prevLikes.Where(val=> val != postId).ToArray();
                    _userLikesCacheService.SetUserLikedPostsIds(currUserId, prevLikes, 30);
                }
                
            }
            ret.PostAuthorId = _postSet.Where(p => p.Id == postId).Select(p => p.UserInfoId).FirstOrDefault();
            return ret;
        }
        
        public PublishPostReturnModel PublishPost(PublishPostParameters model, string currUserId)
        {
            PublishPostReturnModel ret = new PublishPostReturnModel()
            {
                IsActionSucceed = false,
                Errors = new Dictionary<string, string>()
            };

            Post post = _postSet.Include(p => p.PostParts).Include(p => p.UserInfo).FirstOrDefault(p => p.Id == model.Id && p.UserInfoId == currUserId);
            if (post == null)
            {
                return ret;
            }
            post.Title = TagHelpers.RemoveUnwantedTags(model.Title);
            post.DateUtcPublished = DateTime.UtcNow;
            post.Description = model.Description;
            post.IsPublished = true;
            post.UrlKey = System.Text.RegularExpressions.Regex.Replace(post.Title, @"[^A-Za-z0-9_\.~]+", "-");
            post.Content = TagHelpers.RemoveUnwantedTags(model.Content);
            post.DateUtcModified = DateTime.UtcNow;
            post.Groups = new List<GroupPost>();
            post.ReputationGains = new List<ReputationGain>()
            {
                new ReputationGain()
                {
                    GainedReputationValue = _reputationSettings.InitialPostReputationValue,
                    UserInfoId = currUserId,                    
                }
            };

            
            if (post.PostParts.Count < 1)
            {
                ret.Errors.Add("custom", "Please add your pictures");
                return ret;
            }
            if (model.SelectedCollectionId.HasValue)
            {
                if (model.SelectedCollectionId > 0)
                {
                    PostCollection pcol = _postCollectionDbSet.FirstOrDefault(p => p.Id == model.SelectedCollectionId&& p.UserInfoId==currUserId);
                    if (pcol != null)
                    {
                        if (pcol.UserInfoId != currUserId)
                        {
                            ret.Errors.Add("custom", "That does not belongs to you buddy");
                            return ret;
                        }
                    }
                    post.Collection = pcol;
                    post.CollectionId = model.SelectedCollectionId;
                }
            }
            if (model.SelectedInterestIds.Length < 1)
            {
                ret.Errors.Add("custom", "Please add at least one interest");
            }
            List<Group> groups = _groupDbSet.Where(p => model.SelectedInterestIds.Contains(p.Id)).ToList();
            int[] groupIds = groups.Select(p => p.Id).ToArray();
            int[] alreadyFollowIds = _userGroupDbSet
                .Where(p => p.GroupFollowState == GroupFollowState.Followed && p.UserId == currUserId && groupIds.Contains(p.GroupId)).Select(p=>p.GroupId).ToArray();
            foreach (var item in groupIds)
            {
                post.Groups.Add(new GroupPost()
                {
                    GroupId = item,
                    DateUtcAdded = DateTime.UtcNow,
                    PostPopularityLevel = 0
                });
            }
            IEnumerable<Group> unFolloweds = groups.Where(p => !alreadyFollowIds.Contains(p.Id));
            foreach (var unfollowedGroup in unFolloweds)
            {
                UserGroup ug = _userGroupDbSet.FirstOrDefault(p => p.GroupId == unfollowedGroup.Id && p.UserId == currUserId);
                if (ug == null)
                {
                    ug = new UserGroup()
                    {
                        DateUtcFollowed = DateTime.UtcNow,
                        Group = unfollowedGroup,
                        UserInfo = post.UserInfo,
                        GroupFollowState = GroupFollowState.Followed,
                        UserReputationInGroup = 0
                    };
                    _userGroupDbSet.Add(ug);
                }
                else
                {
                    ug.GroupFollowState = GroupFollowState.Followed;
                    _userGroupDbSet.Update(ug);
                }
            }
            _postSet.Update(post);
            if (_context.SaveChanges() < 1)
            {
                // if ef-sql exception
                ret.IsActionSucceed = false;
                ret.Errors.Add("custom", "Oops.. Something bad happened. Try again later");
            }
            else
            {
                // reset group-post caches
                foreach (var item in groupIds)
                {
                    var postIdRels = _groupCacheService.GetPostRelationships(item);
                    if (postIdRels !=null)
                    {
                        if (postIdRels.Count() > 0)
                        {
                            postIdRels = postIdRels.Append(new GroupPost()
                            {
                                DateUtcAdded = DateTime.UtcNow,
                                GroupId = item,
                                PostId = post.Id
                            }).ToArray();
                            _groupCacheService.SetPostRelationships(item, postIdRels, 30);
                        }
                    }
                                       
                }
                // set return to succeed
                ret.IsActionSucceed = true;
                ret.PublishedPostId = post.Id;
                ret.PostUrlKey = post.UrlKey;
            }
            return ret;
        }
        public SaveEditingPostReturnModel SaveEditingPost(SaveEditingPostParameters model, string currUserId){
            SaveEditingPostReturnModel ret = new SaveEditingPostReturnModel()
            {
                IsActionSucceed = false,
                Errors = new Dictionary<string, string>()
            };

            Post post = _postSet.Include(p => p.PostParts).Include(p=>p.Groups).Include(p => p.UserInfo).FirstOrDefault(p => p.Id == model.Id && p.UserInfoId == currUserId);
            if (post == null)
            {                
                return ret;
            }
            post.Title = TagHelpers.RemoveUnwantedTags(model.Title);
            post.UrlKey = System.Text.RegularExpressions.Regex.Replace(post.Title, @"[^A-Za-z0-9_\.~]+", "-");
            post.DateUtcModified = DateTime.UtcNow;
            post.Description = model.Description;
            post.IsPublished = true;
            post.Content = TagHelpers.RemoveUnwantedTags(model.Content);
            
            if (post.PostParts.Count < 1)
            {
                ret.Errors.Add("custom", "Please add your pictures");
                return ret;
            }
            if (model.SelectedCollectionId.HasValue)
            {
                if (model.SelectedCollectionId >0)
                {
                    PostCollection pcol = _postCollectionDbSet.FirstOrDefault(p => p.Id == model.SelectedCollectionId && p.UserInfoId==currUserId);
                    if (pcol == null)
                    {
                        
                        ret.Errors.Add("custom", "That collection does not belongs to you buddy");
                        return ret;
                        
                    }
                    post.Collection = pcol;
                }
            }
            if (model.SelectedInterestIds.Length < 1)
            {
                ret.Errors.Add("custom", "Please add at least one interest");
                return ret;
            }
            List<Group> groups = _groupDbSet.Where(p => model.SelectedInterestIds.Contains(p.Id)).ToList();
            int[] groupIds = groups.Select(p => p.Id).ToArray();
            int[] prevGroupIds = post.Groups.Select(f=>f.GroupId).ToArray();
            int[] alreadyFollowIds = _userGroupDbSet
                .Where(p => p.GroupFollowState == GroupFollowState.Followed && p.UserId == currUserId && groupIds.Contains(p.GroupId)).Select(p=>p.GroupId).ToArray();
            foreach(var gId in prevGroupIds){
                if(!groupIds.Contains(gId)){
                    post.Groups.Remove(post.Groups.FirstOrDefault(p=>p.GroupId==gId));
                }
            }
            foreach (var item in groupIds)
            {                
                if(!post.Groups.Any(f=>f.GroupId==item)){
                    post.Groups.Add(new GroupPost()
                    {
                        GroupId = item,
                        DateUtcAdded = DateTime.UtcNow,
                        PostPopularityLevel = 0,                        
                    });
                }
            }
            IEnumerable<Group> unFolloweds = groups.Where(p => !alreadyFollowIds.Contains(p.Id));
            foreach (var unfollowedGroup in unFolloweds)
            {
                UserGroup ug = _userGroupDbSet.FirstOrDefault(p => p.GroupId == unfollowedGroup.Id && p.UserId == currUserId);
                if (ug == null)
                {
                    ug = new UserGroup()
                    {
                        DateUtcFollowed = DateTime.UtcNow,
                        Group = unfollowedGroup,
                        UserInfo = post.UserInfo,
                        GroupFollowState = GroupFollowState.Followed,
                        UserReputationInGroup = 0
                    };
                    _userGroupDbSet.Add(ug);
                }
                else
                {
                    ug.GroupFollowState = GroupFollowState.Followed;
                    _userGroupDbSet.Update(ug);
                }
            }
            _postSet.Update(post);
            if (_context.SaveChanges() < 1)
            {
                // if ef-sql exception
                ret.IsActionSucceed = false;
                ret.Errors.Add("custom", "Oops.. Something bad happened. Try again later");
            }
            else
            {
                // reset group-post caches
                foreach (var item in groupIds)
                {
                    var postIdRels = _groupCacheService.GetPostRelationships(item);
                    if (postIdRels !=null)
                    {
                        if (postIdRels.Count() > 0)
                        {
                            // Remove Deleted Interests from cache
                            if(prevGroupIds!=null){
                                postIdRels = postIdRels.Where(p=> !prevGroupIds.Contains(p.GroupId)).ToArray();
                            }
                            postIdRels = postIdRels.Append(new GroupPost()
                            {
                                DateUtcAdded = DateTime.UtcNow,
                                GroupId = item,
                                PostId = post.Id
                            }).ToArray();
                            _groupCacheService.SetPostRelationships(item, postIdRels, 30);
                        }
                    }
                                       
                }
                // set return to succeed
                ret.IsActionSucceed = true;
                ret.PublishedPostId = post.Id;
            }
            return ret;
        }
        public DeletePostReturnModel DeletePost(int postId, string currUserId){
            DeletePostReturnModel ret = new DeletePostReturnModel();
            if(string.IsNullOrEmpty(currUserId)){
                ret.IsActionSucceed =false;
                return ret;
            }
            Post post = _context.Set<Post>().FirstOrDefault(p=>p.UserInfoId==currUserId && p.Id==postId);
            if(post==null){
                ret.Errors.TryAdd("custom","Post already deleted");
                ret.IsActionSucceed=false;
                return ret;
            }
            post.IsSoftDeleted = true;
            _context.GetDbEntityEntrySafely(post).State = EntityState.Modified;
            // Deleting related activities 
            List<UserActivity> relActs = _context.Set<UserActivity>()
                .Where(p=>p.ParentEntityId==post.Id || p.ParentEntityId==post.Id).ToList();
            foreach(var item in relActs){
                item.IsSoftDeleted = true;
                _context.GetDbEntityEntrySafely(item).State = EntityState.Modified;              
            }
            if(_context.SaveChanges()>0){
                ret.IsActionSucceed =true;
                return ret;
            }
            ret.IsActionSucceed=false;
            return ret;
        }
    }
}
