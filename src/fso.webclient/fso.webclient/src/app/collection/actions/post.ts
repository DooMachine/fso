import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum CollectionPostActionTypes {
    GET_POSTS = '[Collection Posts] GET_POSTS',
    GET_POSTS_SUCCESS = '[Collection Posts] GET_POSTS_SUCCESS',
    GET_POSTS_FAIL = '[Collection Posts] GET_POSTS_FAIL',

    LIKE_POST = '[Collection Posts] LIKE_POST',
    LIKE_POST_SUCCESS = '[Collection Posts] LIKE_POST_SUCCESS',
    LIKE_POST_FAIL = '[Collection Posts] LIKE_POST_FAIL',

    UNLIKE_POST = '[Collection Posts] UNLIKE_POST',
    UNLIKE_POST_SUCCESS = '[Collection Posts] UNLIKE_POST_SUCCESS',
    UNLIKE_POST_FAIL = '[Collection Posts] UNLIKE_POST_FAIL',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetCollectionPostAction implements Action {
    readonly type = CollectionPostActionTypes.GET_POSTS;

    constructor(public payload: any) { }
}

export class GetPostSuccessAction implements Action {
    readonly type = CollectionPostActionTypes.GET_POSTS_SUCCESS;

    constructor(public payload: any) { }
}
export class GetPostFailAction implements Action {
    readonly type = CollectionPostActionTypes.GET_POSTS_FAIL;

    constructor(public payload: any) { }
}

export class LikeCollectionPostAction implements Action {
    readonly type = CollectionPostActionTypes.LIKE_POST;

    constructor(public payload:any) { }
}

export class LikePostSuccessAction implements Action {
    readonly type = CollectionPostActionTypes.LIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class LikePostFailAction implements Action {
    readonly type = CollectionPostActionTypes.LIKE_POST_FAIL;

    constructor(public payload: any) { }
}
export class UnLikeCollectionPostAction implements Action {
    readonly type = CollectionPostActionTypes.UNLIKE_POST;

    constructor(public payload:any) { }
}

export class UnLikePostSuccessAction implements Action {
    readonly type = CollectionPostActionTypes.UNLIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikePostFailAction implements Action {
    readonly type = CollectionPostActionTypes.UNLIKE_POST_FAIL;

    constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CollectionPostActions
                        = GetCollectionPostAction
                        | GetPostSuccessAction
                        | GetPostFailAction
                        | LikeCollectionPostAction | 
                        LikePostSuccessAction |
                        LikePostFailAction |
                        UnLikeCollectionPostAction | 
                        UnLikePostSuccessAction | 
                        UnLikePostFailAction;
