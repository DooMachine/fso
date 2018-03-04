
namespace fso.EventCore.PostActions
{
    public class UserPostFavouritedAction : BaseAction
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public string PostAuthorId { get; set; }
        public int PostId { get; set; }
    }
}
