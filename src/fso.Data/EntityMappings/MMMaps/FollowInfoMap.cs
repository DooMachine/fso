using fso.Core.Domains;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fso.Data.EntityMappings
{
    public class FollowInfoMap : EntityTypeConfiguration<FollowInfo>
    {
        public override void Map(EntityTypeBuilder<FollowInfo> builder)
        {
            builder.HasKey(p => new { p.FollowedId, p.FollowerId });
             builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
        }
    }
}
