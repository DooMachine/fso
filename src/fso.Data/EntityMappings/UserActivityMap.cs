using fso.Core.Domains;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MySql.Data.EntityFrameworkCore.Extensions;

namespace fso.Data.EntityMappings
{
    public class UserActivityMap : EntityTypeConfiguration<UserActivity>
    {
        public override void Map(EntityTypeBuilder<UserActivity> builder)
        {
            builder.HasKey(p => p.Id);
            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
            builder.ForMySQLHasCollation("utf8mb4");
        }
    }
}
