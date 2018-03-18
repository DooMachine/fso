using fso.Core.Domains.MMEntities;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fso.Data.EntityMappings
{
    public class GroupRelationMap : EntityTypeConfiguration<GroupRelation>
    {
        public override void Map(EntityTypeBuilder<GroupRelation> builder)
        {
            builder.HasKey(p => new { p.ParentGroupId, p.ChildGroupId });
            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
        }
    }
}
