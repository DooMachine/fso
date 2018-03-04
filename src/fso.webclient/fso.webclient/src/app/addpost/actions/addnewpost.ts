import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AddNewPostActionTypes {
    SUBMIT_FORM = '[AddNewPost] SUBMIT_FORM',
    SUBMIT_FORM_SUCCESS = '[AddNewPost] SUBMIT_FORM_SUCCESS',
    SUBMIT_FORM_FAIL = '[AddNewPost] SUBMIT_FORM_FAIL',

    GET_UNPUBLISHED_POST = '[AddNewPost] GET_UNPUBLISHED_POST',
    GET_UNPUBLISHED_POST_SUCCESS = '[AddNewPost] GET_UNPUBLISHED_POST_SUCCESS',
    GET_UNPUBLISHED_POST_FAIL = '[AddNewPost] GET_UNPUBLISHED_POST_FAIL',

    GET_AUTOCOMPLETE_INTEREST = '[AddNewPost] GET_AUTOCOMPLETE_INTEREST',
    GET_AUTOCOMPLETE_INTEREST_SUCCESS = '[AddNewPost] GET_AUTOCOMPLETE_INTEREST_SUCCESS',
    GET_AUTOCOMPLETE_INTEREST_FAIL = '[AddNewPost] GET_AUTOCOMPLETE_INTEREST_FAIL',

    ADD_POSTPART = '[AddNewPost] ADD_POSTPART',
    ADD_POSTPART_SUCCESS = '[AddNewPost] ADD_POSTPART_SUCCESS',
    ADD_POSTPART_FAIL = '[AddNewPost] ADD_POSTPART_FAIL',

    SET_POSTPART_IMAGE = '[AddNewPost] SET_POSTPART_IMAGE',
    SET_POSTPART_IMAGE_SUCCESS = '[AddNewPost] SET_POSTPART_IMAGE_SUCCESS',
    SET_POSTPART_IMAGE_FAIL = '[AddNewPost] SET_POSTPART_IMAGE_FAIL',

    REMOVE_POSTPART = '[AddNewPost] REMOVE_POSTPART',
    REMOVE_POSTPART_SUCCESS = '[AddNewPost] REMOVE_POSTPART_SUCCESS',
    REMOVE_POSTPART_FAIL = '[AddNewPost] REMOVE_POSTPART_FAIL',

    PUBLUSH_POST = '[AddNewPost] PUBLUSH_POST',
    PUBLUSH_POST_SUCCESS = '[AddNewPost] PUBLUSH_POST_SUCCESS',
    PUBLUSH_POST_FAIL = '[AddNewPost] PUBLUSH_POST_FAIL',

    SELECT_INTEREST = '[AddNewPost] SELECT_INTEREST',
    DESELECT_INTEREST = '[AddNewPost] DESELECT_INTEREST',

    SHOW_ERROR = '[AddNewPost] SHOW_ERROR'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class SubmitForm implements Action {
    readonly type = AddNewPostActionTypes.SUBMIT_FORM;

    constructor(public payload?: any) { }
}

export class SubmitFormSuccess implements Action {
    readonly type = AddNewPostActionTypes.SUBMIT_FORM_SUCCESS;

    constructor(public payload?: any) { }
}
export class SubmitFormFail implements Action {
    readonly type = AddNewPostActionTypes.SUBMIT_FORM_FAIL;

    constructor(public payload?: any) { }
}

export class GetUnpublishedPost implements Action {
    readonly type = AddNewPostActionTypes.GET_UNPUBLISHED_POST;

    constructor(public payload?: any) { }
}

export class GetUnpublishedPostSuccess implements Action {
    readonly type = AddNewPostActionTypes.GET_UNPUBLISHED_POST_SUCCESS;

    constructor(public payload?: any) { }
}
export class GetUnpublishedPostFail implements Action {
    readonly type = AddNewPostActionTypes.GET_UNPUBLISHED_POST_FAIL;

    constructor(public payload?: any) { }
}

export class GetAutoCompleteInterests implements Action {
    readonly type = AddNewPostActionTypes.GET_AUTOCOMPLETE_INTEREST;

    constructor(public payload?: any) { }
}

export class GetAutoCompleteInterestsSuccess implements Action {
    readonly type = AddNewPostActionTypes.GET_AUTOCOMPLETE_INTEREST_SUCCESS;

    constructor(public payload?: any) { }
}
export class GetAutoCompleteInterestsSuccessFail implements Action {
    readonly type = AddNewPostActionTypes.GET_AUTOCOMPLETE_INTEREST_FAIL;

    constructor(public payload?: any) { }
}

export class AddPostPart implements Action {
    readonly type = AddNewPostActionTypes.ADD_POSTPART;

    constructor(public payload?: any) { }
}

export class AddPostPartSuccess implements Action {
    readonly type = AddNewPostActionTypes.ADD_POSTPART_SUCCESS;

    constructor(public payload?: any) { }
}
export class AddPostPartFail implements Action {
    readonly type = AddNewPostActionTypes.ADD_POSTPART_FAIL;

    constructor(public payload?: any) { }
}

export class SetPostPartImage implements Action {
    readonly type = AddNewPostActionTypes.SET_POSTPART_IMAGE;

    constructor(public payload?: any) { }
}

export class SetPostPartImageSuccess implements Action {
    readonly type = AddNewPostActionTypes.SET_POSTPART_IMAGE_SUCCESS;

    constructor(public payload?: any) { }
}
export class SetPostPartImageFail implements Action {
    readonly type = AddNewPostActionTypes.SET_POSTPART_IMAGE_FAIL;

    constructor(public payload?: any) { }
}

export class RemovePostPart implements Action {
    readonly type = AddNewPostActionTypes.REMOVE_POSTPART;

    constructor(public payload?: any) { }
}

export class RemovePostPartSuccess implements Action {
    readonly type = AddNewPostActionTypes.REMOVE_POSTPART_SUCCESS;

    constructor(public payload?: any) { }
}
export class RemovePostPartFail implements Action {
    readonly type = AddNewPostActionTypes.REMOVE_POSTPART_FAIL;

    constructor(public payload?: any) { }
}


export class PublishPost implements Action {
    readonly type = AddNewPostActionTypes.PUBLUSH_POST;

    constructor(public payload?: any) { }
}
export class PublishPostSuccess implements Action {
    readonly type = AddNewPostActionTypes.PUBLUSH_POST_SUCCESS;

    constructor(public payload?: any) { }
}
export class PublishPostFail implements Action {
    readonly type = AddNewPostActionTypes.PUBLUSH_POST_FAIL;

    constructor(public payload?: any) { }
}

export class SelectInterest implements Action {
    readonly type = AddNewPostActionTypes.SELECT_INTEREST;

    constructor(public payload?: any) { }
}
export class DeSelectInterest implements Action {
    readonly type = AddNewPostActionTypes.DESELECT_INTEREST;

    constructor(public payload?: any) { }
}
export class ShowError implements Action {
    readonly type = AddNewPostActionTypes.SHOW_ERROR;

    constructor(public payload?: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AddNewPostActions
                        = GetUnpublishedPost
                        | SubmitForm
                        | SubmitFormFail
                        | SubmitFormSuccess
                        | GetUnpublishedPostSuccess
                        | GetUnpublishedPostFail
                        | AddPostPart
                        | AddPostPartSuccess
                        | AddPostPartFail
                        | SetPostPartImage
                        | SetPostPartImageFail
                        | SetPostPartImageSuccess
                        | RemovePostPart
                        | RemovePostPartSuccess
                        | RemovePostPartFail
                        | PublishPost
                        | PublishPostSuccess
                        | PublishPostSuccess
                        | GetAutoCompleteInterests
                        | GetAutoCompleteInterestsSuccess
                        | GetAutoCompleteInterestsSuccessFail
                        | SelectInterest
                        | DeSelectInterest
                        | ShowError;
