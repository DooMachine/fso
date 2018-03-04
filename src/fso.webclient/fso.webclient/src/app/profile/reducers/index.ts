
import * as fromInterest from './interest';
import * as fromUserInfo from './user';
import * as fromUserActivity from './userActivity';
import * as fromBestPosts from './popularposts';

import { ActionReducerMap,
   ActionReducer, Action,
    MetaReducer,createFeatureSelector,
     createSelector } from '@ngrx/store';


export interface State {
    userInfo: fromUserInfo.State;
    interests: fromInterest.State;
    activity: fromUserActivity.State;
    bestPosts: fromBestPosts.State;
}
export const reducers: ActionReducerMap<State> =
   {
    interests: fromInterest.reducer,
    userInfo: fromUserInfo.reducer,
    activity: fromUserActivity.reducer,
    bestPosts: fromBestPosts.reducer,
 };


  export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === 'CLEAR_PROFILE_STATE') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  export const metaReducer: MetaReducer<State>[] = [clearState];

  export const getProfileState = createFeatureSelector<State>('profile');

  export const getUserInfoState = createSelector(getProfileState, state => state.userInfo);
  export const getUserName = createSelector(getProfileState, state => state.userInfo.userInfo.username);

