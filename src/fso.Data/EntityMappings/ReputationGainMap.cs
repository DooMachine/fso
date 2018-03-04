using fso.Core.Domains;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace fso.Data.EntityMappings
{
    public class ReputationGainMap : EntityTypeConfiguration<ReputationGain>
    {
        public override void Map(EntityTypeBuilder<ReputationGain> builder)
        {
            builder.HasKey(p => p.Id);
            builder
                .HasQueryFilter(p => !p.IsSoftDeleted);
        }
    }
}
