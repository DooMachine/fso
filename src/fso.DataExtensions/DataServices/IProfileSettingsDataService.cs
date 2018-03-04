using fso.DataExtensions.Models;
using fso.DataExtensions.Models.ProfileSettings;

namespace fso.DataExtensions.DataServices
{
    public interface IProfileSettingsDataService
    {
        ProfileSettingsViewModel GetUserSettings(string currUserId);
        BaseReturnModel SaveUserSettings(ProfileSettingsPostViewModel model, string currUserId);
    }
}
