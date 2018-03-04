using fso.Core.Domains;
namespace fso.DataExtensions.Models.UserInfo
{
    public class FollowUserReturn : BaseReturnModel
    {
        public FollowUserReturn() : base()
        {

        }
        public string FollowedUserId { get; set; }
        public FollowState LastFollowState { get; set; }
    }
}
