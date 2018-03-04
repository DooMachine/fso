import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ProfileImageActionTypes {
    SET_IMAGE_URL = '[ProfileImage] SET_IMAGE_URL',
    UPDATE_IMAGE = '[ProfileImage] UPDATE_IMAGE',
    UPDATE_IMAGE_SUCCESS = '[ProfileImage] UPDATE_IMAGE_SUCCESS',
    UPDATE_IMAGE_FAIL = '[ProfileImage] UPDATE_IMAGE_FAIL'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class SetImageUrl implements Action {
    readonly type = ProfileImageActionTypes.SET_IMAGE_URL;

    constructor(public payload?: any) { }
}
export class UpdateImage implements Action {
    readonly type = ProfileImageActionTypes.UPDATE_IMAGE;

    constructor(public payload?: any) { }
}

export class UpdateImageSuccess implements Action {
    readonly type = ProfileImageActionTypes.UPDATE_IMAGE_SUCCESS;

    constructor(public payload?: any) { }
}

export class UpdateImageFail implements Action {
    readonly type = ProfileImageActionTypes.UPDATE_IMAGE_FAIL;

    constructor(public payload?: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ProfileImageActions
                        = UpdateImage
                        | SetImageUrl
                        | UpdateImageSuccess
                        | UpdateImageFail;
