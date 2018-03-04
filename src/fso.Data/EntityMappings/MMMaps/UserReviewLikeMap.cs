using fso.Core.Domains.MMEntities;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fso.Data.EntityMappings
{
    public class UserReviewLikeMap : EntityTypeConfiguration<UserReview>
    {
        public override void Map(EntityTypeBuilder<UserReview> builder)
        {
            builder.HasKey(p => new { p.ReviewId, p.UserInfoId });
        }
    }
}
