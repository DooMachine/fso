namespace fso.Core.Domains
{
    /// <summary>
    /// TODO: IMPLEMENT A MICROSERVICE 
    /// </summary>
    public class Notification : BaseEntity
    {
        public string Content { get; set; }

        public string RedirectUrl { get; set; }

        public bool IsSeen { get; set; }

        public NotificationType NotificationType  { get; set; }

        public virtual UserInfo UserInfo { get; set; }
        public string UserInfoId { get; set; }

        public virtual Image Image { get; set; }
        public int? ImageId { get; set; }
    }

    public enum NotificationType
    {
        Followed,Post_Reviewed,Post_Commended,Review_Commended,Comment_Commended,Registered
    }
}
