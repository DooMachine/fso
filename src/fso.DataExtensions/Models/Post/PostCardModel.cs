
using System;
using System.Collections.Generic;
using System.Text;

namespace fso.DataExtensions.Models
{
    public class PostCardModel
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string UrlKey { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateUtcPublished { get; set; }

        public bool IsCurrentUserLiked { get; set; }
        public ICollection<PostPartDisplay> PostParts { get; set; }
        public ICollection<InterestCard> PostGroups { get; set; }
        public UserCardModel AuthorInfo { get; set; }
        public CollectionCard CollectionInfo { get; set; } = new CollectionCard();
        public double? Rating { get; set; }
        public int ReviewCount { get; set; }
        public int FavouriteCount { get; set; }

        public int? CollectionId { get; set; }
    }
}
