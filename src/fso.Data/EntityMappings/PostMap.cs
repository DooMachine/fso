using Microsoft.EntityFrameworkCore.Metadata;
using fso.Core.Domains;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore;

namespace fso.Data.EntityMappings
{
    public class PostMap : EntityTypeConfiguration<Post>
    {
        public override void Map(EntityTypeBuilder<Post> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
            builder
                .HasOne(p => p.UserInfo)
                .WithMany(p => p.Posts)
                .HasForeignKey(f => f.UserInfoId)
                .OnDelete(DeleteBehavior.SetNull);

            builder
                .HasMany(p => p.PostParts)
                .WithOne(p => p.Post)
                .HasForeignKey(f => f.PostId)
                .OnDelete(DeleteBehavior.SetNull);

            builder
                .HasMany(p => p.Reviews)
                .WithOne(p => p.Post)
                .HasForeignKey(p => p.PostId)
                .OnDelete(DeleteBehavior.SetNull);

            builder
                .HasMany(p => p.Groups)
                .WithOne(p => p.Post)
                .HasForeignKey(f => f.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(p => p.LikedUsers)
                .WithOne(f => f.Post)
                .HasForeignKey(f => f.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(p => p.ReputationGains)
                .WithOne(p => p.Post)
                .HasForeignKey(f => f.PostId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
