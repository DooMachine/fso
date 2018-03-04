import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum UserActionTypes {
    GET_USER = '[User] GET_USER',
    GET_USER_SUCCESS = '[User] GET_USER_SUCCESS',
    GET_USER_FAIL = '[User] GET_USER_FAIL',
    FOLLOW_USER = '[User] FOLLOW_USER',
    FOLLOW_USER_SUCCESS = '[User] FOLLOW_USER_SUCCESS',
    FOLLOW_USER_FAIL = '[User] FOLLOW_USER_FAIL',
    UNFOLLOW_USER = '[User] UNFOLLOW_USER',
    UNFOLLOW_USER_SUCCESS = '[User] UNFOLLOW_USER_SUCCESS',
    UNFOLLOW_USER_FAIL = '[User] UNFOLLOW_USER_FAIL',

    UPDATE_PROFILE_SEO = '[User] UPDATE_PROFILE_SEO'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetUserAction implements Action {
    readonly type = UserActionTypes.GET_USER;

    constructor(public payload: {userName: string}) { }
}

export class GetUserSuccessAction implements Action {
    readonly type = UserActionTypes.GET_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class GetUserFailAction implements Action {
    readonly type = UserActionTypes.GET_USER_FAIL;
    constructor(public payload: any) {}
}
export class FollowUserAction implements Action {
    readonly type = UserActionTypes.FOLLOW_USER;

    constructor(public payload:any) { }
}

export class FollowUserSuccessAction implements Action {
    readonly type = UserActionTypes.FOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class FollowUserFailAction implements Action {
    readonly type = UserActionTypes.FOLLOW_USER_FAIL;
    constructor(public payload: any) {}
}
export class UnfollowUserAction implements Action {
    readonly type = UserActionTypes.UNFOLLOW_USER;

    constructor(public payload:any) { }
}

export class UnfollowUserSuccessAction implements Action {
    readonly type = UserActionTypes.UNFOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class UnfollowUserFailAction implements Action {
    readonly type = UserActionTypes.UNFOLLOW_USER_FAIL;
    constructor(public payload: any) {}
}
export class UpdateProfileSeo implements Action{
    readonly type = UserActionTypes.UPDATE_PROFILE_SEO;
    constructor(public payload?: any) {}
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type UserActions
                        = GetUserAction
                        | GetUserSuccessAction
                        | GetUserFailAction
                        | FollowUserAction
                        | FollowUserSuccessAction
                        | FollowUserFailAction
                        | UnfollowUserAction
                        | UnfollowUserSuccessAction
                        | UnfollowUserFailAction
                        | UpdateProfileSeo;
