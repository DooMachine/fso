using fso.Core.Domains.Helpers;
using fso.DataExtensions.Models.GroupReturnModels.GroupIndex;
using fso.DataExtensions.Models;
using System;
using System.Collections.Generic;

namespace fso.DataExtensions.DataServices
{
    public interface IPostDataService
    {
        AddPostReturnModel GetUserUnpublishedPost(string currUserId);
        PaginatedList<PostCard> GetGroupIndexPosts(int groupId, string currUserId, int pageIndex, int pageSize);
        PaginatedList<PostCard> GetGroupIndexPosts(int groupId, int pageIndex, int pageSize);
        PostIndexReturn GetPostIndex(int postId,int? reviewId, string currUserId);
        PaginatedReviews GetPaginatedReviews(int postId, int pageIndex, int pageSize, string order, string currUserId);
        ICollection<PostPartDisplay> GetPostParts(int postId);
        int GetPostLikeCount(int postId, int cacheTreshold);
        int GetPostReviewsCount(int postId);
    }
}

