using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace fso.IdentityData.Domains
{
    public class AppUser : IdentityUser<string>
    {
       public AppUser()
        {

        }
        public bool Active { get; set; }
        [StringLength(64)]
        public string Name { get; set; }
        [StringLength(64)]
        public string Surname { get; set; }
        [StringLength(32)]
        public string UName { get; set; }

        [StringLength(256)]
        public string Status { get; set; }

        [StringLength(256)]
        public string ProfilePageUrl { get; set; }
        /// <summary>
        /// Main Profile Picture Url
        /// </summary>
        [StringLength(256)]
        public string PictureUrl { get; set; }
        /// <summary>
        /// LOCALE (en-EN , tr-TR)
        /// </summary>
        [StringLength(16)]
        public string Locale { get; set; }
        
        /// <summary>
        /// BIRTHDATE
        /// </summary>
        public DateTime BirthDate { get; set; }
        /// <summary>
        /// UTC Register TIME AUTH
        /// </summary>
        public DateTime RegisterTime { get; set; }

        /// <summary>
        /// Navigation property for the roles this user belongs to.
        /// </summary>
        public virtual ICollection<IdentityUserRole<string>> Roles { get; } = new List<IdentityUserRole<string>>();

        /// <summary>
        /// Navigation property for the claims this user possesses.
        /// </summary>
        public virtual ICollection<IdentityUserClaim<string>> Claims { get; } = new List<IdentityUserClaim<string>>();

        /// <summary>
        /// Navigation property for this users login accounts.
        /// </summary>
        public virtual ICollection<IdentityUserLogin<string>> Logins { get; } = new List<IdentityUserLogin<string>>();

    }
}
