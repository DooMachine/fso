using fso.DataExtensions.Models.GroupReturnModels.GroupAdd;

namespace fso.DataExtensions.DataServices
{
    public interface IGroupActionService
    {
        AddGroupReturn AddGroup(AddGroupParameters model);
    }
}
