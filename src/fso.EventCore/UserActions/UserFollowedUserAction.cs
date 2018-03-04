

namespace fso.EventCore.UserActions
{
    public class UserFollowedUserAction : BaseAction
    {
        public string FollowingUserId { get; set; }
        public string FollowedUserId { get; set; }
        public string FollowingUsername { get; set; }
    }
}
