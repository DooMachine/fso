
using Newtonsoft.Json;

namespace fso.DataExtensions.Models
{
    public class UserInfoExtraSmall
    {
        public UserInfoExtraSmall()
        {

        }
        public string AppUserId { get; set; }
        /// <summary>
        /// Set/Get Small Size Profile Image Url
        /// </summary>
        public string ProfileImage { get; set; } 
        [JsonIgnore]
        public string ProfileImageUnsafe => "http://localhost:7100/fimg/u/" + AppUserId + "/230x230.jpeg";

        public string UserName { get; set; }
    }
}
