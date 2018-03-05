

import * as fromComments from './reducers';

import { ActionReducerMap,
   ActionReducer, Action,
    MetaReducer,createFeatureSelector,
     createSelector } from '@ngrx/store';


export interface State {
    comments: fromComments.State;
}
export const reducers: ActionReducerMap<State> =
   {
    comments: fromComments.reducer,
 };


  export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === 'CLEAR_FEED_STATE') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  export const metaReducer: MetaReducer<State>[] = [clearState];


  export const getPostState = createFeatureSelector<State>('feed-comment');

  
 