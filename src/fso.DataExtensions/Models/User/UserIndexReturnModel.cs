
using System.Collections.Generic;

namespace fso.DataExtensions.Models
{
    public class UserIndexReturnModel
    {
        public string AppUserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Status { get; set; }        
        public List<UserMiniGroupDisplay> Groups { get; set; }
        public string ImageUrl { get; set; }
        public int GroupCount { get; set; }
        public int FollowingCount { get; set; }
        public int FollowerCount { get; set; }
        public bool IsCurrentUserFollowing { get; set; }
        public bool IsUserFollowingCurrentUser { get; set; }
    }
}
