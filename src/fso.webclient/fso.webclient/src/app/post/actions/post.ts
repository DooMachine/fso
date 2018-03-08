import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum PostActionTypes {
    GET_POST = '[Post] GET_POST',
    GET_POST_SUCCESS = '[Post] GET_POST_SUCCESS',
    GET_POST_FAIL = '[Post] GET_POST_FAIL',

    SET_LOADING = '[Post] SET_LOADING',

    LIKE_POST = '[Post] LIKE_POST',
    LIKE_POST_SUCCESS = '[Post] LIKE_POST_SUCCESS',
    LIKE_POST_FAIL = '[Post] LIKE_POST_FAIL',

    UNLIKE_POST = '[Post] UNLIKE_POST',
    UNLIKE_POST_SUCCESS = '[Post] UNLIKE_POST_SUCCESS',
    UNLIKE_POST_FAIL = '[Post] UNLIKE_POST_FAIL',

    DELETE_POST = '[Post] DELETE_POST',
    DELETE_POST_SUCCESS = '[Post] DELETE_POST_SUCCESS',
    DELETE_POST_FAIL = '[Post] DELETE_POST_FAIL',

    FOLLOW_USER = '[Post] FOLLOW_USER',
    FOLLOW_USER_SUCCESS = '[Post] FOLLOW_USER_SUCCESS',
    FOLLOW_USER_FAIL = '[Post] FOLLOW_USER_FAIL',
    
    UNFOLLOW_USER = '[Post] UNFOLLOW_USER',
    UNFOLLOW_USER_SUCCESS = '[Post] UNFOLLOW_USER_SUCCESS',
    UNFOLLOW_USER_FAIL = '[Post] UNFOLLOW_USER_FAIL',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetPost implements Action {
    readonly type = PostActionTypes.GET_POST;

    constructor(public payload?: any) { }
}
export class SetLoading implements Action {
    readonly type = PostActionTypes.SET_LOADING;

    constructor(public payload?: any) { }
}
export class GetPostSuccess implements Action {
    readonly type = PostActionTypes.GET_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class GetPostFail implements Action {
    readonly type = PostActionTypes.GET_POST_FAIL;

    constructor(public payload: any) { }
}


export class LikePostAction implements Action {
    readonly type = PostActionTypes.LIKE_POST;

    constructor(public payload: {id: number}) { }
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

    constructor(public payload: {id: number}) { }
}

export class UnLikePostSuccessAction implements Action {
    readonly type = PostActionTypes.UNLIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikePostFailAction implements Action {
    readonly type = PostActionTypes.UNLIKE_POST_FAIL;

    constructor(public payload: any) { }
}

export class DeletePost implements Action {
    readonly type = PostActionTypes.DELETE_POST;

    constructor(public payload?:any) { }
}

export class DeletePostSuccess implements Action {
    readonly type = PostActionTypes.DELETE_POST_SUCCESS;

    constructor(public payload?: any) { }
}
export class DeletePostFail implements Action {
    readonly type = PostActionTypes.DELETE_POST_FAIL;

    constructor(public payload?: any) { }
}

export class FollowUserAction implements Action {
    readonly type = PostActionTypes.FOLLOW_USER;

    constructor(public payload:any) { }
}

export class FollowUserSuccessAction implements Action {
    readonly type = PostActionTypes.FOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class FollowUserFailAction implements Action {
    readonly type = PostActionTypes.FOLLOW_USER_FAIL;
    constructor(public payload: any) {}
}
export class UnfollowUserAction implements Action {
    readonly type = PostActionTypes.UNFOLLOW_USER;

    constructor(public payload:any) { }
}

export class UnfollowUserSuccessAction implements Action {
    readonly type = PostActionTypes.UNFOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class UnfollowUserFailAction implements Action {
    readonly type = PostActionTypes.UNFOLLOW_USER_FAIL;
    constructor(public payload: any) {}
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PostActions
                        = GetPost
                        | GetPostSuccess
                        | GetPostFail
                        |DeletePost
                        |DeletePostFail
                        |DeletePostSuccess
                        | LikePostAction  
                        | LikePostSuccessAction 
                        | LikePostFailAction 
                        | UnLikePostAction  
                        | UnLikePostSuccessAction 
                        | UnLikePostFailAction
                        | FollowUserAction
                        | FollowUserSuccessAction
                        | FollowUserFailAction
                        | UnfollowUserAction
                        | UnfollowUserSuccessAction
                        | UnfollowUserFailAction
                        | SetLoading;
