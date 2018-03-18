
using System;
using System.Collections.Generic;

namespace fso.DataExtensions.Models
{
    public class UserBestPostsReturn 
    {
        public List<UserBestPost> Posts { get; set; }
    }
    public class UserBestPost 
    {
        public UserBestPost()
        {
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public UserInfoExtraSmall UserInfo { get; set; }
        public double Rating { get; set; }
        public DateTime DateUtcPublished { get; set; }
        public string Url { get; set; }
        public List<string> ThumbnailUrls { get; set; }
        // First Shown Thumnnail Index
        public int ActiveThumbnailIndex { get; set; }
    }
    
}
