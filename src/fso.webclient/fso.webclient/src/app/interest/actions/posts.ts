import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum InterestPostActionTypes {
    GET_POSTS = '[Interest Posts] GET_POSTS',
    GET_POSTS_SUCCESS = '[Interest Posts] GET_POSTS_SUCCESS',
    GET_POSTS_FAIL = '[Interest Posts] GET_POSTS_FAIL',

    LIKE_POST = '[Interest Posts] LIKE_POST',
    LIKE_POST_SUCCESS = '[Interest Posts] LIKE_POST_SUCCESS',
    LIKE_POST_FAIL = '[Interest Posts] LIKE_POST_FAIL',

    UNLIKE_POST = '[Interest Posts] UNLIKE_POST',
    UNLIKE_POST_SUCCESS = '[Interest Posts] UNLIKE_POST_SUCCESS',
    UNLIKE_POST_FAIL = '[Interest Posts] UNLIKE_POST_FAIL',

    FOLLOW_USER  = '[Interest Posts] FOLLOW_USER',
    FOLLOW_USER_SUCCESS = '[Interest Posts] FOLLOW_USER_SUCCESS',
    FOLLOW_USER_FAIL = '[Interest Posts] FOLLOW_USER_FAIL',

    UNFOLLOW_USER  = '[Interest Posts] UNFOLLOW_USER',
    UNFOLLOW_USER_SUCCESS = '[Interest Posts] UNFOLLOW_USER_SUCCESS',
    UNFOLLOW_USER_FAIL = '[Interest Posts] UNFOLLOW_USER_FAIL',
    
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetInterestPostAction implements Action {
    readonly type = InterestPostActionTypes.GET_POSTS;

    constructor(public payload?: any) { }
}

export class GetPostSuccessAction implements Action {
    readonly type = InterestPostActionTypes.GET_POSTS_SUCCESS;

    constructor(public payload: any) { }
}
export class GetPostFailAction implements Action {
    readonly type = InterestPostActionTypes.GET_POSTS_FAIL;

    constructor(public payload: any) { }
}

export class LikeInterestPostAction implements Action {
    readonly type = InterestPostActionTypes.LIKE_POST;

    constructor(public payload:any) { }
}

export class LikePostSuccessAction implements Action {
    readonly type = InterestPostActionTypes.LIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class LikePostFailAction implements Action {
    readonly type = InterestPostActionTypes.LIKE_POST_FAIL;

    constructor(public payload: any) { }
}
export class UnLikeInterestPostAction implements Action {
    readonly type = InterestPostActionTypes.UNLIKE_POST;

    constructor(public payload:any) { }
}

export class UnLikePostSuccessAction implements Action {
    readonly type = InterestPostActionTypes.UNLIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikePostFailAction implements Action {
    readonly type = InterestPostActionTypes.UNLIKE_POST_FAIL;

    constructor(public payload: any) { }
}
export class FollowUser implements Action {
    readonly type = InterestPostActionTypes.FOLLOW_USER;

    constructor(public payload:any) { }
}

export class FollowUserSuccess implements Action {
    readonly type = InterestPostActionTypes.FOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class FollowUserFail implements Action {
    readonly type = InterestPostActionTypes.FOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}
export class UnfollowUser implements Action {
    readonly type = InterestPostActionTypes.UNFOLLOW_USER;

    constructor(public payload:any) { }
}

export class UnfollowUserSuccess implements Action {
    readonly type = InterestPostActionTypes.UNFOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class UnfollowUserFail implements Action {
    readonly type = InterestPostActionTypes.UNFOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type InterestPostActions
                        = GetInterestPostAction
                        | GetPostSuccessAction
                        | GetPostFailAction
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
