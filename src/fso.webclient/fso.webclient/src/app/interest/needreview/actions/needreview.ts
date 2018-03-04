import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum NeedReviewActionTypes {
    GET_NEED_REVIEWS = '[NeedReview] GET_NEED_REVIEWS',
    GET_NEED_REVIEWS_SUCCESS = '[NeedReview] GET_NEED_REVIEWS_SUCCESS',
    GET_NEED_REVIEWS_FAIL = '[NeedReview] GET_NEED_REVIEWS_FAIL',

    LIKE_POST = '[NeedReview] LIKE_POST',
    LIKE_POST_SUCCESS = '[NeedReview] LIKE_POST_SUCCESS',
    LIKE_POST_FAIL = '[NeedReview] LIKE_POST_FAIL',

    UNLIKE_POST = '[NeedReview] UNLIKE_POST',
    UNLIKE_POST_SUCCESS = '[NeedReview] UNLIKE_POST_SUCCESS',
    UNLIKE_POST_FAIL = '[NeedReview] UNLIKE_POST_FAIL',

    FOLLOW_USER  = '[NeedReview] FOLLOW_USER',
    FOLLOW_USER_SUCCESS = '[NeedReview] FOLLOW_USER_SUCCESS',
    FOLLOW_USER_FAIL = '[NeedReview] FOLLOW_USER_FAIL',

    UNFOLLOW_USER  = '[NeedReview] UNFOLLOW_USER',
    UNFOLLOW_USER_SUCCESS = '[NeedReview] UNFOLLOW_USER_SUCCESS',
    UNFOLLOW_USER_FAIL = '[NeedReview] UNFOLLOW_USER_FAIL',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class GetNeedReviews implements Action {
    readonly type = NeedReviewActionTypes.GET_NEED_REVIEWS;

    constructor(public payload?: any) { }
}

export class GetNeedReviewsSuccess implements Action {
    readonly type = NeedReviewActionTypes.GET_NEED_REVIEWS_SUCCESS;

    constructor(public payload?: any) { }
}
export class GetNeedReviewsFail implements Action {
    readonly type = NeedReviewActionTypes.GET_NEED_REVIEWS_FAIL;

    constructor(public payload?: any) { }
}

export class LikeInterestPostAction implements Action {
    readonly type = NeedReviewActionTypes.LIKE_POST;

    constructor(public payload:any) { }
}

export class LikePostSuccessAction implements Action {
    readonly type = NeedReviewActionTypes.LIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class LikePostFailAction implements Action {
    readonly type = NeedReviewActionTypes.LIKE_POST_FAIL;

    constructor(public payload: any) { }
}
export class UnLikeInterestPostAction implements Action {
    readonly type = NeedReviewActionTypes.UNLIKE_POST;

    constructor(public payload:any) { }
}

export class UnLikePostSuccessAction implements Action {
    readonly type = NeedReviewActionTypes.UNLIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikePostFailAction implements Action {
    readonly type = NeedReviewActionTypes.UNLIKE_POST_FAIL;

    constructor(public payload: any) { }
}
export class FollowUser implements Action {
    readonly type = NeedReviewActionTypes.FOLLOW_USER;

    constructor(public payload:any) { }
}

export class FollowUserSuccess implements Action {
    readonly type = NeedReviewActionTypes.FOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class FollowUserFail implements Action {
    readonly type = NeedReviewActionTypes.FOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}
export class UnfollowUser implements Action {
    readonly type = NeedReviewActionTypes.UNFOLLOW_USER;

    constructor(public payload:any) { }
}

export class UnfollowUserSuccess implements Action {
    readonly type = NeedReviewActionTypes.UNFOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class UnfollowUserFail implements Action {
    readonly type = NeedReviewActionTypes.UNFOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type NeedReviewActions
                        = GetNeedReviews
                        | GetNeedReviewsSuccess
                        | GetNeedReviewsFail
                        | LikeInterestPostAction | 
                        LikePostSuccessAction |
                        LikePostFailAction |
                        UnLikeInterestPostAction | 
                        UnLikePostSuccessAction | 
                        UnLikePostFailAction
                        | FollowUser
                        | FollowUserSuccess
                        | FollowUserFail
                        | UnfollowUser
                        | UnfollowUserSuccess
                        | UnfollowUserFail;
