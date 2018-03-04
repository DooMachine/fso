import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum FollowerActionTypes {
    GET_FOLLOWERS = '[Follower] GET_FOLLOWERS',
    GET_FOLLOWERS_SUCCESS = '[Follower] GET_FOLLOWERS_SUCCESS',
    GET_FOLLOWERS_FAIL = '[Follower] GET_FOLLOWERS_FAIL',
    FOLLOW_USER = '[Follower] FOLLOW_USER',
    FOLLOW_USER_SUCCESS = '[Follower] FOLLOW_USER_SUCCESS',
    FOLLOW_USER_FAIL = '[Follower] FOLLOW_USER_FAIL',
    UNFOLLOW_USER = '[Follower] UNFOLLOW_USER',
    UNFOLLOW_USER_SUCCESS = '[Follower] UNFOLLOW_USER_SUCCESS',
    UNFOLLOW_USER_FAIL = '[Follower] UNFOLLOW_USER_FAIL',
    OPEN_MODAL = '[Follower] OPEN_MODAL',
    CLOSE_MODAL = '[Follower] CLOSE_MODAL',
    
    LOAD_MORE_FOLLOWER = '[Follower] LOAD_MORE_FOLLOWER',
    LOAD_MORE_FOLLOWER_SUCCESS = '[Follower] LOAD_MORE_FOLLOWER_SUCCESS',
    LOAD_MORE_FOLLOWER_FAIL = '[Follower] LOAD_MORE_FOLLOWER_FAIL',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetFollowerAction implements Action {
    readonly type = FollowerActionTypes.GET_FOLLOWERS;

    constructor(public payload: any) { }
}

export class GetFollowerSuccessAction implements Action {
    readonly type = FollowerActionTypes.GET_FOLLOWERS_SUCCESS;

    constructor(public payload: any) { }
}
export class GetFollowerFailAction implements Action {
    readonly type = FollowerActionTypes.GET_FOLLOWERS_FAIL;

    constructor(public payload: any) { }
}
export class FollowUserAction implements Action {
    readonly type = FollowerActionTypes.FOLLOW_USER;

    constructor(public payload: any) { }
}

export class FollowUserSuccessAction implements Action {
    readonly type = FollowerActionTypes.FOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class FollowUserFailAction implements Action {
    readonly type = FollowerActionTypes.FOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}
export class UnfollowUserAction implements Action {
    readonly type = FollowerActionTypes.UNFOLLOW_USER;

    constructor(public payload: any) { }
}

export class UnfollowUserSuccessAction implements Action {
    readonly type = FollowerActionTypes.UNFOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class UnfollowUserFailAction implements Action {
    readonly type = FollowerActionTypes.UNFOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}
export class OpenModalAction implements Action {
    readonly type = FollowerActionTypes.OPEN_MODAL;

    constructor() { }
}
export class CloseModalAction implements Action {
    readonly type = FollowerActionTypes.CLOSE_MODAL;
    
    constructor(public payload: any) { }
}
export class LoadMoreFollowerAction implements Action {
    readonly type = FollowerActionTypes.LOAD_MORE_FOLLOWER;

    constructor(public payload?: any) { }
}

export class LoadMoreFollowerSuccessAction implements Action {
    readonly type = FollowerActionTypes.LOAD_MORE_FOLLOWER_SUCCESS;

    constructor(public payload: any) { }
}
export class LoadMoreFollowerFailAction implements Action {
    readonly type = FollowerActionTypes.LOAD_MORE_FOLLOWER_FAIL;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FollowerActions
                        = GetFollowerAction
                        | GetFollowerSuccessAction
                        | GetFollowerFailAction
                        | OpenModalAction
                        | CloseModalAction
                        | FollowUserAction
                        | FollowUserSuccessAction
                        | FollowUserFailAction
                        | UnfollowUserAction
                        | UnfollowUserFailAction
                        | UnfollowUserSuccessAction
                        | LoadMoreFollowerAction
                        | LoadMoreFollowerSuccessAction
                        | LoadMoreFollowerFailAction;
