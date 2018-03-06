
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as postActions from '../actions/post';
import * as fromCollecitonRoot from './';
import { PostCard } from '../../shared/models/postcard/postCard';

export interface State extends EntityState<PostCard> {
    pageSize: number;
    pageIndex: number;
    totalPageCount: number;
    totalCount: number;
    isLoading: boolean;
    error: string;
    showError: boolean;
    hasNextPage: boolean;
    order: string;
    
}

export const adapter: EntityAdapter<PostCard> = createEntityAdapter<PostCard>({
  selectId: (post: PostCard) => post.id,
  sortComparer: false,
});


export const initialState: State = adapter.getInitialState({
    pageSize: 8,
    pageIndex: 1,
    totalPageCount: 0,
    totalCount: 0,
    isLoading: false,
    error: 'An error occured...',
    showError: false,
    hasNextPage: true,
    order: 'publishDate',
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
        case postActions.CollectionPostActionTypes.GET_POSTS:
            return {
                ...state,
                isLoading: true,
                pageIndex: state.pageIndex,
            };
        case postActions.CollectionPostActionTypes.GET_POSTS_SUCCESS:
            return {
                ...adapter.addMany(action.payload.entities, state),
                totalPageCount: action.payload.totalPageCount,
                totalCount: action.payload.totalCount,
                hasNextPage: action.payload.hasNextPage,
                isLoading: false
            };
        case postActions.CollectionPostActionTypes.GET_POSTS_FAIL:
            return {
                ...state,
                isLoading: false,
                showError: true,
                pageIndex: state.pageIndex,
            };
        case postActions.CollectionPostActionTypes.LIKE_POST:        
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: true }},
                state);

        case postActions.CollectionPostActionTypes.LIKE_POST_SUCCESS:    
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: action.payload.isLiked }},
                state);
        

        case postActions.CollectionPostActionTypes.LIKE_POST_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: false }},
                state);

        case postActions.CollectionPostActionTypes.UNLIKE_POST:        
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: false }},
                state);

        case postActions.CollectionPostActionTypes.UNLIKE_POST_SUCCESS:    
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: action.payload.isLiked }},
                state);        

        case postActions.CollectionPostActionTypes.UNLIKE_POST_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: true }},
                state);
        default:
        return state;
    }
  }

  export const getFeatureState = createFeatureSelector<fromCollecitonRoot.State>('collection');
  export const getPostState = createSelector(getFeatureState, state=>state.posts)
  export const {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal,
    } = adapter.getSelectors(getPostState);