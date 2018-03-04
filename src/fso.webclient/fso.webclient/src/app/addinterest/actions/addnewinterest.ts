import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AddNewInterestActionTypes {
    SUBMIT_FORM = '[AddNewInterest] SUBMIT_FORM',
    SUBMIT_FORM_SUCCESS = '[AddNewInterest] SUBMIT_FORM_SUCCESS',
    SUBMIT_FORM_FAIL = '[AddNewInterest] SUBMIT_FORM_FAIL',

    SHOW_ERROR = '[AddNewInterest] SHOW_ERROR'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class SubmitForm implements Action {
    readonly type = AddNewInterestActionTypes.SUBMIT_FORM;

    constructor(public payload?: any) { }
}

export class SubmitFormSuccess implements Action {
    readonly type = AddNewInterestActionTypes.SUBMIT_FORM_SUCCESS;

    constructor(public payload?: any) { }
}
export class SubmitFormFail implements Action {
    readonly type = AddNewInterestActionTypes.SUBMIT_FORM_FAIL;

    constructor(public payload?: any) { }
}

export class ShowError implements Action {
    readonly type = AddNewInterestActionTypes.SHOW_ERROR;

    constructor(public payload?: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AddNewInterestActions
                        = 
                        | SubmitForm
                        | SubmitFormFail
                        | SubmitFormSuccess
                        | ShowError;
