import { Action } from '@ngrx/store';
import { Interest } from '../models/interest';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum InterestActionTypes {
    REQUEST_INTEREST = '[Interest] REQUEST_INTEREST',
    RECIEVE_INTEREST_SUCCESS = '[Interest] RECIEVE_INTEREST_SUCCESS',
    RECIEVE_INTEREST_FAIL = '[Interest] RECIEVE_INTEREST_FAIL',

    UPDATE_COVER_IMAGE = '[Interest] UPDATE_COVER_IMAGE',
    UPDATE_COVER_IMAGE_SUCCESS = '[Interest] UPDATE_COVER_IMAGE_SUCCESS',
    UPDATE_COVER_IMAGE_FAIL = '[Interest] UPDATE_COVER_IMAGE_FAIL',

    UPDATE_PROFILE_IMAGE = '[Interest] UPDATE_PROFILE_IMAGE',
    UPDATE_PROFILE_IMAGE_SUCCESS = '[Interest] UPDATE_PROFILE_IMAGE_SUCCESS',
    UPDATE_PROFILE_IMAGE_FAIL = '[Interest] UPDATE_PROFILE_IMAGE_FAIL',

    FOLLOW_INTERESTS = '[Interest] FOLLOW_INTERESTS',
    FOLLOW_INTERESTS_SUCCESS = '[Interest] FOLLOW_INTERESTS_SUCCESS',
    FOLLOW_INTERESTS_FAIL = '[Interest] FOLLOW_INTERESTS_FAIL',
    UNFOLLOW_INTERESTS = '[Interest] UNFOLLOW_INTERESTS',
    UNFOLLOW_INTERESTS_SUCCESS = '[Interest] UNFOLLOW_INTERESTS_SUCCESS',
    UNFOLLOW_INTERESTS_FAIL = '[Interest] UNFOLLOW_INTERESTS_FAIL',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class RequestInterest implements Action {
    readonly type = InterestActionTypes.REQUEST_INTEREST;

    constructor(public payload:any) { }
}

export class RecieveInterestSuccess implements Action {
    readonly type = InterestActionTypes.RECIEVE_INTEREST_SUCCESS;

    constructor(public payload: any) { }
}
export class RecieveInterestFail implements Action {
    readonly type = InterestActionTypes.RECIEVE_INTEREST_FAIL;

    constructor(public payload: any) { }
}

export class UpdateCoverImage implements Action {
    readonly type = InterestActionTypes.UPDATE_COVER_IMAGE;

    constructor(public payload:any) { }
}

export class UpdateCoverImageSuccess implements Action {
    readonly type = InterestActionTypes.UPDATE_COVER_IMAGE_SUCCESS;

    constructor(public payload: any) { }
}
export class UpdateCoverImageFail implements Action {
    readonly type = InterestActionTypes.UPDATE_COVER_IMAGE_FAIL;

    constructor(public payload: any) { }
}


export class UpdateProfileImage implements Action {
    readonly type = InterestActionTypes.UPDATE_PROFILE_IMAGE;

    constructor(public payload:any) { }
}

export class UpdateProfileImageSuccess implements Action {
    readonly type = InterestActionTypes.UPDATE_PROFILE_IMAGE_SUCCESS;

    constructor(public payload: any) { }
}
export class UpdateProfileImageFail implements Action {
    readonly type = InterestActionTypes.UPDATE_PROFILE_IMAGE_FAIL;

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
export type InterestActionsAll
                        = RequestInterest
                        | RecieveInterestSuccess
                        | RecieveInterestFail
                        | UpdateCoverImage
                        | UpdateCoverImageSuccess
                        | UpdateCoverImageFail
                        | UpdateProfileImage
                        | UpdateProfileImageFail
                        | UpdateProfileImageSuccess
                        | FollowInterestAction
                        | FollowInterestSuccessAction
                        | FollowInterestFailAction
                        | UnfollowInterestAction
                        | UnfollowInterestSuccessAction
                        | UnfollowInterestFailAction;
