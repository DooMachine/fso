

namespace fso.EventCore.UserSettingsActions
{
    public class UserUpdatedProfileAction : BaseAction
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Status { get; set; }
        public string AppUserId { get; set; }
    }
}
