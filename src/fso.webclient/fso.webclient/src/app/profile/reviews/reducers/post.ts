
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Collection } from '../../../shared/models/collection/collection';
import { PostCard } from '../../../shared/models/postcard/postCard';
import { Review } from '../../../post/models/review';
import * as postActions from '../actions/post';
import * as fromUserReviewRoot from './';

export interface State extends EntityState<PostCard> {    
}

export const adapter: EntityAdapter<PostCard> = createEntityAdapter<PostCard>({
  selectId: (post: PostCard) => post.id,
  sortComparer: false,
});
export const initialState: State = adapter.getInitialState({
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
        case postActions.PostActionTypes.GET_POSTS_SUCCESS:
            return {
                ...adapter.addMany(action.payload, state),
            };
        case postActions.PostActionTypes.GET_POSTS_FAIL:
            return {
                ...state,
            };
        case postActions.PostActionTypes.LIKE_POST:        
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: true }},
                state);

        case postActions.PostActionTypes.LIKE_POST_SUCCESS:    
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: action.payload.isLiked }},
                state);
        

        case postActions.PostActionTypes.LIKE_POST_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: false }},
                state);

        case postActions.PostActionTypes.UNLIKE_POST:        
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: false }},
                state);

        case postActions.PostActionTypes.UNLIKE_POST_SUCCESS:    
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: action.payload.isLiked }},
                state);        

        case postActions.PostActionTypes.UNLIKE_POST_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: true }},
                state);
        default:
        return state;
    }
  }
  export const getFeatureState = createFeatureSelector<fromUserReviewRoot.State>('userreviews');
  export const getPostsState = createSelector(getFeatureState,state => state.posts );
  export const {
    selectIds,
    selectEntities,
    selectAll : selectAllPosts,
    selectTotal,
  } = adapter.getSelectors(getPostsState);