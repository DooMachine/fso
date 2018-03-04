
namespace fso.Core.Domains
{
    public class ReputationGain : BaseEntity
    {
        public double GainedReputationValue { get; set; }

        public virtual Post Post { get; set; }
        public int? PostId { get; set; }

        public virtual Review Review { get; set; }
        public int? ReviewId { get; set; }

        public virtual UserInfo UserInfo { get; set; }
        public string UserInfoId { get; set; }
    }
}
