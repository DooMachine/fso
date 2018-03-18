

using fso.DataExtensions.Models;

namespace fso.DataExtensions.DataServices
{
    public interface IPostCollectionActionService
    {
        
        AddCollectionReturnModel AddCollection(string name, string description, string currUserId);
        DeleteCollectionReturnModel DeleteCollection(int id, string currUserId);
    }
}
