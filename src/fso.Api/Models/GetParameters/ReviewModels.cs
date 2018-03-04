

using System.ComponentModel.DataAnnotations;

namespace fso.Api.Models.GetParameters
{
    public class ReviewIdParameter
    {
        public int ReviewId { get; set; }
    }
    public class IdParameter
    {
        public int Id { get; set; }
    }
    public class UserNameParameters : WithBasePaginateParameters
    {
        public string Username { get; set; }
    }
    public class PostIdParameters : WithBasePaginateParameters
    {
        public int PostId { get; set; }
    }
    public class AddReviewParameters
    {
        [Required]
        public int PostId { get; set; }
        [Required]
        [Range(1,10,ErrorMessage ="Min 1 and max 10 rating can assigned to review")]
        public double Rating { get; set; }
        [Required]
        [StringLength(10240)]
        public string Content { get; set; }
    }
}
