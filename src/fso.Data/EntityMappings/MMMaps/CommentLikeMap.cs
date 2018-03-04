using fso.Core.Domains;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace fso.Data.EntityMappings
{
    public class CommentLikeMap : EntityTypeConfiguration<CommentUser>
    {
        public override void Map(EntityTypeBuilder<CommentUser> builder)
        {
            builder.HasKey(p =>new {p.CommentId,p.UserInfoId });
        }
    }
}
