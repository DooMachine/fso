import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum FeedCommentsActionTypes {    

    PUBLISH_COMMENT = '[FeedComments] PUBLISH_COMMENT',
    PUBLISH_COMMENT_SUCCESS = '[FeedComments] PUBLISH_COMMENT_SUCCESS',
    PUBLISH_COMMENT_FAIL = '[FeedComments] PUBLISH_COMMENT_FAIL',

    SAVE_EDIT_COMMENT = '[FeedComments] SAVE_EDIT_COMMENT',
    SAVE_EDIT_COMMENT_SUCCESS = '[FeedComments] SAVE_EDIT_COMMENT_SUCCESS',
    SAVE_EDIT_COMMENT_FAIL = '[FeedComments] SAVE_EDIT_COMMENT_FAIL',

    OPEN_EDIT_COMMENT = '[FeedComments] OPEN_EDIT_COMMENT',
    CLOSE_EDIT_COMMENT = '[FeedComments] CLOSE_EDIT_COMMENT',

    DELETE_COMMENT = '[FeedComments] DELETE_COMMENT',
    DELETE_COMMENT_SUCCESS = '[FeedComments] DELETE_COMMENT_SUCCESS',
    DELETE_COMMENT_FAIL = '[FeedComments] DELETE_COMMENT_FAIL',

    LIKE_COMMENT = '[FeedComments] LIKE_COMMENT',
    LIKE_COMMENT_SUCCESS = '[FeedComments] LIKE_COMMENT_SUCCESS',
    LIKE_COMMENT_FAIL = '[FeedComments] LIKE_COMMENT_FAIL',

    UNLIKE_COMMENT= '[FeedComments] UNLIKE_COMMENT',
    UNLIKE_COMMENT_SUCCESS = '[FeedComments] UNLIKE_COMMENT_SUCCESS',
    UNLIKE_COMMENT_FAIL = '[FeedComments] UNLIKE_COMMENT_FAIL',

    DISLIKE_COMMENT = '[FeedComments] DISLIKE_COMMENT',
    DISLIKE_COMMENT_SUCCESS = '[FeedComments] DISLIKE_COMMENT_SUCCESS',
    DISLIKE_COMMENT_FAIL = '[FeedComments] DISLIKE_COMMENT_FAIL',

    UNDISLIKE_COMMENT = '[FeedComments] UNDISLIKE_COMMENT',
    UNDISLIKE_COMMENT_SUCCESS = '[FeedComments] UNDISLIKE_COMMENT_SUCCESS',
    UNDISLIKE_COMMENT_FAIL = '[FeedComments] UNDISLIKE_COMMENT_FAIL',

    LOAD_REVIEW_COMMENTS = '[FeedComments] LOAD_REVIEW_COMMENTS',
    LOAD_REVIEW_COMMENTS_SUCCESS = '[FeedComments] LOAD_COMMENTS_SUCCESS',
    LOAD_REVIEW_COMMENTS_FAIL = '[FeedComments] LOAD_REVIEW_COMMENTS_FAIL',

    OPEN_COMMENT_SECTION = '[FeedComments] OPEN_COMMENT_SECTION',
    CLOSE_COMMENT_SECTION = '[FeedComments] CLOSE_COMMENT_SECTION',

    OPEN_COMMENT_FORM_SECTION = '[FeedComments] OPEN_COMMENT_FORM_SECTION',
    CLOSE_COMMENT_FORM_SECTION = '[FeedComments] CLOSE_COMMENT_FORM_SECTION',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */

export class OpenEditComment implements Action {
    readonly type = FeedCommentsActionTypes.OPEN_EDIT_COMMENT;

    constructor(public payload: any) { }
}

export class CloseEditComment implements Action {
    readonly type = FeedCommentsActionTypes.CLOSE_EDIT_COMMENT;

    constructor(public payload: any) { }
}

export class OpenCommentSection implements Action {
    readonly type = FeedCommentsActionTypes.OPEN_COMMENT_SECTION;

    constructor(public payload: any) { }
}

export class CloseCommentSection implements Action {
    readonly type = FeedCommentsActionTypes.CLOSE_COMMENT_SECTION;

    constructor(public payload: any) { }
}
export class OpenCommentFormSection implements Action {
    readonly type = FeedCommentsActionTypes.OPEN_COMMENT_FORM_SECTION;

    constructor(public payload?: any) { }
}

export class CloseCommentFormSection implements Action {
    readonly type = FeedCommentsActionTypes.CLOSE_COMMENT_FORM_SECTION;

    constructor(public payload?: any) { }
}

export class LikeCommentAction implements Action {
    readonly type = FeedCommentsActionTypes.LIKE_COMMENT;

    constructor(public payload: any) { }
}

export class LikeCommentSuccessAction implements Action {
    readonly type = FeedCommentsActionTypes.LIKE_COMMENT_SUCCESS;

    constructor(public payload: any) { }
}
export class LikeCommentFailAction implements Action {
    readonly type = FeedCommentsActionTypes.LIKE_COMMENT_FAIL;

    constructor(public payload: any) { }
}

export class DeleteComment implements Action {
    readonly type = FeedCommentsActionTypes.DELETE_COMMENT;

    constructor(public payload: any) { }
}

export class DeleteCommentSuccess implements Action {
    readonly type = FeedCommentsActionTypes.DELETE_COMMENT_SUCCESS;

    constructor(public payload: any) { }
}
export class DeleteCommentFail implements Action {
    readonly type = FeedCommentsActionTypes.DELETE_COMMENT_FAIL;

    constructor(public payload: any) { }
}
export class UnLikeCommentAction implements Action {
    readonly type = FeedCommentsActionTypes.UNLIKE_COMMENT;

    constructor(public payload: any) { }
}

export class UnLikeCommentSuccessAction implements Action {
    readonly type = FeedCommentsActionTypes.UNLIKE_COMMENT_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikeCommentFailAction implements Action {
    readonly type = FeedCommentsActionTypes.UNLIKE_COMMENT_FAIL;

    constructor(public payload: any) { }
}

export class DislikeCommentAction implements Action {
    readonly type = FeedCommentsActionTypes.DISLIKE_COMMENT;

    constructor(public payload: any) { }
}

export class DislikeCommentSuccessAction implements Action {
    readonly type = FeedCommentsActionTypes.DISLIKE_COMMENT_SUCCESS;

    constructor(public payload: any) { }
}
export class DislikeCommentFailAction implements Action {
    readonly type = FeedCommentsActionTypes.DISLIKE_COMMENT_FAIL;

    constructor(public payload: any) { }
}

export class UnDislikeCommentAction implements Action {
    readonly type = FeedCommentsActionTypes.UNDISLIKE_COMMENT;

    constructor(public payload: any) { }
}

export class UnDislikeCommentSuccessAction implements Action {
    readonly type = FeedCommentsActionTypes.UNDISLIKE_COMMENT_SUCCESS;

    constructor(public payload: any) { }
}
export class UnDislikeCommentFailAction implements Action {
    readonly type = FeedCommentsActionTypes.UNDISLIKE_COMMENT_FAIL;

    constructor(public payload: any) { }
}

export class PublishComment implements Action {
    readonly type = FeedCommentsActionTypes.PUBLISH_COMMENT;

    constructor(public payload: any) { }
}
export class PublishCommentSuccess implements Action {
    readonly type = FeedCommentsActionTypes.PUBLISH_COMMENT_SUCCESS;

    constructor(public payload: any) { }
}
export class PublishCommentFail implements Action {
    readonly type = FeedCommentsActionTypes.PUBLISH_COMMENT_FAIL;

    constructor(public payload: any) { }
}

export class SaveEditComment implements Action {
    readonly type = FeedCommentsActionTypes.SAVE_EDIT_COMMENT;

    constructor(public payload: any) { }
}
export class SaveEditCommentSuccess implements Action {
    readonly type = FeedCommentsActionTypes.SAVE_EDIT_COMMENT_SUCCESS;

    constructor(public payload: any) { }
}
export class SaveEditCommentFail implements Action {
    readonly type = FeedCommentsActionTypes.SAVE_EDIT_COMMENT_FAIL;

    constructor(public payload: any) { }
}
export class LoadFeedComments implements Action {
    readonly type = FeedCommentsActionTypes.LOAD_REVIEW_COMMENTS;

    constructor(public payload: any) { }
}
export class LoadFeedCommentsSuccess implements Action {
    readonly type = FeedCommentsActionTypes.LOAD_REVIEW_COMMENTS_SUCCESS;

    constructor(public payload: any) { }
}
export class LoadFeedCommentsFail implements Action {
    readonly type = FeedCommentsActionTypes.LOAD_REVIEW_COMMENTS_FAIL;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FeedCommentsActions
                        = 
                        | LikeCommentAction | 
                        LikeCommentSuccessAction | 
                        OpenEditComment |
                        CloseEditComment |
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
                        | SaveEditComment
                        | SaveEditCommentFail
                        | SaveEditCommentSuccess
                        | DeleteComment
                        | DeleteCommentFail
                        | DeleteCommentSuccess
                        | LoadFeedComments
                        | LoadFeedCommentsSuccess
                        | LoadFeedCommentsFail
                        | PublishComment
                        | PublishCommentFail
                        | PublishCommentSuccess
                        | OpenCommentSection
                        | CloseCommentSection
                        | OpenCommentFormSection
                        | CloseCommentFormSection
                        ;
