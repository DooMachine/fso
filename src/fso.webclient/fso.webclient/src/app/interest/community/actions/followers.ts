import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum InterestFollowersActionTypes {
    GET_INTEREST_FOLLOWERS = '[InterestFollowers] GET_INTEREST_FOLLOWERS',
    GET_INTEREST_FOLLOWERS_SUCCESS = '[InterestFollowers] GET_INTEREST_FOLLOWERS_SUCCESS',
    GET_INTEREST_FOLLOWERS_FAIL = '[InterestFollowers] GET_INTEREST_FOLLOWERS_FAIL',

    FOLLOW_USER  = '[InterestFollowers] FOLLOW_USER',
    FOLLOW_USER_SUCCESS = '[InterestFollowers] FOLLOW_USER_SUCCESS',
    FOLLOW_USER_FAIL = '[InterestFollowers] FOLLOW_USER_FAIL',

    UNFOLLOW_USER  = '[InterestFollowers] UNFOLLOW_USER',
    UNFOLLOW_USER_SUCCESS = '[InterestFollowers] UNFOLLOW_USER_SUCCESS',
    UNFOLLOW_USER_FAIL = '[InterestFollowers] UNFOLLOW_USER_FAIL',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class GetInterestFollowers implements Action {
    readonly type = InterestFollowersActionTypes.GET_INTEREST_FOLLOWERS;

    constructor(public payload?: any) { }
}

export class GetInterestFollowersSuccess implements Action {
    readonly type = InterestFollowersActionTypes.GET_INTEREST_FOLLOWERS_SUCCESS;

    constructor(public payload?: any) { }
}
export class GetInterestFollowersFail implements Action {
    readonly type = InterestFollowersActionTypes.GET_INTEREST_FOLLOWERS_FAIL;

    constructor(public payload?: any) { }
}

export class FollowUser implements Action {
    readonly type = InterestFollowersActionTypes.FOLLOW_USER;

    constructor(public payload:any) { }
}

export class FollowUserSuccess implements Action {
    readonly type = InterestFollowersActionTypes.FOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class FollowUserFail implements Action {
    readonly type = InterestFollowersActionTypes.FOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}
export class UnfollowUser implements Action {
    readonly type = InterestFollowersActionTypes.UNFOLLOW_USER;

    constructor(public payload:any) { }
}

export class UnfollowUserSuccess implements Action {
    readonly type = InterestFollowersActionTypes.UNFOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class UnfollowUserFail implements Action {
    readonly type = InterestFollowersActionTypes.UNFOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type InterestFollowersActions
                        = GetInterestFollowers
                        | GetInterestFollowersSuccess
                        | GetInterestFollowersFail                        
                        | FollowUser
                        | FollowUserSuccess
                        | FollowUserFail
                        | UnfollowUser
                        | UnfollowUserSuccess
                        | UnfollowUserFail;
