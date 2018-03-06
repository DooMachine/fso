import * as fromProfileImage from './profileimage';
import * as fromProfileSettings from './profilesettings';
import { ActionReducerMap, ActionReducer, MetaReducer, Action, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    profileImage: fromProfileImage.State,
    profileSettings: fromProfileSettings.State
};

const initialState: State = {
    profileImage: fromProfileImage.initialState,
    profileSettings: fromProfileSettings.initialState
};
export const reducers: ActionReducerMap<State> = 
{  
    profileImage: fromProfileImage.reducer,
    profileSettings: fromProfileSettings.reducer
};

export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === 'CLEAR_PROFILE_IMAGE_STATE') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  export const metaReducer: MetaReducer<State>[] = [clearState];


  export const getProfileSettingsState = createFeatureSelector<State>('profilesettings');
  export const getProfileImageState = createSelector(getProfileSettingsState, state => state.profileImage);
  export const getProfileSettings = createSelector(getProfileSettingsState, state=> state.profileSettings);
  export const selectPending = createSelector(getProfileSettings, state=> state.isLoading);
  export const selectLastUpdateSucceed = createSelector(getProfileSettings, state=> state.lastUpdateSucceed);