

namespace fso.DataExtensions.Models
{
    public class PostUserInfo
    {
        public string UserId { get; set; }
        public string ProfileImage { get; set; }
        public string UserName { get; set; }

        public bool IsCurrentUserFollowing { get; set; }
    }
}
