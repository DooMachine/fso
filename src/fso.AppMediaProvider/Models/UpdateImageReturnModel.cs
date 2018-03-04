
namespace fso.AppMediaProvider.Models
{
    public class UpdateUserImageReturnModel
    {
        public UpdateUserImageReturnModel()
        {
            CurrentProfileImageUrl = null;
            Error = null;
            IsSucceed = true;
        }
        public string Error { get; set; }
        public string CurrentProfileImageUrl { get; set; }
        public bool IsSucceed { get; set; }
    }
}
