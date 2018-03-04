import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum PostIndexSimiliarPostsActionTypes {
    SET_SIMILIAR_POSTS = '[PostIndexSimiliarPosts] SET_SIMILIAR_POSTS',
    LOAD_SIMILIAR_POSTS = '[PostIndexSimiliarPosts] LOAD_SIMILIAR_POSTS',
    LOAD_SIMILIAR_POSTS_SUCCESS = '[PostIndexSimiliarPosts] LOAD_SIMILIAR_POSTS_SUCCESS',
    LOAD_SIMILIAR_POSTS_FAIL = '[PostIndexSimiliarPosts] LOAD_SIMILIAR_POSTS_FAIL',

    SEE_REMAINING_POSTS  = '[PostIndexSimiliarPosts] LOAD_SIMILIAR_POSTS_FAIL',
    INCREMENT_POST_THUMBNAIL_INDEX = '[PostIndexSimiliarPosts] INCREMENT_POST_THUMBNAIL_INDEX',
    RESET_POST_THUMBNAIL_INDEX = '[PostIndexSimiliarPosts] RESET_POST_THUMBNAIL_INDEX',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */

export class IncrementPostThumbnailIndex implements Action {
    readonly type = PostIndexSimiliarPostsActionTypes.INCREMENT_POST_THUMBNAIL_INDEX;

    constructor(public payload: any) { }
}
export class ResetPostThumnnailIndex implements Action {
    readonly type = PostIndexSimiliarPostsActionTypes.RESET_POST_THUMBNAIL_INDEX;

    constructor(public payload: any) { }
}
export class SetRemainingPosts implements Action {
    readonly type = PostIndexSimiliarPostsActionTypes.SEE_REMAINING_POSTS;

    constructor(public payload: any) { }
}
export class SetSimiliarPosts implements Action {
    readonly type = PostIndexSimiliarPostsActionTypes.SET_SIMILIAR_POSTS;

    constructor(public payload: any) { }
}

export class LoadSimiliarPosts implements Action {
    readonly type = PostIndexSimiliarPostsActionTypes.LOAD_SIMILIAR_POSTS;

    constructor(public payload: any) { }
}
export class LoadSimiliarPostsSuccess implements Action {
    readonly type = PostIndexSimiliarPostsActionTypes.LOAD_SIMILIAR_POSTS_SUCCESS;

    constructor(public payload: any) { }
}
export class LoadSimiliarPostsFail implements Action {
    readonly type = PostIndexSimiliarPostsActionTypes.LOAD_SIMILIAR_POSTS_FAIL;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PostIndexSimiliarPostsActions
                        = SetSimiliarPosts
                        | LoadSimiliarPosts
                        | IncrementPostThumbnailIndex
                        | ResetPostThumnnailIndex
                        | LoadSimiliarPostsSuccess
                        | LoadSimiliarPostsFail;
