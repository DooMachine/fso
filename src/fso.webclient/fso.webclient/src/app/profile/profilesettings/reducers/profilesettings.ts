
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import * as profileSettingsActions from '../actions/profilesettings';

export enum UserFollowSetting{
    Confirm_All, Ask_All, Deny_All
}
export enum UserPrivacySetting{
    Private, Public
}
export interface State {
    name:string;
    surname:string;
    status:string;
    uName:string;
    selectedFollowSettings: UserFollowSetting;
    selectedPrivacySettings: UserPrivacySetting
    isLoading:boolean;
    error:string | null;
    lastUpdateSucceed: boolean | null;
    showError: boolean;
}


export const initialState: State = {    
    name:'',
    surname:'',
    status:'',
    uName:'',
    selectedFollowSettings:0,
    selectedPrivacySettings:0,
    isLoading:false,
    showError:false,
    error: null,
    lastUpdateSucceed:null
}

  export function reducer(state = initialState, action): State {
    switch (action.type) {
    case profileSettingsActions.ProfileSettingsActionTypes.GET_PROFILE_SETTINGS:
        return {
            ...state,
            isLoading:true
        }
    case profileSettingsActions.ProfileSettingsActionTypes.GET_PROFILE_SETTINGS_SUCCESS:
        return {
            ...state,
            isLoading:false,
            name:action.payload.name,
            surname:action.payload.surname,
            status:action.payload.status,
            uName:action.payload.uName,
            selectedFollowSettings:action.payload.followSetting,
            selectedPrivacySettings:action.payload.privacySettings
        }
    case profileSettingsActions.ProfileSettingsActionTypes.GET_PROFILE_SETTINGS_FAIL:
        return {
            ...state,
            isLoading:false,
            showError:true
        }
    case profileSettingsActions.ProfileSettingsActionTypes.SUBMIT_FORM:
        return {
            ...state,
            isLoading:true,
            name:action.payload.name,
            surname:action.payload.surname,
            status:action.payload.status,
            uName:action.payload.uName,
            selectedFollowSettings:action.payload.selectedFollowSettings,
            selectedPrivacySettings:action.payload.selectedPrivacySettings
        }
    case profileSettingsActions.ProfileSettingsActionTypes.SUBMIT_FORM_SUCCESS:
        if(!action.payload.isActionSucceed){
            return {
                ...state,
                isLoading:false,
                showError:true,
                error: action.payload.errorInformation.userInformation
            }
        }
        return {
            ...state,
            isLoading:false,
            lastUpdateSucceed:action.payload.isActionSucceed
            
        }
    case profileSettingsActions.ProfileSettingsActionTypes.SUBMIT_FORM_FAIL:        
        return {
            ...state,
            isLoading:false,
            error: "Something has broken in far away lands. We well handle it. You can try again.",
            showError:true,
            lastUpdateSucceed:false,
        }
      default: {
        return state;
      }
    }
  }
  