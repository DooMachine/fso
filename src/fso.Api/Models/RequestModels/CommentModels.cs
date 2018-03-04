using System.ComponentModel.DataAnnotations;

namespace fso.Api.Models.RequestModels
{
    public class CommentAddModel
    {
        [StringLength(1024)]
        public string Content { get; set; }
        public int ReviewId { get; set; }
    }
}
