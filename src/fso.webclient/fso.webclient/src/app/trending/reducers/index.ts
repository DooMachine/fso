
import * as fromInterest from './interest';
import * as fromBestPosts from './post';

import { ActionReducerMap,
   ActionReducer, Action,
    MetaReducer,createFeatureSelector,
     createSelector } from '@ngrx/store';


export interface State {
    interests: fromInterest.State;
    posts: fromBestPosts.State;
}
export const reducers: ActionReducerMap<State> =
   {
    interests: fromInterest.reducer,
    posts: fromBestPosts.reducer,
 };


  export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === 'CLEAR_TRENDING_STATE') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  export const metaReducer: MetaReducer<State>[] = [clearState];

  export const getProfileState = createFeatureSelector<State>('trending');

