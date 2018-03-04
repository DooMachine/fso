using System;
using System.Collections.Generic;
using System.Text;

namespace fso.EventCore.GroupActions
{
    public class UserFollowedGroupAction : BaseAction
    {
        public string UserId { get; set; }
        public int GroupId { get; set; }
    }
}
