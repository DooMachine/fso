

import * as fromInterest from './interest';
import * as fromPost from './posts';

import { ActionReducerMap,
   ActionReducer, Action,
    MetaReducer,createFeatureSelector,
     createSelector } from '@ngrx/store';


export interface State {
    posts: fromPost.State;
    interest: fromInterest.State;
}
export const reducers: ActionReducerMap<State> =
   {
    posts: fromPost.reducer,
    interest:fromInterest.reducer
 };


  export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === 'CLEAR_INTEREST_STATE') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  export const metaReducer: MetaReducer<State>[] = [clearState];

  
 