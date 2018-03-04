using fso.Core.Domains;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fso.Data.EntityMappings
{
    public class PostPartMap : EntityTypeConfiguration<PostPart>
    {
        public override void Map(EntityTypeBuilder<PostPart> builder)
        {
            builder.HasKey(p => p.Id);
            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
            builder.HasOne(p => p.Image)
                .WithOne(f => f.PostPart)
                .HasForeignKey<AppMediaFile>(p=>p.PostPartId)
                .OnDelete(DeleteBehavior.SetNull);

        }
    }
}
