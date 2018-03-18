using fso.Core.Domains;
using System.ComponentModel.DataAnnotations;

namespace fso.DataExtensions.Models
{
    public class ProfileSettingsViewModel
    {
        [StringLength(128)]
        public string Name { get; set; }
        [StringLength(128)]
        public string Surname { get; set; }
        [StringLength(512)]
        public string Status { get; set; }
        [StringLength(64)]
        public string UName { get; set; }

        public string CurrentProfileImageUrl { get; set; }

        public UserFollowSetting FollowSetting { get; set; }

        public UserPrivacySetting PrivacySettings { get; set; }
    }
    public class ProfileSettingsPostViewModel
    {
        [StringLength(128)]
        public string Name { get; set; }
        [StringLength(128)]
        public string Surname { get; set; }
        [StringLength(512)]
        public string Status { get; set; }
        [StringLength(64)]
        public string UName { get; set; }
        

        public int SelectedFollowSettings { get; set; }

        public int SelectedPrivacySettings { get; set; }
    }
}
