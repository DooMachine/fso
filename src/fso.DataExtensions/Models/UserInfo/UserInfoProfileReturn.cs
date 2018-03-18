

using fso.Core.Domains;

namespace fso.DataExtensions.Models
{
    public class UserInfoProfileReturn : BaseReturnModel
    {
        public int Id { get; set; }
        public string AppUserId { get; set; }
        public string AlphaColor { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Status { get; set; }
        public string ProfileImageUrl { get; set; }
        
        public FollowState FollowingState { get; set; }
        public FollowState CurrentUserFollowedState { get; set; }

        public int? FollowerCount { get; set; }
        public int? FollowingCount { get; set; }
        public int? InterestCount { get; set; }
        public int? CollectionCount { get; set; }
        public double? TotalReputation { get; set; }
        
    }
}
