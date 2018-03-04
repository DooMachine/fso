
using System;

namespace fso.Core.Domains
{
    public class FollowInfo
    {
        public string FollowerId { get; set; }
        public UserInfo Follower { get; set; }

        public string FollowedId { get; set; }
        public UserInfo Followed { get; set; }

        public DateTime DateUtcFollowed { get; set; }

        public FollowState FollowState { get; set; }
    }
    public enum FollowState
    {
        Pending, Confirmed, Unfollowed, FollowerBlocked_Followed, FollowedBlocked_Follower
    }
}
