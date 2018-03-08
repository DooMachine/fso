import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum EditPostActionTypes {
    SUBMIT_FORM = '[EditPost] SUBMIT_FORM',
    SUBMIT_FORM_SUCCESS = '[EditPost] SUBMIT_FORM_SUCCESS',
    SUBMIT_FORM_FAIL = '[EditPost] SUBMIT_FORM_FAIL',

    GET_EDITING_POST = '[EditPost] GET_EDITING_POST',
    GET_EDITING_POST_SUCCESS = '[EditPost] GET_EDITING_POST_SUCCESS',
    GET_EDITING_POST_FAIL = '[EditPost] GET_EDITING_POST_FAIL',

    GET_AUTOCOMPLETE_INTEREST = '[EditPost] GET_AUTOCOMPLETE_INTEREST',
    GET_AUTOCOMPLETE_INTEREST_SUCCESS = '[EditPost] GET_AUTOCOMPLETE_INTEREST_SUCCESS',
    GET_AUTOCOMPLETE_INTEREST_FAIL = '[EditPost] GET_AUTOCOMPLETE_INTEREST_FAIL',

    ADD_POSTPART = '[EditPost] ADD_POSTPART',
    ADD_POSTPART_SUCCESS = '[EditPost] ADD_POSTPART_SUCCESS',
    ADD_POSTPART_FAIL = '[EditPost] ADD_POSTPART_FAIL',

    SET_POSTPART_IMAGE = '[EditPost] SET_POSTPART_IMAGE',
    SET_POSTPART_IMAGE_SUCCESS = '[EditPost] SET_POSTPART_IMAGE_SUCCESS',
    SET_POSTPART_IMAGE_FAIL = '[EditPost] SET_POSTPART_IMAGE_FAIL',

    REMOVE_POSTPART = '[EditPost] REMOVE_POSTPART',
    REMOVE_POSTPART_SUCCESS = '[EditPost] REMOVE_POSTPART_SUCCESS',
    REMOVE_POSTPART_FAIL = '[EditPost] REMOVE_POSTPART_FAIL',

    SAVE_POST = '[EditPost] SAVE_POST',
    SAVE_POST_SUCCESS = '[EditPost] SAVE_POST_SUCCESS',
    SAVE_POST_FAIL = '[EditPost] SAVE_POST_FAIL',

    SELECT_INTEREST = '[EditPost] SELECT_INTEREST',
    DESELECT_INTEREST = '[EditPost] DESELECT_INTEREST',

    SHOW_ERROR = '[EditPost] SHOW_ERROR'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class SubmitForm implements Action {
    readonly type = EditPostActionTypes.SUBMIT_FORM;

    constructor(public payload?: any) { }
}

export class SubmitFormSuccess implements Action {
    readonly type = EditPostActionTypes.SUBMIT_FORM_SUCCESS;

    constructor(public payload?: any) { }
}
export class SubmitFormFail implements Action {
    readonly type = EditPostActionTypes.SUBMIT_FORM_FAIL;

    constructor(public payload?: any) { }
}

export class GetEditingPost implements Action {
    readonly type = EditPostActionTypes.GET_EDITING_POST;

    constructor(public payload?: any) { }
}

export class GetEditingPostSuccess implements Action {
    readonly type = EditPostActionTypes.GET_EDITING_POST_SUCCESS;

    constructor(public payload?: any) { }
}
export class GetEditingPostFail implements Action {
    readonly type = EditPostActionTypes.GET_EDITING_POST_FAIL;

    constructor(public payload?: any) { }
}

export class GetAutoCompleteInterests implements Action {
    readonly type = EditPostActionTypes.GET_AUTOCOMPLETE_INTEREST;

    constructor(public payload?: any) { }
}

export class GetAutoCompleteInterestsSuccess implements Action {
    readonly type = EditPostActionTypes.GET_AUTOCOMPLETE_INTEREST_SUCCESS;

    constructor(public payload?: any) { }
}
export class GetAutoCompleteInterestsSuccessFail implements Action {
    readonly type = EditPostActionTypes.GET_AUTOCOMPLETE_INTEREST_FAIL;

    constructor(public payload?: any) { }
}

export class AddPostPart implements Action {
    readonly type = EditPostActionTypes.ADD_POSTPART;

    constructor(public payload?: any) { }
}

export class AddPostPartSuccess implements Action {
    readonly type = EditPostActionTypes.ADD_POSTPART_SUCCESS;

    constructor(public payload?: any) { }
}
export class AddPostPartFail implements Action {
    readonly type = EditPostActionTypes.ADD_POSTPART_FAIL;

    constructor(public payload?: any) { }
}

export class SetPostPartImage implements Action {
    readonly type = EditPostActionTypes.SET_POSTPART_IMAGE;

    constructor(public payload?: any) { }
}

export class SetPostPartImageSuccess implements Action {
    readonly type = EditPostActionTypes.SET_POSTPART_IMAGE_SUCCESS;

    constructor(public payload?: any) { }
}
export class SetPostPartImageFail implements Action {
    readonly type = EditPostActionTypes.SET_POSTPART_IMAGE_FAIL;

    constructor(public payload?: any) { }
}

export class RemovePostPart implements Action {
    readonly type = EditPostActionTypes.REMOVE_POSTPART;

    constructor(public payload?: any) { }
}

export class RemovePostPartSuccess implements Action {
    readonly type = EditPostActionTypes.REMOVE_POSTPART_SUCCESS;

    constructor(public payload?: any) { }
}
export class RemovePostPartFail implements Action {
    readonly type = EditPostActionTypes.REMOVE_POSTPART_FAIL;

    constructor(public payload?: any) { }
}


export class SavePost implements Action {
    readonly type = EditPostActionTypes.SAVE_POST;

    constructor(public payload?: any) { }
}
export class SavePostSuccess implements Action {
    readonly type = EditPostActionTypes.SAVE_POST_SUCCESS;

    constructor(public payload?: any) { }
}
export class SavePostFail implements Action {
    readonly type = EditPostActionTypes.SAVE_POST_FAIL;

    constructor(public payload?: any) { }
}

export class SelectInterest implements Action {
    readonly type = EditPostActionTypes.SELECT_INTEREST;

    constructor(public payload?: any) { }
}
export class DeSelectInterest implements Action {
    readonly type = EditPostActionTypes.DESELECT_INTEREST;

    constructor(public payload?: any) { }
}
export class ShowError implements Action {
    readonly type = EditPostActionTypes.SHOW_ERROR;

    constructor(public payload?: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type EditPostActions
                        = GetEditingPost
                        | SubmitForm
                        | SubmitFormFail
                        | SubmitFormSuccess
                        | GetEditingPostSuccess
                        | GetEditingPostFail
                        | AddPostPart
                        | AddPostPartSuccess
                        | AddPostPartFail
                        | SetPostPartImage
                        | SetPostPartImageFail
                        | SetPostPartImageSuccess
                        | RemovePostPart
                        | RemovePostPartSuccess
                        | RemovePostPartFail
                        | SavePost
                        | SavePostFail
                        | SavePostSuccess
                        | GetAutoCompleteInterests
                        | GetAutoCompleteInterestsSuccess
                        | GetAutoCompleteInterestsSuccessFail
                        | SelectInterest
                        | DeSelectInterest
                        | ShowError;
