import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum PostIndexCommentsActionTypes {    

    PUBLISH_COMMENT_SUCCESS = '[PostIndexReviews] PUBLISH_COMMENT_SUCCESS',
    
    LIKE_COMMENT = '[PostIndexComments] LIKE_COMMENT',
    LIKE_COMMENT_SUCCESS = '[PostIndexComments] LIKE_COMMENT_SUCCESS',
    LIKE_COMMENT_FAIL = '[PostIndexComments] LIKE_COMMENT_FAIL',

    UNLIKE_COMMENT= '[PostIndexComments] UNLIKE_COMMENT',
    UNLIKE_COMMENT_SUCCESS = '[PostIndexComments] UNLIKE_COMMENT_SUCCESS',
    UNLIKE_COMMENT_FAIL = '[PostIndexComments] UNLIKE_COMMENT_FAIL',

    DISLIKE_COMMENT = '[PostIndexComments] DISLIKE_COMMENT',
    DISLIKE_COMMENT_SUCCESS = '[PostIndexComments] DISLIKE_COMMENT_SUCCESS',
    DISLIKE_COMMENT_FAIL = '[PostIndexComments] DISLIKE_COMMENT_FAIL',

    UNDISLIKE_COMMENT = '[PostIndexComments] UNDISLIKE_COMMENT',
    UNDISLIKE_COMMENT_SUCCESS = '[PostIndexComments] UNDISLIKE_COMMENT_SUCCESS',
    UNDISLIKE_COMMENT_FAIL = '[PostIndexComments] UNDISLIKE_COMMENT_FAIL',

    LOAD_COMMENTS_SUCCESS = '[PostIndexComments] LOAD_COMMENTS_SUCCESS'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */




export class LikeCommentAction implements Action {
    readonly type = PostIndexCommentsActionTypes.LIKE_COMMENT;

    constructor(public payload: any) { }
}

export class LikeCommentSuccessAction implements Action {
    readonly type = PostIndexCommentsActionTypes.LIKE_COMMENT_SUCCESS;

    constructor(public payload: any) { }
}
export class LikeCommentFailAction implements Action {
    readonly type = PostIndexCommentsActionTypes.LIKE_COMMENT_FAIL;

    constructor(public payload: any) { }
}

export class UnLikeCommentAction implements Action {
    readonly type = PostIndexCommentsActionTypes.UNLIKE_COMMENT;

    constructor(public payload: any) { }
}

export class UnLikeCommentSuccessAction implements Action {
    readonly type = PostIndexCommentsActionTypes.UNLIKE_COMMENT_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikeCommentFailAction implements Action {
    readonly type = PostIndexCommentsActionTypes.UNLIKE_COMMENT_FAIL;

    constructor(public payload: any) { }
}

export class DislikeCommentAction implements Action {
    readonly type = PostIndexCommentsActionTypes.DISLIKE_COMMENT;

    constructor(public payload: any) { }
}

export class DislikeCommentSuccessAction implements Action {
    readonly type = PostIndexCommentsActionTypes.DISLIKE_COMMENT_SUCCESS;

    constructor(public payload: any) { }
}
export class DislikeCommentFailAction implements Action {
    readonly type = PostIndexCommentsActionTypes.DISLIKE_COMMENT_FAIL;

    constructor(public payload: any) { }
}

export class UnDislikeCommentAction implements Action {
    readonly type = PostIndexCommentsActionTypes.UNDISLIKE_COMMENT;

    constructor(public payload: any) { }
}

export class UnDislikeCommentSuccessAction implements Action {
    readonly type = PostIndexCommentsActionTypes.UNDISLIKE_COMMENT_SUCCESS;

    constructor(public payload: any) { }
}
export class UnDislikeCommentFailAction implements Action {
    readonly type = PostIndexCommentsActionTypes.UNDISLIKE_COMMENT_FAIL;

    constructor(public payload: any) { }
}


export class PublishCommentSuccess implements Action {
    readonly type = PostIndexCommentsActionTypes.PUBLISH_COMMENT_SUCCESS;

    constructor(public payload: any) { }
}
export class LoadCommentsSuccess implements Action {
    readonly type = PostIndexCommentsActionTypes.LOAD_COMMENTS_SUCCESS;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PostIndexCommentsActions
                        = 
                        | LikeCommentAction | 
                        LikeCommentSuccessAction | 
                        LikeCommentFailAction |
                        UnLikeCommentAction | 
                        UnLikeCommentSuccessAction |
                        UnLikeCommentFailAction | 
                        DislikeCommentAction | 
                        DislikeCommentSuccessAction |
                        DislikeCommentFailAction | 
                        UnDislikeCommentAction | 
                        UnDislikeCommentSuccessAction | 
                        UnDislikeCommentFailAction
                        | LoadCommentsSuccess
                        | PublishCommentSuccess
                        ;
