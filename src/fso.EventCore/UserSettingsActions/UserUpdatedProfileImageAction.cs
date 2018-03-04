
namespace fso.EventCore.UserSettingsActions
{
    public class UserUpdatedProfileImageAction : BaseAction
    {
        public string UserId { get; set; }
        public string ImagePath { get; set; }
    }
}
