using fso.Core.Domains.Helpers;
using fso.DataExtensions.Models.GroupReturnModels;
using fso.DataExtensions.Models.User;

namespace fso.DataExtensions.Models
{
    public class HomeFeedReturn
    {
        public string ErrorCode { get; set; }
        public PaginatedUserActivityFeed FriendActivities { get; set; }
        public PaginatedGroupRecommendation GroupRecommendations { get; set; }
        public PaginatedUserInfoRecommendation UserRecommeandations { get; set; }
    }
    public class PaginatedUserActivityFeed: PaginatedReturn<UserActivityDTO<IActivityEntity>>
    {
        public PaginatedUserActivityFeed() : base()
        {

        }
    }

    public class PaginatedGroupRecommendation: PaginatedReturn<InterestCard>
    {
        public PaginatedGroupRecommendation() : base()
        {

        }
    }
    public class PaginatedUserInfoRecommendation : PaginatedReturn<UserCardModel>
    {
        public PaginatedUserInfoRecommendation() : base()
        {

        }
    }

    public class PaginatedInterestCard : PaginatedReturn<InterestCard>
    {
        public PaginatedInterestCard() : base()
        {

        }
    }
}
