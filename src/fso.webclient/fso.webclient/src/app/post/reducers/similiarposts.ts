
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as similiarpostActions from '../actions/similiarposts';
import { SimiliarPost } from '../models/similiarpost';
import * as fromPostRoot from './';

export interface State extends EntityState<SimiliarPost> {
    pageSize: number;
    pageIndex: number;
    totalPageCount: number;
    clientPageSize:number,
    clientPageIndex:number,
    totalCount: number;
    isLoading: boolean;
    error: string | null;
    hasNextPage: boolean;
    order: string;
    
}

export const adapter: EntityAdapter<SimiliarPost> = createEntityAdapter<SimiliarPost>({
  selectId: (similiarpost: SimiliarPost) => similiarpost.id,
  sortComparer: false,
});
export const initialState: State = adapter.getInitialState({
    pageSize: 20,
    pageIndex: 1,
    clientPageSize:10,
    clientPageIndex:1,
    totalPageCount: 0,
    totalCount: 0,
    isLoading: false,
    error: null,
    hasNextPage: true,
    order: 'publishDate',
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
        case similiarpostActions.PostIndexSimiliarPostsActionTypes.SET_SIMILIAR_POSTS:
            if(action.payload == null){
                return state;
            }
            return {
                ...adapter.addAll(action.payload, state)
            };
        case similiarpostActions.PostIndexSimiliarPostsActionTypes.LOAD_SIMILIAR_POSTS:
            return {
                ...state,
                isLoading:true,            
            };
        case similiarpostActions.PostIndexSimiliarPostsActionTypes.LOAD_SIMILIAR_POSTS_SUCCESS:
            if(action.payload == null){
                return state;
            }
            return {
                ...adapter.addMany(action.payload, state),
                pageSize:action.payload.pageSize,
                pageIndex:action.payload.pageIndex,
                totalCount:action.payload.totalCount,
                totalPageCount:action.payload.totalPageCount,
                hasNextPage:action.payload.hasNextPage,
                isLoading: true,
                };
        case similiarpostActions.PostIndexSimiliarPostsActionTypes.LOAD_SIMILIAR_POSTS_SUCCESS:
            return {
                ...state,
                error:action.payload.error,
                isLoading: false,
                };
        case similiarpostActions.PostIndexSimiliarPostsActionTypes.LOAD_SIMILIAR_POSTS:
            return {
                ...state,
                clientPageSize:20,            
            };
        case similiarpostActions.PostIndexSimiliarPostsActionTypes.INCREMENT_POST_THUMBNAIL_INDEX:

            const original = state.entities[action.payload.id].activeThumbnailIndex;
            console.log(state.entities[action.payload.id]);
            const thumbCount = state.entities[action.payload.id].thumbnailUrls.length;
            
            if (thumbCount <= 1) {
                return state;
            }
            return adapter.updateOne({ id: action.payload.id,
                changes: { activeThumbnailIndex:  (original + 1) % (thumbCount) }},
              state);
        case similiarpostActions.PostIndexSimiliarPostsActionTypes.RESET_POST_THUMBNAIL_INDEX:
            return adapter.updateOne({ id: action.payload.id,
                changes: { activeThumbnailIndex: 0 }},
                state);
        default:
            return state;
    }
  }
  export const getPostState = createFeatureSelector<fromPostRoot.State>('post');
  export const getSimiliarPostState = createSelector(getPostState,state=>state.similiarPosts)
  export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors(getSimiliarPostState);
  export const selectClientPageIndex = createSelector(getSimiliarPostState, state=>state.clientPageIndex);
  export const selectClientPageSize = createSelector(getSimiliarPostState, state=>state.clientPageSize);
  export const selectIsMoreThenPageSize = createSelector(
    selectTotal,   
    total => total > 10
  );
  export const getPaginatedSimiliarPosts =  createSelector(
    selectClientPageIndex,
    selectClientPageSize,
    selectAll,    
    (pageIndex,pageSize, entities) => {   
        return entities.slice((pageIndex-1)*pageSize,pageSize);        
    }
  );