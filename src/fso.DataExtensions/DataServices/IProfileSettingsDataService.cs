using fso.DataExtensions.Models;

namespace fso.DataExtensions.DataServices
{
    public interface IProfileSettingsDataService
    {
        ProfileSettingsViewModel GetUserSettings(string currUserId);
        BaseReturnModel SaveUserSettings(ProfileSettingsPostViewModel model, string currUserId);
    }
}
