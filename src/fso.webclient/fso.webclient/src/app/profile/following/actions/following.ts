import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum FollowingActionTypes {
    GET_FOLLOWINGS = '[Following] GET_FOLLOWINGS',
    GET_FOLLOWINGS_SUCCESS = '[Following] GET_FOLLOWINGS_SUCCESS',
    GET_FOLLOWINGS_FAIL = '[Following] GET_FOLLOWINGS_FAIL',
    FOLLOW_USER = '[Following] FOLLOW_USER',
    FOLLOW_USER_SUCCESS = '[Following] FOLLOW_USER_SUCCESS',
    FOLLOW_USER_FAIL = '[Following] FOLLOW_USER_FAIL',
    UNFOLLOW_USER = '[Following] UNFOLLOW_USER',
    UNFOLLOW_USER_SUCCESS = '[Following] UNFOLLOW_USER_SUCCESS',
    UNFOLLOW_USER_FAIL = '[Following] UNFOLLOW_USER_FAIL',
    OPEN_MODAL = '[Following] OPEN_MODAL',
    CLOSE_MODAL = '[Following] CLOSE_MODAL',
    LOAD_MORE_FOLLOWING = '[Following] LOAD_MORE_FOLLOWING',
    LOAD_MORE_FOLLOWING_SUCCESS = '[Following] LOAD_MORE_FOLLOWING_SUCCESS',
    LOAD_MORE_FOLLOWING_FAIL = '[Following] LOAD_MORE_FOLLOWING_FAIL',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetFollowingAction implements Action {
    readonly type = FollowingActionTypes.GET_FOLLOWINGS;

    constructor(public payload: any) { }
}

export class GetFollowingSuccessAction implements Action {
    readonly type = FollowingActionTypes.GET_FOLLOWINGS_SUCCESS;

    constructor(public payload: any) { }
}
export class GetFollowingFailAction implements Action {
    readonly type = FollowingActionTypes.GET_FOLLOWINGS_FAIL;

    constructor(public payload: any) { }
}
export class FollowUserAction implements Action {
    readonly type = FollowingActionTypes.FOLLOW_USER;

    constructor(public payload: any) { }
}

export class FollowUserSuccessAction implements Action {
    readonly type = FollowingActionTypes.FOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class FollowUserFailAction implements Action {
    readonly type = FollowingActionTypes.FOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}
export class UnfollowUserAction implements Action {
    readonly type = FollowingActionTypes.UNFOLLOW_USER;

    constructor(public payload: any) { }
}

export class UnfollowUserSuccessAction implements Action {
    readonly type = FollowingActionTypes.UNFOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class UnfollowUserFailAction implements Action {
    readonly type = FollowingActionTypes.UNFOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}
export class OpenModalAction implements Action {
    readonly type = FollowingActionTypes.OPEN_MODAL;

    constructor() { }
}
export class CloseModalAction implements Action {
    readonly type = FollowingActionTypes.CLOSE_MODAL;
    
    constructor(public payload: any) { }
}

export class LoadMoreFollowingAction implements Action {
    readonly type = FollowingActionTypes.LOAD_MORE_FOLLOWING;

    constructor(public payload?: any) { }
}

export class LoadMoreFollowingSuccessAction implements Action {
    readonly type = FollowingActionTypes.LOAD_MORE_FOLLOWING_SUCCESS;

    constructor(public payload: any) { }
}
export class LoadMoreFollowingFailAction implements Action {
    readonly type = FollowingActionTypes.LOAD_MORE_FOLLOWING_FAIL;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FollowingActions
                        = GetFollowingAction
                        | GetFollowingSuccessAction
                        | GetFollowingFailAction
                        | OpenModalAction
                        | CloseModalAction
                        | FollowUserAction
                        | FollowUserSuccessAction
                        | FollowUserFailAction
                        | UnfollowUserAction
                        | UnfollowUserFailAction
                        | UnfollowUserSuccessAction
                        | LoadMoreFollowingAction
                        | LoadMoreFollowingSuccessAction
                        | LoadMoreFollowingFailAction;
