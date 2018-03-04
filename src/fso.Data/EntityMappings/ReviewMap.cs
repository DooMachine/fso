using fso.Core.Domains;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fso.Data.EntityMappings
{
    public class ReviewMap : EntityTypeConfiguration<Review>
    {
        public override void Map(EntityTypeBuilder<Review> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
            builder
                .HasOne(p => p.UserInfo)
                .WithMany(p => p.Reviews)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            builder
                .HasMany(p => p.Comments)
                .WithOne(p => p.Review)
                .HasForeignKey(f => f.ReviewId)
                .OnDelete(DeleteBehavior.SetNull);

            builder
                .HasMany(p => p.UserLikes)
                .WithOne(p => p.Review)
                .HasForeignKey(p => p.ReviewId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(p => p.ReputationGains)
                .WithOne(p => p.Review)
                .HasForeignKey(f => f.ReviewId)
                .OnDelete(DeleteBehavior.ClientSetNull);

        }
    }
}
