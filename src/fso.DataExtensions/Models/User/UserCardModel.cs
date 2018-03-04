
using fso.Core.Domains;

namespace fso.DataExtensions.Models.User
{
    public class UserCardModel : BaseUserInfoDisplay
    {
        public string Status { get; set; }
        public double? Reputation { get; set; } = 0;
        public FollowState? FollowState { get; set; }
    }
}
