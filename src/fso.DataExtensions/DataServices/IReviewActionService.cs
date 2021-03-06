﻿using fso.DataExtensions.Models;

namespace fso.DataExtensions.DataServices
{
    public interface IReviewActionService
    {
        ReviewLikeResult LikeReview(string currUserId, int reviewId);
        ReviewLikeResult UnlikeReview(string currUserId, int reviewId);
        DeleteReviewModel DeleteReview(int reviewId,string currUserId);
        ReviewLikeResult DislikeReview(string currUserId, int reviewId);
        ReviewLikeResult UndislikeReview(string currUserId, int reviewId);

        AddReviewReturnModel AddReview(int postId, double rating, string content, string currUserId, string currUsername);
    }
}
