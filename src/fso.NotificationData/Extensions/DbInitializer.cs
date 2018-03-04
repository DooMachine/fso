using fso.Core.Domains;
using fso.Core.Domains.MMEntities;
using fso.NotificationData.Data;
using System;
using System.Collections.Generic;

namespace fso.NotificationData.Extensions
{

    public class DbInitializer : IDbInitializer
    {
        private readonly NotificationContext _context;
        public DbInitializer(
            NotificationContext context
            )
        {
            _context = context;
        }
        public void Initialize()
        {
            _context.Database.EnsureCreated();            

        }
    }
}
