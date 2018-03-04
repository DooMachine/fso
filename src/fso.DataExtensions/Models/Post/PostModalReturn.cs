

using fso.Core.Domains.Helpers;
using fso.DataExtensions.Models.Comment;
using fso.DataExtensions.Models.UserInfo;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace fso.DataExtensions.Models
{
    public class PostIndexReturn : BaseReturnModel
    {
        public PostIndexReturn() : base()
        {

        }
        public PostCardModel Post { get; set; }
        public IEnumerable<UserBestPost> SimiliarPosts { get; set; }
        public PaginatedReviews Reviews { get; set; } = new PaginatedReviews();
    }
    public class PaginatedReviews : PaginatedReturn<ReviewActivityEntity>
    {
        public PaginatedReviews() : base()
        {
            Entities = new PaginatedList<ReviewActivityEntity>();
        }
    }
    public class PaginatedComments : PaginatedReturn<ReviewCommentDTO>
    {
        public PaginatedComments() : base()
        {
            Entities = new PaginatedList<ReviewCommentDTO>();
        }
        public bool IsLoading { get; set; }
        public string Error { get; set; }
        public bool ShowError { get; set; }
        public bool IsShowing { get; set; }
    }

    
    public class PostModalReviewList
    {
        public PaginatedList<PostReviewDisplay> ReviewList { get; set; }
        [JsonProperty]
        public bool HasNextPage
        {
            get
            {
                return (ReviewList.HasNextPage);
            }
        }
        [JsonProperty]
        public int TotalCount {
            get
            {
                return (ReviewList.TotalCount);
            }
        }
        [JsonProperty]
        public int TotalPage
        {
            get
            {
                return (ReviewList.TotalPageCount);
            }
        }
        
    }
    // Obselote
    public class PostReviewDisplay
    {
        public int Id { get; set; }

        public UserInfoExtraSmall UserInfo { get; set; }

        public string Content { get; set; }

        public int CommentCount { get; set; }

        public int LikeCount { get; set; }

        public int DislikeCount { get; set; }

        public bool IsCurrentUserLiked { get; set; }
        public bool IsCurrentUserDisliked { get; set; }

    }

    public class PostPartModalDisplay
    {
        public int Id { get; set; }
        // May be a Video
        public BaseImageReturn Image { get; set; }

        public string Title { get; set; }
    }
}
