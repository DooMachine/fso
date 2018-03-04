using System;
using System.Collections.Generic;
using System.Text;

namespace fso.EventCore.UserActions
{
    public class UserUnfollowedUserAction: BaseAction
    {
        public string FollowingUserId { get; set; }
        public string FollowedUserId { get; set; }
    }
}
