using System;
using System.Collections.Generic;

namespace fso.DataExtensions.Models
{
    public class PostActivityEntity : IActivityEntity
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Title { get; set; }
        public string UrlKey { get; set; } 
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