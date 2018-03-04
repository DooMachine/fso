using fso.Core.Domains.MMEntities;

namespace fso.DataExtensions.Models.UserInfo
{
    public class FollowGroupReturn : BaseReturnModel
    {
        public FollowGroupReturn() : base()
        {

        }
        public GroupFollowState LastFollowState { get; set; }
    }
}
