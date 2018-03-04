using fso.Core.Domains;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fso.Data.EntityMappings
{
    public class ImageMap : EntityTypeConfiguration<AppMediaFile>
    {
        public override void Map(EntityTypeBuilder<AppMediaFile> builder)
        {
            builder.HasKey(p => p.Id);

            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
        }
    }
}
