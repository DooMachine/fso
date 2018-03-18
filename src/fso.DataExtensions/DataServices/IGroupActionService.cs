using fso.DataExtensions.Models;

namespace fso.DataExtensions.DataServices
{
    public interface IGroupActionService
    {
        AddGroupReturn AddGroup(AddGroupParameters model);
    }
}
