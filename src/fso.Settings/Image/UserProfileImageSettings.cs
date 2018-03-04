using System;
using System.Collections.Generic;
using System.Text;

namespace fso.Settings.Image
{
    public class UserProfileImageSettings
    {
        /// <summary>
        /// Change "{#appUserId}" with user id
        /// </summary>
        public string UserImageUrlTemplate { get; set; }
        /// <summary>
        /// Width and Height by pixel (Default 230)
        /// </summary>
        public int UserImageWidth { get; set; } = 230;
        /// <summary>
        /// Width and Height by pixel (Default 230)
        /// </summary>
        public int UserImageHeight { get; set; } = 230;
        /// <summary>
        /// Use this property to get full template. Replace "{#appUserId}" with user id
        /// </summary>
        // public string UserImageFullTemplate { get => UserImageUrlTemplate + UserImageWidth + "x" + UserImageHeight+".jpeg"; }
    }
}
