

namespace fso.DataExtensions.Models.Collections
{
    public class AddCollectionReturnModel : BaseFormReturnModel
    {
        public CollectionCard Collection { get; set; }
    }
    public class DeleteCollectionReturnModel : BaseReturnModel
    {
        public int CollectionId { get; set; }
    }
}
