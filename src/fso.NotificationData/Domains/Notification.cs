using fso.Core;

namespace fso.NotificationData.Domains
{
    public class Notification : BaseEntity
    {              
        public string UserId { get; set; }
        public string ActivityUserJsonArray { get; set; }
        public string RedirectUrl { get; set; }
        public bool IsSeen { get; set; }
        public NotificationType NotificationType { get; set; }        
        public string ImageUrl { get; set; }
        public string ActivityDescription { get; set; }
        public int EntityId { get; set; }
    }

    public enum NotificationType
    {
        Followed,
        Post_Reviewed,
        Post_Commended,
        Post_Favourited,
        Review_Commended,
        Review_Liked,
        Comment_Commended,
        Registered
    }
}
