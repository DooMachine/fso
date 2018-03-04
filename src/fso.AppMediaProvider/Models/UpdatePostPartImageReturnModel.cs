

namespace fso.AppMediaProvider.Models
{
    public class UpdatePostPartImageReturnModel
    {
        public UpdatePostPartImageReturnModel()
        {
            Error = null;
            IsSucceed = true;
        }
        public string Error { get; set; }
        public bool IsSucceed { get; set; }
        public int PostPartId { get; set; }
        public string SmallImageUrl { get; set; }
        public string ThumbImageUrl { get; set; }
        public string LargeImageUrl { get; set; }
    }
    public class UpdatePostCollectionImageReturnModel
    {
        public UpdatePostCollectionImageReturnModel()
        {
            Error = null;
            IsSucceed = true;
        }
        public string Error { get; set; }
        public bool IsSucceed { get; set; }
        public int PostCollectionId { get; set; }
        public string SmallImageUrl { get; set; }
        public string ThumbImageUrl { get; set; }
    }
    public class UpdateGroupCoverImageReturnModel
    {
        public UpdateGroupCoverImageReturnModel()
        {
            Error = null;
            IsSucceed = true;
        }
        public string Error { get; set; }
        public bool IsSucceed { get; set; }
        public int GroupId { get; set; }
        public string SmallImageUrl { get; set; }
        public string LargeImageUrl { get; set; }
        public string ThumbImageUrl { get; set; }
    }
}
