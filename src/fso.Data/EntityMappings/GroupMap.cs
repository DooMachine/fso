using Microsoft.EntityFrameworkCore.Metadata;
using fso.Core.Domains;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore;

namespace fso.Data.EntityMappings
{
    public class GroupMap : EntityTypeConfiguration<Group>
    {
        public override void Map(EntityTypeBuilder<Group> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .HasAlternateKey(p => p.UrlKey);
            
            builder
                .Property(p => p.UrlKey).ValueGeneratedNever();
            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
            builder
                .HasMany(p => p.UsersFollowing)
                .WithOne(f => f.Group)
                .HasForeignKey(f => f.GroupId)
                .OnDelete(DeleteBehavior.Cascade);
            builder
                .HasOne(p => p.ProfileImage)
                .WithOne(p => p.ProfileGroup)
                .HasForeignKey<AppMediaFile>(f=>f.ProfileGroupId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(p => p.CoverImage)
                .WithOne(p => p.CoverGroup)
                .HasForeignKey<AppMediaFile>(f => f.CoverGroupId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasMany(p => p.Posts)
                .WithOne(p => p.Group)
                .HasForeignKey(f => f.GroupId)
                .OnDelete(DeleteBehavior.Cascade);


            builder
                .HasMany(p => p.Parents)
                .WithOne(p => p.Parent)
                .HasForeignKey(f => f.ParentGroupId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder
                .HasMany(p => p.Childs)
                .WithOne(p => p.Child)
                .HasForeignKey(f => f.ChildGroupId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
