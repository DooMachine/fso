import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum GroupRecommendationActionTypes {
    GET_GROUP_RECOMMENDATIONS = '[GroupRecommendations] GET_GROUP_RECOMMENDATIONS',
    GET_GROUP_RECOMMENDATIONS_SUCCESS = '[GroupRecommendations] GET_GROUP_RECOMMENDATIONS_SUCCESS',
    GET_GROUP_RECOMMENDATIONS_FAIL = '[GroupRecommendations] GET_GROUP_RECOMMENDATIONS_FAIL',

    FOLLOW_INTERESTS = '[GroupRecommendations] FOLLOW_INTERESTS',
    FOLLOW_INTERESTS_SUCCESS = '[GroupRecommendations] FOLLOW_INTERESTS_SUCCESS',
    FOLLOW_INTERESTS_FAIL = '[GroupRecommendations] FOLLOW_INTERESTS_FAIL',

    UNFOLLOW_INTERESTS = '[GroupRecommendations] UNFOLLOW_INTERESTS',
    UNFOLLOW_INTERESTS_SUCCESS = '[GroupRecommendations] UNFOLLOW_INTERESTS_SUCCESS',
    UNFOLLOW_INTERESTS_FAIL = '[GroupRecommendations] UNFOLLOW_INTERESTS_FAIL',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetGroupRecommendationAction implements Action {
    readonly type = GroupRecommendationActionTypes.GET_GROUP_RECOMMENDATIONS;

    constructor(public payload: any) { }
}

export class GetGroupRecommendationSuccessAction implements Action {
    readonly type = GroupRecommendationActionTypes.GET_GROUP_RECOMMENDATIONS_SUCCESS;

    constructor(public payload: any) { }
}
export class GetGroupRecommendationFailAction implements Action {
    readonly type = GroupRecommendationActionTypes.GET_GROUP_RECOMMENDATIONS_FAIL;

    constructor(public payload: any) { }
}
export class FollowGroupRecommendationAction implements Action {
    readonly type = GroupRecommendationActionTypes.FOLLOW_INTERESTS;

    constructor(public payload: {id: number}) { }
}

export class FollowInterestSuccessAction implements Action {
    readonly type = GroupRecommendationActionTypes.FOLLOW_INTERESTS_SUCCESS;

    constructor(public payload: {id: number, followState: number}) { }
}
export class FollowInterestFailAction implements Action {
    readonly type = GroupRecommendationActionTypes.FOLLOW_INTERESTS_FAIL;

    constructor(public payload: {id: number, followState: number}) { }
}
export class UnfollowGroupRecommendationAction implements Action {
    readonly type = GroupRecommendationActionTypes.UNFOLLOW_INTERESTS;

    constructor(public payload: {id: number}) { }
}

export class UnfollowInterestSuccessAction implements Action {
    readonly type = GroupRecommendationActionTypes.UNFOLLOW_INTERESTS_SUCCESS;

    constructor(public payload: {id: number, followState: number}) { }
}
export class UnfollowInterestFailAction implements Action {
    readonly type = GroupRecommendationActionTypes.UNFOLLOW_INTERESTS_FAIL;

    constructor(public payload: {id: number, followState: number}) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type GroupRecommendationActions
                        = GetGroupRecommendationAction
                        | GetGroupRecommendationSuccessAction
                        | GetGroupRecommendationFailAction
                        | FollowGroupRecommendationAction
                        | FollowInterestSuccessAction
                        | FollowInterestFailAction
                        | UnfollowGroupRecommendationAction
                        | UnfollowInterestSuccessAction
                        | UnfollowInterestFailAction;
