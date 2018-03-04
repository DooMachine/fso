using fso.DataExtensions.Models;
using fso.DataExtensions.Models.Collections;

namespace fso.DataExtensions.DataServices
{
    public interface IPostCollectionDataService
    {
        CollectionIndexReturnModel GetCollection(int collectionId, int postPageIndex, int postPageSize ,string currUserId);
        PaginatedPostCardReturn GetCollectionPosts(int collectionId, int pageIndex, int pageSize, string currUserId);
    }
}
