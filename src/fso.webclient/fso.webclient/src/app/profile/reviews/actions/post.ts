import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum PostActionTypes {
    GET_POSTS = '[UserReviews] GET_POSTS',
    GET_POSTS_SUCCESS = '[UserReviews] GET_POSTS_SUCCESS',
    GET_POSTS_FAIL = '[UserReviews] GET_POSTS_FAIL',

    LIKE_POST = '[UserReviews] LIKE_POST',
    LIKE_POST_SUCCESS = '[UserReviews] LIKE_POST_SUCCESS',
    LIKE_POST_FAIL = '[UserReviews] LIKE_POST_FAIL',

    UNLIKE_POST = '[UserReviews] UNLIKE_POST',
    UNLIKE_POST_SUCCESS = '[UserReviews] UNLIKE_POST_SUCCESS',
    UNLIKE_POST_FAIL = '[UserReviews] UNLIKE_POST_FAIL',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetPostAction implements Action {
    readonly type = PostActionTypes.GET_POSTS;

    constructor(public payload: any) { }
}

export class GetPostSuccessAction implements Action {
    readonly type = PostActionTypes.GET_POSTS_SUCCESS;

    constructor(public payload: any) { }
}
export class GetPostFailAction implements Action {
    readonly type = PostActionTypes.GET_POSTS_FAIL;

    constructor(public payload: any) { }
}

export class LikePostAction implements Action {
    readonly type = PostActionTypes.LIKE_POST;

    constructor(public payload:any) { }
}

export class LikePostSuccessAction implements Action {
    readonly type = PostActionTypes.LIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class LikePostFailAction implements Action {
    readonly type = PostActionTypes.LIKE_POST_FAIL;

    constructor(public payload: any) { }
}
export class UnLikePostAction implements Action {
    readonly type = PostActionTypes.UNLIKE_POST;

    constructor(public payload:any) { }
}

export class UnLikePostSuccessAction implements Action {
    readonly type = PostActionTypes.UNLIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikePostFailAction implements Action {
    readonly type = PostActionTypes.UNLIKE_POST_FAIL;

    constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PostActions
                        = GetPostAction
                        | GetPostSuccessAction
                        | GetPostFailAction
                        | LikePostAction | 
                        LikePostSuccessAction |
                        LikePostFailAction |
                        UnLikePostAction | 
                        UnLikePostSuccessAction | 
                        UnLikePostFailAction;
