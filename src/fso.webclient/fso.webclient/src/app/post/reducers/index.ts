

import * as fromComments from './comment';
import * as fromPost from './post';
import * as fromReview from './reviews';
import * as fromSimiliarPosts from './similiarposts';
import * as fromPostParts from './postparts';
import * as fromAddReview from './addreview';

import { ActionReducerMap,
   ActionReducer, Action,
    MetaReducer,createFeatureSelector,
     createSelector } from '@ngrx/store';


export interface State {
    post: fromPost.State;
    postparts: fromPostParts.State;
    reviews: fromReview.State;
    comments: fromComments.State;
    similiarPosts: fromSimiliarPosts.State;
    addReview:fromAddReview.State;
}
export const reducers: ActionReducerMap<State> =
   {
    post: fromPost.reducer,
    postparts:fromPostParts.reducer,
    reviews: fromReview.reducer,
    comments: fromComments.reducer,
    similiarPosts:fromSimiliarPosts.reducer,
    addReview:fromAddReview.reducer
 };


  export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === 'CLEAR_POST_STATE') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  export const metaReducer: MetaReducer<State>[] = [clearState];


  export const getPostState = createFeatureSelector<State>('post');

  
 