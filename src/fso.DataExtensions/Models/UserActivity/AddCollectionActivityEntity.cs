
using System;

namespace fso.DataExtensions.Models
{
    public class AddCollectionActivityEntity : IActivityEntity
    {
        public int Id { get; set; }
        public string ThumbImageUrl { get; set; }
        public string Description { get; set; }
        public DateTime DateUtcModified { get; set; }
        public string Name { get; set; }
        public int PostsCount { get; set; }
        public virtual BaseUserInfoDisplay UserInfo { get; set; }
        public string UserInfoId { get; set; }
    }
}
