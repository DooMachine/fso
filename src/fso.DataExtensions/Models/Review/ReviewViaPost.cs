
using fso.Core.Domains.MMEntities;
using System;
using System.Collections.Generic;

namespace fso.DataExtensions.Models
{
    public class ReviewViaPost
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string Content { get; set; }
        public DateTime DateUtcPublished { get; set; }
        public string Url { get; set; }
        public double PostRate { get; set; }
        public int LikeCount { get; set; }
        public int DislikeCount { get; set; }
        public LikeStatus LikeStatus { get; set; }
        public int CommentCount { get; set; }
        public BaseUserInfoDisplay AuthorInfo { get; set; }
        public PaginatedComments Comments { get; set; } = new PaginatedComments();
        public bool ShowCommentForm { get; set; } = false;
        public bool CommentFormPending { get; set; } = false;
        public bool ShowComments { get; set; } = false;
        public string CommentFormError { get; set; }
    }
    public class ViaPost
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Title { get; set; }
        public DateTime DateUtcPublished { get; set; }
        public IDictionary<string, string> PostGroups { get; set; }
        public bool IsCurrentUserLiked { get; set; }
        public ICollection<PostPartDisplay> PostParts { get; set; }
        public BaseUserInfoDisplay AuthorInfo { get; set; }
        public PostCollectionInfo CollectionInfo { get; set; }
        public double? Rating { get; set; }
        public int ReviewCount { get; set; }
        public int FavouriteCount { get; set; }
    }

}
