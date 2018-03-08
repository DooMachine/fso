using fso.Core.Domains;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using MySql.Data.EntityFrameworkCore.Extensions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fso.Data.EntityMappings
{
    public class PostCollectionMap : EntityTypeConfiguration<PostCollection>
    {
        public override void Map(EntityTypeBuilder<PostCollection> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder.ForMySQLHasCollation("utf8mb4");
            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);

            builder.HasOne(p => p.ThumbFile)
                .WithOne(f => f.PostCollection)
                .HasForeignKey<AppMediaFile>(p => p.PostCollectionId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(p => p.UserInfo)
                .WithMany(p => p.Collections)
                .HasForeignKey(f => f.UserInfoId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder
                .HasMany(p => p.Posts)
                .WithOne(p => p.Collection)
                .HasForeignKey(f => f.CollectionId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
