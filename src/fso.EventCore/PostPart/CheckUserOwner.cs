

namespace fso.EventCore
{
    public class CheckUserPostPartOwner
    {
        public string UserId { get; set; }
        public int PostPartId { get; set; }
    }
    public class CheckUserPostPartOwnerResponse
    {
        public bool IsOkay { get; set; }
    }
    public class CheckUserCollectionOwner
    {
        public string UserId { get; set; }
        public int CollectionId { get; set; }
    }
    public class CheckUserCollectionOwnerResponse
    {
        public bool IsOkay { get; set; }
    }
}
