

namespace fso.EventCore.PostActions
{
    public class UserPostUnfavouritedAction : BaseAction
    {
        public string UserId { get; set; }
        public string PostAuthorId { get; set; }
        public int PostId { get; set; }
    }
}
