namespace fso.Core.Domains
{
    public class PostPart : BaseEntity
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public virtual Post Post { get; set; }
        public int? PostId { get; set; }

        public virtual AppMediaFile Image { get; set; }
        public int? ImageId { get; set; }

        

    }
}
