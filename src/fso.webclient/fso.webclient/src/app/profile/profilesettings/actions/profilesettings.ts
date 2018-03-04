import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ProfileSettingsActionTypes {
    GET_PROFILE_SETTINGS = '[ProfileSettings] GET_PROFILE_SETTINGS',
    GET_PROFILE_SETTINGS_SUCCESS = '[ProfileSettings] GET_PROFILE_SETTINGS_SUCCESS',
    GET_PROFILE_SETTINGS_FAIL = '[ProfileSettings] GET_PROFILE_SETTINGS_FAIL',
    SUBMIT_FORM = '[ProfileSettings] SUBMIT_FORM',
    SUBMIT_FORM_SUCCESS = '[ProfileSettings] SUBMIT_FORM_SUCCESS',
    SUBMIT_FORM_FAIL = '[ProfileSettings] SUBMIT_FORM_FAIL',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class GetProfileSettings implements Action {
    readonly type = ProfileSettingsActionTypes.GET_PROFILE_SETTINGS;

    constructor(public payload?: any) { }
}

export class GetProfileSettingsSuccess implements Action {
    readonly type = ProfileSettingsActionTypes.GET_PROFILE_SETTINGS_SUCCESS;

    constructor(public payload?: any) { }
}

export class GetProfileSettingsFail implements Action {
    readonly type = ProfileSettingsActionTypes.GET_PROFILE_SETTINGS_FAIL;

    constructor(public payload?: any) { }
}
export class SubmitForm implements Action {
    readonly type = ProfileSettingsActionTypes.SUBMIT_FORM;

    constructor(public payload?: any) { }
}
export class SubmitFormSuccess implements Action {
    readonly type = ProfileSettingsActionTypes.SUBMIT_FORM_SUCCESS;

    constructor(public payload?: any) { }
}
export class SubmitFormFail implements Action {
    readonly type = ProfileSettingsActionTypes.SUBMIT_FORM_FAIL;

    constructor(public payload?: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ProfileSettingsActions
                        = GetProfileSettings
                        | GetProfileSettingsSuccess
                        | GetProfileSettingsFail
                        | SubmitForm
                        | SubmitFormSuccess
                        | SubmitFormFail;
