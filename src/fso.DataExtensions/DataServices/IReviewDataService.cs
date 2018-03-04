using fso.Core.Domains.Helpers;
using fso.DataExtensions.Models;

namespace fso.DataExtensions.DataServices
{
    public interface IReviewDataService
    {
        PaginatedList<PostReviewDisplay> GetPostReviews(int postId, int reviewPageIndex, int reviewPageSize, string order, string currUserId);
        PaginatedList<PostReviewDisplay> GetPostReviews(int postId, int reviewPageIndex, int reviewPageSize, string order);
        PaginatedComments GetReviewComments(int reviewId, string currUserId);
        int GetReviewLikeCount(int reviewId, int cacheTreshold);
        int GetReviewDislikeCount(int reviewId,int cacheTreshold);
        int GetReviewCommentCount(int reviewId,int cacheTreshold);

    }
}
