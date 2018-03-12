using System.ComponentModel.DataAnnotations;

namespace fso.IdentityProvider.Models.AccountViewModels
{
    
    
    public class LoginInputModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Display(Name = "Remember me!")]
        public bool RememberLogin { get; set; }
        public string ReturnUrl { get; set; }
    }
    
}
