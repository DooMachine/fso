

namespace fso.Core.Settings
{
    public class ReputationSettings
    {
        /// <summary>
        /// When User adds a post, gains reputation
        /// </summary>
        public int InitialPostReputationValue { get; set; } = 5;
        public int PostRateReputationGainMultiplier { get; set; } = 10;
        /// <summary>
        /// When User adds a review, gains reputation
        /// </summary>
        public int InitialReviewReputationValue { get; set; } = 2;
        public int ReviewReputationGainMultiplier { get; set; } = 5;
        
        /// <summary>
        /// When User Likes a post, author of the post gains reputation in groups of post.
        /// </summary>
        public int LikedPostGroupReputationValue { get; set; } = 2;
        public int LikedPostGroupReputationMultiplier { get; set; } = 5;
        /// <summary>
        /// When User Likes a post, author of the post gains reputation.
        /// </summary>
        public int LikedPostUserReputationValue { get; set; } = 2;
        public int LikedPostUserReputationMultiplier { get; set; } = 5;

        public int PublishPostReputationGain => InitialPostReputationValue * PostRateReputationGainMultiplier;
        public int PublishReviewReputationGain => InitialReviewReputationValue * ReviewReputationGainMultiplier;
    }
}
