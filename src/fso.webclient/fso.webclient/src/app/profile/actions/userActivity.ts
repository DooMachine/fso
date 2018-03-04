import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum UserActivityActionTypes {
    GET_USER_ACTIVITIES = '[UserActivity] GET_USER_ACTIVITIES',
    GET_USER_ACTIVITIES_SUCCESS = '[UserActivity] GET_USER_ACTIVITIES_SUCCESS',
    GET_USER_ACTIVITIES_FAIL = '[UserActivity] GET_USER_ACTIVITIES_FAIL',

    LIKE_POST = '[UserActivity] LIKE_POST',
    LIKE_POST_SUCCESS = '[UserActivity] LIKE_POST_SUCCESS',
    LIKE_POST_FAIL = '[UserActivity] LIKE_POST_FAIL',

    UNLIKE_POST = '[UserActivity] UNLIKE_POST',
    UNLIKE_POST_SUCCESS = '[UserActivity] UNLIKE_POST_SUCCESS',
    UNLIKE_POST_FAIL = '[UserActivity] UNLIKE_POST_FAIL',

    LIKE_REVIEW = '[UserActivity] LIKE_REVIEW',
    LIKE_REVIEW_SUCCESS = '[UserActivity] LIKE_REVIEW_SUCCESS',
    LIKE_REVIEW_FAIL = '[UserActivity] LIKE_REVIEW_FAIL',

    UNLIKE_REVIEW = '[UserActivity] UNLIKE_REVIEW',
    UNLIKE_REVIEW_SUCCESS = '[UserActivity] UNLIKE_REVIEW_SUCCESS',
    UNLIKE_REVIEW_FAIL = '[UserActivity] UNLIKE_REVIEW_FAIL',

    DISLIKE_REVIEW = '[UserActivity] DISLIKE_REVIEW',
    DISLIKE_REVIEW_SUCCESS = '[UserActivity] DISLIKE_REVIEW_SUCCESS',
    DISLIKE_REVIEW_FAIL = '[UserActivity] DISLIKE_REVIEW_FAIL',

    UNDISLIKE_REVIEW = '[UserActivity] UNDISLIKE_REVIEW',
    UNDISLIKE_REVIEW_SUCCESS = '[UserActivity] UNDISLIKE_REVIEW_SUCCESS',
    UNDISLIKE_REVIEW_FAIL = '[UserActivity] UNDISLIKE_REVIEW_FAIL',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetUserActivitiesAction implements Action {
    readonly type = UserActivityActionTypes.GET_USER_ACTIVITIES;

    constructor(public payload: any) { }
}

export class GetUserActivitiesSuccessAction implements Action {
    readonly type = UserActivityActionTypes.GET_USER_ACTIVITIES_SUCCESS;

    constructor(public payload: any) { }
}
export class GetUserActivitiesFailAction implements Action {
    readonly type = UserActivityActionTypes.GET_USER_ACTIVITIES_FAIL;

    constructor(public payload: any) { }
}

export class LikePostAction implements Action {
    readonly type = UserActivityActionTypes.LIKE_POST;

    constructor(public payload: {id: number, activityId: number}) { }
}

export class LikePostSuccessAction implements Action {
    readonly type = UserActivityActionTypes.LIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class LikePostFailAction implements Action {
    readonly type = UserActivityActionTypes.LIKE_POST_FAIL;

    constructor(public payload: any) { }
}
export class UnLikePostAction implements Action {
    readonly type = UserActivityActionTypes.UNLIKE_POST;

    constructor(public payload: {id: number, activityId: number}) { }
}

export class UnLikePostSuccessAction implements Action {
    readonly type = UserActivityActionTypes.UNLIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikePostFailAction implements Action {
    readonly type = UserActivityActionTypes.UNLIKE_POST_FAIL;

    constructor(public payload: any) { }
}

export class LikeReviewAction implements Action {
    readonly type = UserActivityActionTypes.LIKE_REVIEW;

    constructor(public payload: {id: number, activityId: number}) { }
}

export class LikeReviewSuccessAction implements Action {
    readonly type = UserActivityActionTypes.LIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class LikeReviewFailAction implements Action {
    readonly type = UserActivityActionTypes.LIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}

export class UnLikeReviewAction implements Action {
    readonly type = UserActivityActionTypes.UNLIKE_REVIEW;

    constructor(public payload: {id: number, activityId: number}) { }
}

export class UnLikeReviewSuccessAction implements Action {
    readonly type = UserActivityActionTypes.UNLIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikeReviewFailAction implements Action {
    readonly type = UserActivityActionTypes.UNLIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}

export class DislikeReviewAction implements Action {
    readonly type = UserActivityActionTypes.DISLIKE_REVIEW;

    constructor(public payload: {id: number, activityId: number}) { }
}

export class DislikeReviewSuccessAction implements Action {
    readonly type = UserActivityActionTypes.DISLIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class DislikeReviewFailAction implements Action {
    readonly type = UserActivityActionTypes.DISLIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}

export class UnDislikeReviewAction implements Action {
    readonly type = UserActivityActionTypes.UNDISLIKE_REVIEW;

    constructor(public payload: {id: number, activityId: number}) { }
}

export class UnDislikeReviewSuccessAction implements Action {
    readonly type = UserActivityActionTypes.UNDISLIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class UnDislikeReviewFailAction implements Action {
    readonly type = UserActivityActionTypes.UNDISLIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type UserActivityActions
                        = GetUserActivitiesAction |
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
                        GetUserActivitiesSuccessAction |
                        GetUserActivitiesFailAction;
