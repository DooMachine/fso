
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Collection } from '../../shared/models/collection/collection';
import { PostBest } from '../../shared/models/post/postbest';
import * as popularPostActions from '../actions/popularposts';


export interface State extends EntityState<PostBest> {    
    pageSize: number;
    isLoading: boolean;
    error: string;
    showError: boolean;
}

export const adapter: EntityAdapter<PostBest> = createEntityAdapter<PostBest>({
    selectId: (post: PostBest) => post.id,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    
    pageSize: 4,
    isLoading: false,
    error: 'Oops.. Something went wrong!',
    showError: false,
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
        case popularPostActions.PopularPostsActionTypes.GET_POPULARPOSTS:
            return {
                ...state,
                isLoading: true,
            };
        case popularPostActions.PopularPostsActionTypes.GET_POPULARPOSTS_SUCCESS:
            return {
                ...adapter.addAll(action.payload, state),
                isLoading: false
            };
        case popularPostActions.PopularPostsActionTypes.GET_POPULARPOSTS_FAIL:
            return {
                ...state,
                isLoading: false,
                showError: true,
            };
        case popularPostActions.PopularPostsActionTypes.INCREMENT_POST_THUMBNAIL_INDEX:

        const original = state.entities[action.payload.id].activeThumbnailIndex;
        const thumbCount = state.entities[action.payload.id].thumbnailUrls.length;
        
        if (thumbCount <= 1) {
            return state;
        }
        return adapter.updateOne({ id: action.payload.id,
            changes: { activeThumbnailIndex:  (original + 1) % (thumbCount) }},
            state);
        case popularPostActions.PopularPostsActionTypes.RESET_POST_THUMBNAIL_INDEX:
        return adapter.updateOne({ id: action.payload.id,
            changes: { activeThumbnailIndex: 0 }},
            state);
      default: {
            return state;
      }
    }
  }

  export const getProfileState = createFeatureSelector<State>('profile');
  export const getPopularPostsState = createSelector(getProfileState, state => state['bestPosts']);
  export const getLoading = createSelector(getPopularPostsState, state=>state.isLoading)
  export const {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal,
    } = adapter.getSelectors(getPopularPostsState);
    
    export const isEmpty = createSelector(
        selectTotal,
        getLoading,
        (total, isLoading) => {
          return !isLoading && total ===0
        }
      );
