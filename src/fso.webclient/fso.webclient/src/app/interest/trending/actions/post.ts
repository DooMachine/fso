import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum InterestTrendingActionTypes {
    GET_TRENDING_POSTS = '[InterestTrending] GET_TRENDING_POSTS',
    GET_TRENDING_POSTS_SUCCESS = '[InterestTrending] GET_TRENDING_POSTS_SUCCESS',
    GET_TRENDING_POSTS_FAIL = '[InterestTrending] GET_TRENDING_POSTS_FAIL',

    LIKE_POST = '[InterestTrending] LIKE_POST',
    LIKE_POST_SUCCESS = '[InterestTrending] LIKE_POST_SUCCESS',
    LIKE_POST_FAIL = '[InterestTrending] LIKE_POST_FAIL',

    UNLIKE_POST = '[InterestTrending] UNLIKE_POST',
    UNLIKE_POST_SUCCESS = '[InterestTrending] UNLIKE_POST_SUCCESS',
    UNLIKE_POST_FAIL = '[InterestTrending] UNLIKE_POST_FAIL',

    FOLLOW_USER  = '[InterestTrending] FOLLOW_USER',
    FOLLOW_USER_SUCCESS = '[InterestTrending] FOLLOW_USER_SUCCESS',
    FOLLOW_USER_FAIL = '[InterestTrending] FOLLOW_USER_FAIL',

    UNFOLLOW_USER  = '[InterestTrending] UNFOLLOW_USER',
    UNFOLLOW_USER_SUCCESS = '[InterestTrending] UNFOLLOW_USER_SUCCESS',
    UNFOLLOW_USER_FAIL = '[InterestTrending] UNFOLLOW_USER_FAIL',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class GetInterestTrendings implements Action {
    readonly type = InterestTrendingActionTypes.GET_TRENDING_POSTS;

    constructor(public payload?: any) { }
}

export class GetInterestTrendingsSuccess implements Action {
    readonly type = InterestTrendingActionTypes.GET_TRENDING_POSTS_SUCCESS;

    constructor(public payload?: any) { }
}
export class GetInterestTrendingsFail implements Action {
    readonly type = InterestTrendingActionTypes.GET_TRENDING_POSTS_FAIL;

    constructor(public payload?: any) { }
}

export class LikeInterestPostAction implements Action {
    readonly type = InterestTrendingActionTypes.LIKE_POST;

    constructor(public payload:any) { }
}

export class LikePostSuccessAction implements Action {
    readonly type = InterestTrendingActionTypes.LIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class LikePostFailAction implements Action {
    readonly type = InterestTrendingActionTypes.LIKE_POST_FAIL;

    constructor(public payload: any) { }
}
export class UnLikeInterestPostAction implements Action {
    readonly type = InterestTrendingActionTypes.UNLIKE_POST;

    constructor(public payload:any) { }
}

export class UnLikePostSuccessAction implements Action {
    readonly type = InterestTrendingActionTypes.UNLIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikePostFailAction implements Action {
    readonly type = InterestTrendingActionTypes.UNLIKE_POST_FAIL;

    constructor(public payload: any) { }
}
export class FollowUser implements Action {
    readonly type = InterestTrendingActionTypes.FOLLOW_USER;

    constructor(public payload:any) { }
}

export class FollowUserSuccess implements Action {
    readonly type = InterestTrendingActionTypes.FOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class FollowUserFail implements Action {
    readonly type = InterestTrendingActionTypes.FOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}
export class UnfollowUser implements Action {
    readonly type = InterestTrendingActionTypes.UNFOLLOW_USER;

    constructor(public payload:any) { }
}

export class UnfollowUserSuccess implements Action {
    readonly type = InterestTrendingActionTypes.UNFOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class UnfollowUserFail implements Action {
    readonly type = InterestTrendingActionTypes.UNFOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type InterestTrendingActions
                        = GetInterestTrendings
                        | GetInterestTrendingsSuccess
                        | GetInterestTrendingsFail
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
