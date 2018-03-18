using fso.Core.Domains;
using fso.Data.Extensions;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace fso.Data.EntityRepositories
{
    public class ProfileSettingsDataService : IProfileSettingsDataService
    {
        private readonly IEntityContext _entityContext;
        private readonly DbSet<UserInfo> _dbSet;
        public ProfileSettingsDataService(
            IEntityContext entityContext
            )
        {
            _entityContext = entityContext;
            _dbSet = _entityContext.Set<UserInfo>();
        }
        public ProfileSettingsViewModel GetUserSettings(string currUserId)
        {
            UserInfo uInfo = _dbSet.Include(p=>p.ProfilePicture).AsNoTracking().FirstOrDefault(p => p.AppUserId == currUserId);
            ProfileSettingsViewModel model = new ProfileSettingsViewModel()
            {
                FollowSetting = uInfo.FollowSetting,
                Name = uInfo.Name,
                PrivacySettings = uInfo.PrivacySetting,
                Status = uInfo.Status,
                Surname = uInfo.Surname,
                UName = uInfo.UName
            };
            if (uInfo.ProfilePicture != null)
            {
                model.CurrentProfileImageUrl = uInfo.ProfilePicture.SmallPath;
            }
            return model;
        }
        public BaseReturnModel SaveUserSettings(ProfileSettingsPostViewModel model, string currUserId)
        {
            BaseReturnModel ret = new BaseReturnModel();
            UserInfo uInfo = _dbSet.FirstOrDefault(p => p.AppUserId == currUserId);
            uInfo.PrivacySetting = (UserPrivacySetting)model.SelectedPrivacySettings;
            uInfo.FollowSetting = (UserFollowSetting) model.SelectedFollowSettings;
            uInfo.Name = TagHelpers.RemoveUnwantedTags(model.Name);
            uInfo.Status = TagHelpers.RemoveUnwantedTags(model.Status);
            // uInfo.UName = model.UName;
            uInfo.Surname = TagHelpers.RemoveUnwantedTags(model.Surname);
            _dbSet.Update(uInfo);
            if (!(_entityContext.SaveChanges()==0))
            {
                ret.IsActionSucceed = true;
            }
            return ret;
        }
    }
}
