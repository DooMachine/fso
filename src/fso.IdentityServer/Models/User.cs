
using System;
using System.ComponentModel.DataAnnotations;

namespace fso.IdentityServer.Models
{
    public class User
    {
        [Key]
        public string Id { get; set; }
        [StringLength(128)]
        public string Password { get; set; }
        public bool Active { get; set; }
        [StringLength(64)]
        public string Name { get; set; }
        [StringLength(64)]
        public string Surname { get; set; }
        [StringLength(128)]
        public string Email { get; set; }
        public bool EmailVerified { get; set; }

        public string PhoneNumber { get; set; }
        public bool PhoneNumberVerified { get; set; }
        public string Username { get; set; }

        [StringLength(256)]
        public string ProfilePageUrl { get; set; }
        /// <summary>
        /// ProfilePictureUrl
        /// </summary>
        [StringLength(256)]
        public string PictureUrl { get; set; }
        /// <summary>
        /// LOCALE (en-EN , tr-TR)
        /// </summary>
        [StringLength(16)]
        public string Locale { get; set; }

        [StringLength(256)]
        public string IdentityProvider { get; set; }
        /// <summary>
        /// BIRTHDATE
        /// </summary>
        public DateTime BirthDate { get; set; }
        /// <summary>
        /// UTC TİME AUTH
        /// </summary>
        public DateTime AuthenticationTime { get; set; }
    }
}
