
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Collection } from '../../../shared/models/collection/collection';
import { PostCard } from '../../../shared/models/postcard/postCard';
import { Review } from '../../../post/models/review';
import * as postActions from '../actions/post';

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
    pageSize: 4,
    pageIndex: 0,
    totalPageCount: 0,
    totalCount: 0,
    isLoading: false,
    error: 'An error occured...',
    showError: false,
    hasNextPage: false,
    order: 'publishDate',
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
        case postActions.PostActionTypes.GET_POSTS:
            return {
                ...state,
                isLoading: true,
                pageIndex: state.pageIndex +1,
            };
        case postActions.PostActionTypes.GET_POSTS_SUCCESS:
        if(action.payload == null){
            return {
                ...state,isLoading:false,hasNextPage:false
            }
        }
            return {
                ...adapter.addMany(action.payload.entities, state),
                totalPageCount: action.payload.totalPageCount,
                totalCount: action.payload.totalCount,
                hasNextPage: action.payload.hasNextPage,
                isLoading: false
            };
        case postActions.PostActionTypes.GET_POSTS_FAIL:
            return {
                ...state,
                isLoading: false,
                showError: true,
                pageIndex: state.pageIndex,
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

