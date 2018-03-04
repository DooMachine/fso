import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum CollectionActionTypes {
    GET_COLLECTIONS = '[ProfileCollection] GET_COLLECTIONS',
    GET_COLLECTIONS_SUCCESS = '[ProfileCollection] GET_COLLECTIONS_SUCCESS',
    GET_COLLECTIONS_FAIL = '[ProfileCollection] GET_COLLECTIONS_FAIL',

    ADD_COLLECTION = '[ProfileCollection] ADD_COLLECTION',
    ADD_COLLECTION_SUCCESS = '[ProfileCollection] ADD_COLLECTION_SUCCESS',
    ADD_COLLECTION_FAIL = '[ProfileCollection] ADD_COLLECTION_FAIL',

    DELETE_COLLECTION = '[ProfileCollection] DELETE_COLLECTION',
    DELETE_COLLECTION_SUCCESS = '[ProfileCollection] DELETE_COLLECTION_SUCCESS',
    DELETE_COLLECTION_FAIL = '[ProfileCollection] DELETE_COLLECTION_FAIL',

    UPDATE_COLLECTION_IMAGE = '[ProfileCollection] UPDATE_COLLECTION_IMAGE',
    UPDATE_COLLECTION_IMAGE_SUCCESS = '[ProfileCollection] UPDATE_COLLECTION_IMAGE_SUCCESS',
    UPDATE_COLLECTION_IMAGE_FAIL = '[ProfileCollection] UPDATE_COLLECTION_IMAGE_FAIL',

    TOGGLE_SHOW_FORM = '[ProfileCollection] TOGGLE_SHOW_FORM'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetCollectionAction implements Action {
    readonly type = CollectionActionTypes.GET_COLLECTIONS;

    constructor(public payload: any) { }
}

export class GetCollectionSuccessAction implements Action {
    readonly type = CollectionActionTypes.GET_COLLECTIONS_SUCCESS;

    constructor(public payload: any) { }
}
export class GetCollectionFailAction implements Action {
    readonly type = CollectionActionTypes.GET_COLLECTIONS_FAIL;

    constructor(public payload: any) { }
}


export class AddCollection implements Action {
    readonly type = CollectionActionTypes.ADD_COLLECTION;

    constructor(public payload: any) { }
}
export class AddCollectionSuccess implements Action {
    readonly type = CollectionActionTypes.ADD_COLLECTION_SUCCESS;

    constructor(public payload: any) { }
}
export class AddCollectionFail implements Action {
    readonly type = CollectionActionTypes.ADD_COLLECTION_FAIL;

    constructor(public payload: any) { }
}

export class DeleteCollection implements Action {
    readonly type = CollectionActionTypes.DELETE_COLLECTION;

    constructor(public payload: any) { }
}
export class DeleteCollectionSuccess implements Action {
    readonly type = CollectionActionTypes.DELETE_COLLECTION_SUCCESS;

    constructor(public payload: any) { }
}
export class DeleteCollectionFail implements Action {
    readonly type = CollectionActionTypes.DELETE_COLLECTION_FAIL;

    constructor(public payload: any) { }
}

export class UpdateCollectionImage implements Action {
    readonly type = CollectionActionTypes.UPDATE_COLLECTION_IMAGE;

    constructor(public payload: any) { }
}
export class UpdateCollectionImageSuccess implements Action {
    readonly type = CollectionActionTypes.UPDATE_COLLECTION_IMAGE_SUCCESS;

    constructor(public payload: any) { }
}
export class UpdateCollectionImageFail implements Action {
    readonly type = CollectionActionTypes.UPDATE_COLLECTION_IMAGE_FAIL;

    constructor(public payload: any) { }
}
export class ToggleCollectionForm implements Action {
    readonly type = CollectionActionTypes.TOGGLE_SHOW_FORM;

    constructor() { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CollectionActions
                        = GetCollectionAction
                        | GetCollectionSuccessAction
                        | GetCollectionFailAction
                        | AddCollection
                        | AddCollectionSuccess
                        | AddCollectionFail
                        | UpdateCollectionImage
                        | UpdateCollectionImageSuccess
                        | UpdateCollectionImageFail
                        | DeleteCollection
                        | DeleteCollectionSuccess
                        | DeleteCollectionFail
                        | ToggleCollectionForm;
