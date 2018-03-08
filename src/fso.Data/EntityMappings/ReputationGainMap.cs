using fso.Core.Domains;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using MySql.Data.EntityFrameworkCore.Extensions;

namespace fso.Data.EntityMappings
{
    public class ReputationGainMap : EntityTypeConfiguration<ReputationGain>
    {
        public override void Map(EntityTypeBuilder<ReputationGain> builder)
        {
            builder.HasKey(p => p.Id);
            builder.ForMySQLHasCollation("utf8mb4");
            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
        }
    }
}
