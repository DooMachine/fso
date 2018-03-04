import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum FavouritesActionTypes {
    GET_FAVOURITES = '[User Favourites] GET_FAVOURITES',
    GET_FAVOURITES_SUCCESS = '[User Favourites] GET_FAVOURITES_SUCCESS',
    GET_FAVOURITES_FAIL = '[User Favourites] GET_FAVOURITES_FAIL',

    LIKE_POST = '[User Favourites] LIKE_POST',
    LIKE_POST_SUCCESS = '[User Favourites] LIKE_POST_SUCCESS',
    LIKE_POST_FAIL = '[User Favourites] LIKE_POST_FAIL',

    UNLIKE_POST = '[User Favourites] UNLIKE_POST',
    UNLIKE_POST_SUCCESS = '[User Favourites] UNLIKE_POST_SUCCESS',
    UNLIKE_POST_FAIL = '[User Favourites] UNLIKE_POST_FAIL',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetFavouritesAction implements Action {
    readonly type = FavouritesActionTypes.GET_FAVOURITES;

    constructor(public payload: any) { }
}

export class GetFavouritesSuccessAction implements Action {
    readonly type = FavouritesActionTypes.GET_FAVOURITES_SUCCESS;

    constructor(public payload: any) { }
}
export class GetFavouritesFailAction implements Action {
    readonly type = FavouritesActionTypes.GET_FAVOURITES_FAIL;

    constructor(public payload: any) { }
}

export class LikePostAction implements Action {
    readonly type = FavouritesActionTypes.LIKE_POST;

    constructor(public payload: {id: number}) { }
}

export class LikePostSuccessAction implements Action {
    readonly type = FavouritesActionTypes.LIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class LikePostFailAction implements Action {
    readonly type = FavouritesActionTypes.LIKE_POST_FAIL;

    constructor(public payload: any) { }
}
export class UnLikePostAction implements Action {
    readonly type = FavouritesActionTypes.UNLIKE_POST;

    constructor(public payload: {id: number}) { }
}

export class UnLikePostSuccessAction implements Action {
    readonly type = FavouritesActionTypes.UNLIKE_POST_SUCCESS;

    constructor(public payload: any) { }
}
export class UnLikePostFailAction implements Action {
    readonly type = FavouritesActionTypes.UNLIKE_POST_FAIL;

    constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FavouritesActions
                        = GetFavouritesAction
                        | GetFavouritesSuccessAction
                        | GetFavouritesFailAction
                        | LikePostAction  
                        | LikePostSuccessAction 
                        | LikePostFailAction 
                        | UnLikePostAction  
                        | UnLikePostSuccessAction 
                        | UnLikePostFailAction;
