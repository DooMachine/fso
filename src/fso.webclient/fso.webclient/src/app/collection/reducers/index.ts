

import * as fromCollection from './collection';
import * as fromPost from './post';

import { ActionReducerMap,
   ActionReducer, Action,
    MetaReducer,createFeatureSelector,
     createSelector } from '@ngrx/store';


export interface State {
    posts: fromPost.State;
    collection: fromCollection.State;
}
export const reducers: ActionReducerMap<State> =
   {
    posts: fromPost.reducer,
    collection:fromCollection.reducer
 };


  export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === 'CLEAR_COLLECTION_STATE') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  export const metaReducer: MetaReducer<State>[] = [clearState];
  export const getPostState = createFeatureSelector<State>('collection');

  
 