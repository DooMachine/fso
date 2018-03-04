using fso.Core.Domains;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fso.Data.EntityMappings
{
    public class UserInfoMap : EntityTypeConfiguration<UserInfo>
    {
        public override void Map(EntityTypeBuilder<UserInfo> builder)
        {
            builder
                .HasKey(p => p.AppUserId);
            builder
                .Property(f => f.AppUserId)
                .ValueGeneratedNever();
            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
            builder
                .HasOne(p => p.ProfilePicture)
                .WithOne(p => p.UserInfo)
                .HasForeignKey<AppMediaFile>(f=>f.UserInfoId);

            builder
                .HasMany(p => p.Followers)
                .WithOne(p => p.Follower)
                .HasForeignKey(p => p.FollowedId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasMany(p => p.Following)
                .WithOne(p => p.Followed)
                .HasForeignKey(p => p.FollowerId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(p => p.FollowingGroups)
                .WithOne(f => f.UserInfo)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(p => p.LikedReviews)
                .WithOne(f => f.UserInfo)
                .HasForeignKey(f => f.UserInfoId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(p => p.PostLikes)
                .WithOne(f => f.User)
                .HasForeignKey(f => f.UserInfoId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(p => p.ReputationGains)
                .WithOne(p => p.UserInfo)
                .HasForeignKey(f => f.UserInfoId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
