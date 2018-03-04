
import * as fromInterest from './interest';

import { ActionReducerMap,
   ActionReducer, Action,
    MetaReducer,createFeatureSelector,
     createSelector } from '@ngrx/store';


export interface State {
    interests: fromInterest.State;
}
export const reducers: ActionReducerMap<State> =
   {
    interests: fromInterest.reducer,
 };


  export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === 'CLEAR_EXPLORE_STATE') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  export const metaReducer: MetaReducer<State>[] = [clearState];

  export const getProfileState = createFeatureSelector<State>('trending');

