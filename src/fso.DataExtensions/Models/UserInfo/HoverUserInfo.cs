
using System;
using System.Collections.Generic;
using System.Text;

namespace fso.DataExtensions.Models
{
    public class HoverUserInfo 
    {
        public HoverUserInfo()
        {

        }

        public string UserId { get; set; }
        public string ProfileImage { get; set; }
        public string FullName { get; set; }

        public int PostCount { get; set; }
        public int FollowerCount { get; set; }
        public int ReviewCount { get; set; }

        public bool IsCurrentUserFollowing { get; set; }

        public List<InterestCard> FollowingGroups { get; set; }
    }
}
