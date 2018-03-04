import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum UserReviewsActionTypes {    

    LOAD_INITIAL_REVIEWS = '[UserReviews] LOAD_INITIAL_REVIEWS',
    LOAD_INITIAL_REVIEWS_SUCCESS = '[UserReviews] LOAD_INITIAL_REVIEWS_SUCCESS',
    LOAD_INITIAL_REVIEWS_FAIL = '[UserReviews] LOAD_INITIAL_REVIEWS_FAIL',

    LOAD_REVIEWS = '[UserReviews] LOAD_REVIEWS',
    LOAD_REVIEWS_SUCCESS = '[UserReviews] LOAD_REVIEWS_SUCCESS',
    LOAD_REVIEWS_FAIL = '[UserReviews] LOAD_REVIEWS_FAIL',

    LIKE_REVIEW = '[UserReviews] LIKE_REVIEW',
    LIKE_REVIEW_SUCCESS = '[UserReviews] LIKE_REVIEW_SUCCESS',
    LIKE_REVIEW_FAIL = '[UserReviews] LIKE_REVIEW_FAIL',

    UNLIKE_REVIEW = '[UserReviews] UNLIKE_REVIEW',
    UNLIKE_REVIEW_SUCCESS = '[UserReviews] UNLIKE_REVIEW_SUCCESS',
    UNLIKE_REVIEW_FAIL = '[UserReviews] UNLIKE_REVIEW_FAIL',

    DISLIKE_REVIEW = '[UserReviews] DISLIKE_REVIEW',
    DISLIKE_REVIEW_SUCCESS = '[UserReviews] DISLIKE_REVIEW_SUCCESS',
    DISLIKE_REVIEW_FAIL = '[UserReviews] DISLIKE_REVIEW_FAIL',

    UNDISLIKE_REVIEW = '[UserReviews] UNDISLIKE_REVIEW',
    UNDISLIKE_REVIEW_SUCCESS = '[UserReviews] UNDISLIKE_REVIEW_SUCCESS',
    UNDISLIKE_REVIEW_FAIL = '[UserReviews] UNDISLIKE_REVIEW_FAIL',    
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */

export class LoadInitialReviews implements Action {
    readonly type = UserReviewsActionTypes.LOAD_INITIAL_REVIEWS;

    constructor(public payload?: any) { }
}
export class LoadInitialReviewsSuccess implements Action {
    readonly type = UserReviewsActionTypes.LOAD_INITIAL_REVIEWS_SUCCESS;

    constructor(public payload?: any) { }
}
export class LoadInitialReviewsFail implements Action {
    readonly type = UserReviewsActionTypes.LOAD_INITIAL_REVIEWS_FAIL;

    constructor(public payload?: any) { }
}
export class LoadReviews implements Action {
    readonly type = UserReviewsActionTypes.LOAD_REVIEWS;

    constructor(public payload?: any) { }
}
export class LoadReviewsSuccess implements Action {
    readonly type = UserReviewsActionTypes.LOAD_REVIEWS_SUCCESS;

    constructor(public payload: any) { }
}
export class LoadReviewsFail implements Action {
    readonly type = UserReviewsActionTypes.LOAD_REVIEWS_FAIL;

    constructor(public payload: any) { }
}

export class LikeReviewAction implements Action {
    readonly type = UserReviewsActionTypes.LIKE_REVIEW;

    constructor(public payload: {id: number}) { }
}

export class LikeReviewSuccessAction implements Action {
    readonly type = UserReviewsActionTypes.LIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class LikeReviewFailAction implements Action {
    readonly type = UserReviewsActionTypes.LIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}

export class UnLikeReviewAction implements Action {
    readonly type = UserReviewsActionTypes.UNLIKE_REVIEW;

    constructor(public payload: {id: number}) { }
}

export class UnLikeReviewSuccessAction implements Action {
    readonly type = UserReviewsActionTypes.UNLIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikeReviewFailAction implements Action {
    readonly type = UserReviewsActionTypes.UNLIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}

export class DislikeReviewAction implements Action {
    readonly type = UserReviewsActionTypes.DISLIKE_REVIEW;

    constructor(public payload: {id: number}) { }
}

export class DislikeReviewSuccessAction implements Action {
    readonly type = UserReviewsActionTypes.DISLIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class DislikeReviewFailAction implements Action {
    readonly type = UserReviewsActionTypes.DISLIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}

export class UnDislikeReviewAction implements Action {
    readonly type = UserReviewsActionTypes.UNDISLIKE_REVIEW;

    constructor(public payload: {id: number}) { }
}

export class UnDislikeReviewSuccessAction implements Action {
    readonly type = UserReviewsActionTypes.UNDISLIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class UnDislikeReviewFailAction implements Action {
    readonly type = UserReviewsActionTypes.UNDISLIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type UserReviewsActions
                        = 
                        LoadInitialReviews
                        | LoadInitialReviewsFail
                        | LoadInitialReviewsSuccess
                        | LoadReviews
                        | LoadReviewsSuccess
                        | LoadReviewsFail
                        | LikeReviewAction | 
                        LikeReviewSuccessAction | 
                        LikeReviewFailAction |
                        UnLikeReviewAction | 
                        UnLikeReviewSuccessAction |
                        UnLikeReviewFailAction | 
                        DislikeReviewAction | 
                        DislikeReviewSuccessAction |
                        DislikeReviewFailAction | 
                        UnDislikeReviewAction | 
                        UnDislikeReviewSuccessAction | 
                        UnDislikeReviewFailAction;
                        
