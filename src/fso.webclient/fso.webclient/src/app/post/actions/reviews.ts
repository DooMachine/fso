import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum PostIndexReviewsActionTypes {
    
    PUBLISH_COMMENT = '[PostIndexReviews] PUBLISH_COMMENT',
    PUBLISH_COMMENT_FAIL = '[PostIndexReviews] PUBLISH_COMMENT_FAIL',

    SHOW_COMMENTS = '[PostIndexReviews] SHOW_COMMENTS',
    HIDE_COMMENTS = '[PostIndexReviews] HIDE_COMMENTS',

    LOAD_COMMENTS = '[PostIndexReviews] LOAD_COMMENTS',
    LOAD_COMMENTS_FAIL = '[PostIndexReviews] LOAD_COMMENTS_FAIL',

    SHOW_COMMENT_FORM = '[PostIndexReviews] SHOW_COMMENT_FORM',
    HIDE_COMMENT_FORM = '[PostIndexReviews] HIDE_COMMENT_FORM',

    ADD_REVIEWS = '[PostIndexReviews] ADD_REVIEWS',
    SET_REVIEWS = '[PostIndexReviews] SET_REVIEWS',

    LOAD_INITIAL_REVIEWS = '[PostIndexReviews] LOAD_INITIAL_REVIEWS',
    LOAD_INITIAL_REVIEWS_SUCCESS = '[PostIndexReviews] LOAD_INITIAL_REVIEWS_SUCCESS',
    LOAD_INITIAL_REVIEWS_FAIL = '[PostIndexReviews] LOAD_INITIAL_REVIEWS_FAIL',

    LOAD_REVIEWS = '[PostIndexReviews] LOAD_REVIEWS',
    LOAD_REVIEWS_SUCCESS = '[PostIndexReviews] LOAD_REVIEWS_SUCCESS',
    LOAD_REVIEWS_FAIL = '[PostIndexReviews] LOAD_REVIEWS_FAIL',

    LIKE_REVIEW = '[PostIndexReviews] LIKE_REVIEW',
    LIKE_REVIEW_SUCCESS = '[PostIndexReviews] LIKE_REVIEW_SUCCESS',
    LIKE_REVIEW_FAIL = '[PostIndexReviews] LIKE_REVIEW_FAIL',

    UNLIKE_REVIEW = '[PostIndexReviews] UNLIKE_REVIEW',
    UNLIKE_REVIEW_SUCCESS = '[PostIndexReviews] UNLIKE_REVIEW_SUCCESS',
    UNLIKE_REVIEW_FAIL = '[PostIndexReviews] UNLIKE_REVIEW_FAIL',

    DISLIKE_REVIEW = '[PostIndexReviews] DISLIKE_REVIEW',
    DISLIKE_REVIEW_SUCCESS = '[PostIndexReviews] DISLIKE_REVIEW_SUCCESS',
    DISLIKE_REVIEW_FAIL = '[PostIndexReviews] DISLIKE_REVIEW_FAIL',

    UNDISLIKE_REVIEW = '[PostIndexReviews] UNDISLIKE_REVIEW',
    UNDISLIKE_REVIEW_SUCCESS = '[PostIndexReviews] UNDISLIKE_REVIEW_SUCCESS',
    UNDISLIKE_REVIEW_FAIL = '[PostIndexReviews] UNDISLIKE_REVIEW_FAIL',    
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class ShowComments implements Action {
    readonly type = PostIndexReviewsActionTypes.SHOW_COMMENTS;

    constructor(public payload?: any) { }
}
export class HideComments implements Action {
    readonly type = PostIndexReviewsActionTypes.HIDE_COMMENTS;

    constructor(public payload?: any) { }
}
export class ShowCommentForm implements Action {
    readonly type = PostIndexReviewsActionTypes.SHOW_COMMENT_FORM;

    constructor(public payload: any) { }
}
export class HideCommentForm implements Action {
    readonly type = PostIndexReviewsActionTypes.HIDE_COMMENT_FORM;

    constructor(public payload: any) { }
}

export class LoadComments implements Action {
    readonly type = PostIndexReviewsActionTypes.LOAD_COMMENTS;

    constructor(public payload: any) { }
}


export class LoadCommentsFail implements Action {
    readonly type = PostIndexReviewsActionTypes.LOAD_COMMENTS_FAIL;

    constructor(public payload: any) { }
}
export class AddReviews implements Action {
    readonly type = PostIndexReviewsActionTypes.ADD_REVIEWS;

    constructor(public payload: any) { }
}
export class SetReviews implements Action {
    readonly type = PostIndexReviewsActionTypes.SET_REVIEWS;

    constructor(public payload: any) { }
}

export class LoadInitialReviews implements Action {
    readonly type = PostIndexReviewsActionTypes.LOAD_INITIAL_REVIEWS;

    constructor(public payload?: any) { }
}
export class LoadInitialReviewsSuccess implements Action {
    readonly type = PostIndexReviewsActionTypes.LOAD_INITIAL_REVIEWS_SUCCESS;

    constructor(public payload?: any) { }
}
export class LoadInitialReviewsFail implements Action {
    readonly type = PostIndexReviewsActionTypes.LOAD_INITIAL_REVIEWS_FAIL;

    constructor(public payload?: any) { }
}
export class LoadReviews implements Action {
    readonly type = PostIndexReviewsActionTypes.LOAD_REVIEWS;

    constructor(public payload?: any) { }
}
export class LoadReviewsSuccess implements Action {
    readonly type = PostIndexReviewsActionTypes.LOAD_REVIEWS_SUCCESS;

    constructor(public payload: any) { }
}
export class LoadReviewsFail implements Action {
    readonly type = PostIndexReviewsActionTypes.LOAD_REVIEWS_FAIL;

    constructor(public payload: any) { }
}

export class LikeReviewAction implements Action {
    readonly type = PostIndexReviewsActionTypes.LIKE_REVIEW;

    constructor(public payload: {id: number}) { }
}

export class LikeReviewSuccessAction implements Action {
    readonly type = PostIndexReviewsActionTypes.LIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class LikeReviewFailAction implements Action {
    readonly type = PostIndexReviewsActionTypes.LIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}

export class UnLikeReviewAction implements Action {
    readonly type = PostIndexReviewsActionTypes.UNLIKE_REVIEW;

    constructor(public payload: {id: number}) { }
}

export class UnLikeReviewSuccessAction implements Action {
    readonly type = PostIndexReviewsActionTypes.UNLIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikeReviewFailAction implements Action {
    readonly type = PostIndexReviewsActionTypes.UNLIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}

export class DislikeReviewAction implements Action {
    readonly type = PostIndexReviewsActionTypes.DISLIKE_REVIEW;

    constructor(public payload: {id: number}) { }
}

export class DislikeReviewSuccessAction implements Action {
    readonly type = PostIndexReviewsActionTypes.DISLIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class DislikeReviewFailAction implements Action {
    readonly type = PostIndexReviewsActionTypes.DISLIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}

export class UnDislikeReviewAction implements Action {
    readonly type = PostIndexReviewsActionTypes.UNDISLIKE_REVIEW;

    constructor(public payload: {id: number}) { }
}

export class UnDislikeReviewSuccessAction implements Action {
    readonly type = PostIndexReviewsActionTypes.UNDISLIKE_REVIEW_SUCCESS;

    constructor(public payload: any) { }
}
export class UnDislikeReviewFailAction implements Action {
    readonly type = PostIndexReviewsActionTypes.UNDISLIKE_REVIEW_FAIL;

    constructor(public payload: any) { }
}
export class PublishComment implements Action {
    readonly type = PostIndexReviewsActionTypes.PUBLISH_COMMENT;

    constructor(public payload: any) { }
}
export class PublishCommentFail implements Action {
    readonly type = PostIndexReviewsActionTypes.PUBLISH_COMMENT_FAIL;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PostIndexReviewsActions
                        = SetReviews
                        | LoadInitialReviews
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
                        UnDislikeReviewFailAction
                        | ShowComments
                        | HideComments
                        | LoadComments
                        | LoadCommentsFail
                        | ShowCommentForm
                        | HideCommentForm 
                        |PublishCommentFail
                        |PublishComment;
                        
