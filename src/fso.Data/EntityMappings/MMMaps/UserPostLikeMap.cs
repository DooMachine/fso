using fso.Core.Domains.MMEntities;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fso.Data.EntityMappings
{
    public class UserPostLikeMap : EntityTypeConfiguration<UserPostLike>
    {
        public override void Map(EntityTypeBuilder<UserPostLike> builder)
        {
            builder.HasKey(p => new { p.PostId, p.UserInfoId });
            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
        }
    }
}
