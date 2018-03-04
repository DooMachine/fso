

using System.ComponentModel.DataAnnotations;

namespace fso.Api.Models.GetParameters
{
    public class AddCollectionParameters
    {
        [Required]
        [StringLength(64)]
        public string Name { get; set; }
        [StringLength(512)]
        public string Description { get; set; }
    }
    public class CollectionIndexParameters
    {
        [Required]
        public int Id { get; set; }
        public int PostPageIndex { get; set; } = 1;
        public int PostPageSize { get; set; } = 4;
    }
}
