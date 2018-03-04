import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum InterestActionTypes {
    GET_INTERESTS = '[TrendingInterest] GET_INTERESTS',
    GET_INTERESTS_SUCCESS = '[TrendingInterest] GET_INTERESTS_SUCCESS',
    GET_INTERESTS_FAIL = '[TrendingInterest] GET_INTERESTS_FAIL',
    FOLLOW_INTERESTS = '[TrendingInterest] FOLLOW_INTERESTS',
    FOLLOW_INTERESTS_SUCCESS = '[TrendingInterest] FOLLOW_INTERESTS_SUCCESS',
    FOLLOW_INTERESTS_FAIL = '[TrendingInterest] FOLLOW_INTERESTS_FAIL',
    UNFOLLOW_INTERESTS = '[TrendingInterest] UNFOLLOW_INTERESTS',
    UNFOLLOW_INTERESTS_SUCCESS = '[TrendingInterest] UNFOLLOW_INTERESTS_SUCCESS',
    UNFOLLOW_INTERESTS_FAIL = '[TrendingInterest] UNFOLLOW_INTERESTS_FAIL',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetInterestAction implements Action {
    readonly type = InterestActionTypes.GET_INTERESTS;

    constructor(public payload?: any) { }
}

export class GetInterestSuccessAction implements Action {
    readonly type = InterestActionTypes.GET_INTERESTS_SUCCESS;

    constructor(public payload: any) { }
}
export class GetInterestFailAction implements Action {
    readonly type = InterestActionTypes.GET_INTERESTS_FAIL;

    constructor(public payload: any) { }
}
export class FollowInterestAction implements Action {
    readonly type = InterestActionTypes.FOLLOW_INTERESTS;

    constructor(public payload: {id: number}) { }
}

export class FollowInterestSuccessAction implements Action {
    readonly type = InterestActionTypes.FOLLOW_INTERESTS_SUCCESS;

    constructor(public payload: {id: number, followState: number}) { }
}
export class FollowInterestFailAction implements Action {
    readonly type = InterestActionTypes.FOLLOW_INTERESTS_FAIL;

    constructor(public payload: {id: number, followState: number}) { }
}
export class UnfollowInterestAction implements Action {
    readonly type = InterestActionTypes.UNFOLLOW_INTERESTS;

    constructor(public payload: {id: number}) { }
}

export class UnfollowInterestSuccessAction implements Action {
    readonly type = InterestActionTypes.UNFOLLOW_INTERESTS_SUCCESS;

    constructor(public payload: {id: number, followState: number}) { }
}
export class UnfollowInterestFailAction implements Action {
    readonly type = InterestActionTypes.UNFOLLOW_INTERESTS_FAIL;

    constructor(public payload: {id: number, followState: number}) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type InterestActions
                        = GetInterestAction
                        | GetInterestSuccessAction
                        | GetInterestFailAction
                        | FollowInterestAction
                        | FollowInterestSuccessAction
                        | FollowInterestFailAction
                        | UnfollowInterestAction
                        | UnfollowInterestSuccessAction
                        | UnfollowInterestFailAction;
