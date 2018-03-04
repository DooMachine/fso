import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ActivityFeedActionTypes {
    GET_FEED = '[ActivityFeed] GET_FEED',
    GET_FEED_SUCCESS = '[ActivityFeed] GET_FEED_SUCCESS',
    GET_FEED_FAIL = '[ActivityFeed] GET_FEED_FAIL',

    LIKE_POST = '[ActivityFeed] LIKE_POST',
    LIKE_POST_SUCCESS = '[ActivityFeed] LIKE_POST_SUCCESS',
    LIKE_POST_FAIL = '[ActivityFeed] LIKE_POST_FAIL',

    UNLIKE_POST = '[ActivityFeed] UNLIKE_POST',
    UNLIKE_POST_SUCCESS = '[ActivityFeed] UNLIKE_POST_SUCCESS',
    UNLIKE_POST_FAIL = '[ActivityFeed] UNLIKE_POST_FAIL',

    LIKE_REVIEW = '[ActivityFeed] LIKE_REVIEW',
    LIKE_REVIEW_SUCCESS = '[ActivityFeed] LIKE_REVIEW_SUCCESS',
    LIKE_REVIEW_FAIL = '[ActivityFeed] LIKE_REVIEW_FAIL',

    UNLIKE_REVIEW = '[ActivityFeed] UNLIKE_REVIEW',
    UNLIKE_REVIEW_SUCCESS = '[ActivityFeed] UNLIKE_REVIEW_SUCCESS',
    UNLIKE_REVIEW_FAIL = '[ActivityFeed] UNLIKE_REVIEW_FAIL',

    DISLIKE_REVIEW = '[ActivityFeed] DISLIKE_REVIEW',
    DISLIKE_REVIEW_SUCCESS = '[ActivityFeed] DISLIKE_REVIEW_SUCCESS',
    DISLIKE_REVIEW_FAIL = '[ActivityFeed] DISLIKE_REVIEW_FAIL',

    UNDISLIKE_REVIEW = '[ActivityFeed] UNDISLIKE_REVIEW',
    UNDISLIKE_REVIEW_SUCCESS = '[ActivityFeed] UNDISLIKE_REVIEW_SUCCESS',
    UNDISLIKE_REVIEW_FAIL = '[ActivityFeed] UNDISLIKE_REVIEW_FAIL',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetFeedAction implements Action {
    readonly type = ActivityFeedActionTypes.GET_FEED;

    constructor(public payload?: any) { }
}

export class GetFeedSuccessAction implements Action {
    readonly type = ActivityFeedActionTypes.GET_FEED_SUCCESS;

    constructor(public payload: any) { }
}
export class GetFeedFailAction implements Action {
    readonly type = ActivityFeedActionTypes.GET_FEED_FAIL;

    constructor(public payload: any) { }
}

export class LikePostAction implements Action {
    readonly type = ActivityFeedActionTypes.LIKE_POST;

    constructor(public payload: {id: number, activityId: number}) { }
}

export class LikePostSuccessAction implements Action {
    readonly type = ActivityFeedActionTypes.LIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class LikePostFailAction implements Action {
    readonly type = ActivityFeedActionTypes.LIKE_POST_FAIL;

    constructor(public payload: any) { }
}
export class UnLikePostAction implements Action {
    readonly type = ActivityFeedActionTypes.UNLIKE_POST;

    constructor(public payload: {id: number, activityId: number}) { }
}

export class UnLikePostSuccessAction implements Action {
    readonly type = ActivityFeedActionTypes.UNLIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikePostFailAction implements Action {
    readonly type = ActivityFeedActionTypes.UNLIKE_POST_FAIL;

    constructor(public payload: any) { }
}

export class LikeReviewAction implements Action {
    readonly type = ActivityFeedActionTypes.LIKE_REVIEW;

    constructor(public payload: {id: number, activityId: number}) { }
}

export class LikeReviewSuccessAction implements Action {
    readonly type = ActivityFeedActionTypes.LIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class LikeReviewFailAction implements Action {
    readonly type = ActivityFeedActionTypes.LIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}

export class UnLikeReviewAction implements Action {
    readonly type = ActivityFeedActionTypes.UNLIKE_REVIEW;

    constructor(public payload: {id: number, activityId: number}) { }
}

export class UnLikeReviewSuccessAction implements Action {
    readonly type = ActivityFeedActionTypes.UNLIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikeReviewFailAction implements Action {
    readonly type = ActivityFeedActionTypes.UNLIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}

export class DislikeReviewAction implements Action {
    readonly type = ActivityFeedActionTypes.DISLIKE_REVIEW;

    constructor(public payload: {id: number, activityId: number}) { }
}

export class DislikeReviewSuccessAction implements Action {
    readonly type = ActivityFeedActionTypes.DISLIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class DislikeReviewFailAction implements Action {
    readonly type = ActivityFeedActionTypes.DISLIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}

export class UnDislikeReviewAction implements Action {
    readonly type = ActivityFeedActionTypes.UNDISLIKE_REVIEW;

    constructor(public payload: {id: number, activityId: number}) { }
}

export class UnDislikeReviewSuccessAction implements Action {
    readonly type = ActivityFeedActionTypes.UNDISLIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class UnDislikeReviewFailAction implements Action {
    readonly type = ActivityFeedActionTypes.UNDISLIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ActivityFeedActions
                        = GetFeedAction |
                        LikePostAction | 
                        LikePostSuccessAction |
                        LikePostFailAction |
                        UnLikePostAction | 
                        UnLikePostSuccessAction | 
                        UnLikePostFailAction | 
                        LikeReviewAction | 
                        LikeReviewSuccessAction | 
                        LikeReviewFailAction |
                        UnLikeReviewAction | 
                        UnLikeReviewSuccessAction |
                        UnLikeReviewFailAction | 
                        DislikeReviewAction | 
                        DislikeReviewSuccessAction |
                        DislikeReviewFailAction | 
                        UnDislikeReviewAction | 
                        UnDislikeReviewSuccessAction | 
                        UnDislikeReviewFailAction | 
                        GetFeedSuccessAction |
                        GetFeedFailAction;
