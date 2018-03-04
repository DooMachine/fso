using fso.Core.Domains;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fso.Data.EntityMappings
{
    public class CommentMap : EntityTypeConfiguration<Comment>
    {
        public override void Map(EntityTypeBuilder<Comment> builder)
        {
            builder
                .HasKey(p => p.Id);
            builder
                .Property(f => f.Id)
                .ValueGeneratedOnAdd();
            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
            builder
                .HasOne(p => p.Author)
                .WithMany(p => p.Comments)
                .HasForeignKey(p => p.AuthorId)
                .OnDelete(DeleteBehavior.SetNull);
            
            builder
                .HasMany(p => p.CommentLikes)
                .WithOne(p => p.Comment)
                .HasForeignKey(p => p.CommentId)
                .OnDelete(DeleteBehavior.Restrict);

            //builder
            //    .HasMany(p => p.SubComments)
            //    .WithOne(p => p.ParentComment)
            //    .HasForeignKey(f => f.ParentCommentId)
            //    .OnDelete(DeleteBehavior.Restrict);

            
        }
    }
}
