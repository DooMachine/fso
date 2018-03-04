import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum PopularPostsActionTypes {
    GET_POPULARPOSTS = '[PopularPosts] GET_POPULARPOSTS',
    GET_POPULARPOSTS_SUCCESS = '[PopularPosts] GET_POPULARPOSTS_SUCCESS',
    GET_POPULARPOSTS_FAIL = '[PopularPosts] GET_POPULARPOSTS_FAIL',
    INCREMENT_POST_THUMBNAIL_INDEX = '[PopularPosts] INCREMENT_POST_THUMBNAIL_INDEX',
    RESET_POST_THUMBNAIL_INDEX = '[PopularPosts] RESET_POST_THUMBNAIL_INDEX',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetPopularPostsAction implements Action {
    readonly type = PopularPostsActionTypes.GET_POPULARPOSTS;

    constructor(public payload: any) { }
}

export class GetPopularPostsSuccessAction implements Action {
    readonly type = PopularPostsActionTypes.GET_POPULARPOSTS_SUCCESS;

    constructor(public payload: any) { }
}
export class GetPopularPostsFailAction implements Action {
    readonly type = PopularPostsActionTypes.GET_POPULARPOSTS_FAIL;

    constructor(public payload: any) { }
}
export class IncrementThumbnailIndex implements Action {
    readonly type = PopularPostsActionTypes.INCREMENT_POST_THUMBNAIL_INDEX;

    constructor(public payload: {id: number}) { }
}
export class ResetThumbnailIndex implements Action {
    readonly type = PopularPostsActionTypes.RESET_POST_THUMBNAIL_INDEX;

    constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PopularPostsActions
                        = GetPopularPostsAction
                        | GetPopularPostsSuccessAction
                        | GetPopularPostsFailAction;
