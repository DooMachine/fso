import * as fromPost from './post';
import * as fromReview from './postreviews';
import * as fromComment from './comment';
import { ActionReducerMap, ActionReducer, Action, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    posts: fromPost.State;
    reviews: fromReview.State;
    comments: fromComment.State;
};

const initialState: State = {
    posts: fromPost.initialState,
    reviews: fromReview.initialState,
    comments:fromComment.initialState
};
export const reducers: ActionReducerMap<State> = 
{  
    posts:  fromPost.reducer,
    reviews: fromReview.reducer,
    comments: fromComment.reducer
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

  export const getUserPostsState = createFeatureSelector<State>('userposts');
  export const getserPostsEntitiesState = createSelector(
    getUserPostsState,
    state => state.posts
  );
  export const selectProfilePostLoading = createSelector(getserPostsEntitiesState,state=>state.isLoading);
  export const selectProfilePostHasNextPage = createSelector(getserPostsEntitiesState,state=>state.hasNextPage);
  export const {
    selectIds: getPostIds,
    selectEntities: getPostEntities,
    selectAll: getAllPosts,
    selectTotal: getTotalPosts,
  } = fromPost.adapter.getSelectors(getserPostsEntitiesState);

  export const getReviewsState = createSelector(getUserPostsState, state => state.reviews);
  
  export const {
    selectIds: getReviewIds,
    selectEntities: getReviewEntities,
    selectAll: getAllReviews,
    selectTotal: getTotalReviews,
    } = fromReview.adapter.getSelectors(getReviewsState);

    export const getCommentsState = createSelector(getUserPostsState, state => state.comments);
  
    export const {
        selectIds: getCommentIds,
        selectEntities: getCommentEntities,
        selectAll: getAllComments,
        selectTotal: getTotalComments,
      } = fromComment.adapter.getSelectors(getCommentsState);
