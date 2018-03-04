using fso.Core.Domains.MMEntities;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fso.Data.EntityMappings
{
    public class GroupUserMap : EntityTypeConfiguration<UserGroup>
    {
        public override void Map(EntityTypeBuilder<UserGroup> builder)
        {
            builder.HasKey(p => new { p.GroupId, p.UserId });
        }
    }
}
