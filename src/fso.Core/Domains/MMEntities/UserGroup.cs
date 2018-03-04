using System;

namespace fso.Core.Domains.MMEntities
{
    public class UserGroup
    {
        public virtual UserInfo UserInfo { get; set; }
        public string UserId { get; set; }
        public virtual Group Group { get; set; }
        public int GroupId { get; set; }

        public DateTime DateUtcFollowed { get; set; }
        public int UserReputationInGroup { get; set; }
        public string LanguageOfUser { get; set; }
        public GroupFollowState GroupFollowState { get; set; }
    }
    public enum GroupFollowState
    {
        Followed, Unfollowed, Banned
    }
}
