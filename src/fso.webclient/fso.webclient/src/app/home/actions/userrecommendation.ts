import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum UserRecommendationActionTypes {
    GET_USER_RECOMMENDATIONS = '[UserRecommendation] GET_USER_RECOMMENDATIONS',
    GET_USER_RECOMMENDATIONS_SUCCESS = '[UserRecommendation] GET_USER_RECOMMENDATIONS_SUCCESS',
    GET_USER_RECOMMENDATIONS_FAIL = '[UserRecommendation] GET_USER_RECOMMENDATIONS_FAIL',

    FOLLOW_USER = '[UserRecommendation] FOLLOW_USER',
    FOLLOW_USER_SUCCESS = '[UserRecommendation] FOLLOW_USER_SUCCESS',
    FOLLOW_USER_FAIL = '[UserRecommendation] FOLLOW_USER_FAIL',

    UNFOLLOW_USER = '[UserRecommendation] UNFOLLOW_USER',
    UNFOLLOW_USER_SUCCESS = '[UserRecommendation] UNFOLLOW_USER_SUCCESS',
    UNFOLLOW_USER_FAIL = '[UserRecommendation] UNFOLLOW_USER_FAIL',    
    
    LOAD_MORE_FOLLOWING = '[UserRecommendation] LOAD_MORE_FOLLOWING',
    LOAD_MORE_FOLLOWING_SUCCESS = '[UserRecommendation] LOAD_MORE_FOLLOWING_SUCCESS',
    LOAD_MORE_FOLLOWING_FAIL = '[UserRecommendation] LOAD_MORE_FOLLOWING_FAIL',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetUserRecommendationAction implements Action {
    readonly type = UserRecommendationActionTypes.GET_USER_RECOMMENDATIONS;

    constructor(public payload: any) { }
}

export class GetUserRecommendationSuccessAction implements Action {
    readonly type = UserRecommendationActionTypes.GET_USER_RECOMMENDATIONS_SUCCESS;

    constructor(public payload: any) { }
}
export class GetUserRecommendationFailAction implements Action {
    readonly type = UserRecommendationActionTypes.GET_USER_RECOMMENDATIONS_FAIL;

    constructor(public payload: any) { }
}
export class FollowUserAction implements Action {
    readonly type = UserRecommendationActionTypes.FOLLOW_USER;

    constructor(public payload: any) { }
}

export class FollowUserSuccessAction implements Action {
    readonly type = UserRecommendationActionTypes.FOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class FollowUserFailAction implements Action {
    readonly type = UserRecommendationActionTypes.FOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}
export class UnfollowUserAction implements Action {
    readonly type = UserRecommendationActionTypes.UNFOLLOW_USER;

    constructor(public payload: any) { }
}

export class UnfollowUserSuccessAction implements Action {
    readonly type = UserRecommendationActionTypes.UNFOLLOW_USER_SUCCESS;

    constructor(public payload: any) { }
}
export class UnfollowUserFailAction implements Action {
    readonly type = UserRecommendationActionTypes.UNFOLLOW_USER_FAIL;

    constructor(public payload: any) { }
}

export class LoadMoreUserRecommendationAction implements Action {
    readonly type = UserRecommendationActionTypes.LOAD_MORE_FOLLOWING;

    constructor(public payload?: any) { }
}

export class LoadMoreUserRecommendationSuccessAction implements Action {
    readonly type = UserRecommendationActionTypes.LOAD_MORE_FOLLOWING_SUCCESS;

    constructor(public payload: any) { }
}
export class LoadMoreUserRecommendationFailAction implements Action {
    readonly type = UserRecommendationActionTypes.LOAD_MORE_FOLLOWING_FAIL;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type UserRecommendationActions
                        = GetUserRecommendationAction
                        | GetUserRecommendationSuccessAction
                        | GetUserRecommendationFailAction
                        | FollowUserAction
                        | FollowUserSuccessAction
                        | FollowUserFailAction
                        | UnfollowUserAction
                        | UnfollowUserFailAction
                        | UnfollowUserSuccessAction
                        | LoadMoreUserRecommendationAction
                        | LoadMoreUserRecommendationSuccessAction
                        | LoadMoreUserRecommendationFailAction;
