using System;
using System.Reflection;

namespace fso.Core
{
    public class BaseMMEntity : IBaseMMEntity
    {

        /// <summary>
        /// Gets or sets the Date Entity Added (Utc)
        /// </summary>
        public DateTime DateUtcAdd { get; set; }

        public DateTime DateUtcModified { get; set; }
        /// <summary>
        /// Soft Delete Property
        /// </summary>
        public bool IsSoftDeleted { get; set; }

    }
    public interface IBaseMMEntity
    {

    }
}
