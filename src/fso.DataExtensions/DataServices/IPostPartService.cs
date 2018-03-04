using fso.DataExtensions.Models;

namespace fso.DataExtensions.DataServices
{
    public interface IPostPartService
    {
        AddPostPartReturnModel AddPostPart(int postId, string title, string currUserId);
        RemovePostPartReturnModel RemovePostPart(int PostPartId, string currUserId);
    }
}
