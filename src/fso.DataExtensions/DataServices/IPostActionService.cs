using fso.DataExtensions.Models;
using System;

namespace fso.DataExtensions.DataServices
{
    public interface IPostActionService
    {
        LikePostReturn LikePost(int postId, string currUserId);
        LikePostReturn UnlikePost(int postId, string currUserId);
        PublishPostReturnModel PublishPost(PublishPostParameters model, string currUserId);
        DeletePostReturnModel DeletePost(int postId, string currUserId);
        SaveEditingPostReturnModel SaveEditingPost(SaveEditingPostParameters model, string currUserId);
    }
}
