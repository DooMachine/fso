using fso.Core.Domains;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MySql.Data.EntityFrameworkCore.Extensions;

namespace fso.Data.EntityMappings
{
    public class ImageMap : EntityTypeConfiguration<AppMediaFile>
    {
        public override void Map(EntityTypeBuilder<AppMediaFile> builder)
        {
            builder.HasKey(p => p.Id);
            builder.ForMySQLHasCollation("utf8mb4");
            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
        }
    }
}
