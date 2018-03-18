using fso.Core.Domains.MMEntities;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fso.Data.EntityMappings
{
    public class GroupPostMap : EntityTypeConfiguration<GroupPost>
    {
        public override void Map(EntityTypeBuilder<GroupPost> builder)
        {
            builder.HasKey(p => new { p.GroupId, p.PostId });
            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
        }
    }
}
