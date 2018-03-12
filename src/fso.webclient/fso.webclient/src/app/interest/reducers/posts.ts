
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as postActions from '../actions/posts';
import * as fromInterestRoot from './';
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
        case postActions.InterestPostActionTypes.GET_POSTS:
            return {
                ...state,
                isLoading: true,
                pageIndex: state.pageIndex+1,
            };
        case postActions.InterestPostActionTypes.GET_POSTS_SUCCESS:
            if(action.payload == null){
                return {...state,hasNextPage:false,isLoading:false};
            }
            return {
                ...adapter.addMany(action.payload.entities, state),
                totalPageCount: action.payload.totalPageCount,
                totalCount: action.payload.totalCount,
                hasNextPage: action.payload.hasNextPage,
                isLoading: false
            };
        case postActions.InterestPostActionTypes.GET_POSTS_FAIL:
            return {
                ...state,
                isLoading: false,
                showError: true,
                pageIndex: state.pageIndex,
            };
        case postActions.InterestPostActionTypes.LIKE_POST:        
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: true }},
                state);

        case postActions.InterestPostActionTypes.LIKE_POST_SUCCESS:    
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: action.payload.isLiked }},
                state);
        

        case postActions.InterestPostActionTypes.LIKE_POST_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: false }},
                state);

        case postActions.InterestPostActionTypes.UNLIKE_POST:        
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: false }},
                state);

        case postActions.InterestPostActionTypes.UNLIKE_POST_SUCCESS:    
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: action.payload.isLiked }},
                state);        

        case postActions.InterestPostActionTypes.UNLIKE_POST_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: true }},
                state);
        case postActions.InterestPostActionTypes.FOLLOW_USER:{
            let prev = state.entities[action.payload.postId];
            let next = Object.assign({},prev,{authorInfo:{...prev.authorInfo, followState:1 }})
            return adapter.updateOne({id: action.payload.postId,
                changes: next},
                state);
            }
        case postActions.InterestPostActionTypes.FOLLOW_USER_SUCCESS:{
            let prev = state.entities[action.payload.postId]; 
            let next = Object.assign({},prev,{authorInfo:{...prev.authorInfo, followState:action.payload.lastFollowState }})
            return adapter.updateOne({id: action.payload.postId,
                changes: next},
                state);        
            }
        case postActions.InterestPostActionTypes.FOLLOW_USER_FAIL:{
            let prev = state.entities[action.payload.postId];
            let next = Object.assign({},prev,{authorInfo:{...prev.authorInfo, followState:2 }})
            return adapter.updateOne({id: action.payload.postId,
                changes: next},
                state);
            }
        case postActions.InterestPostActionTypes.UNFOLLOW_USER:{
            let prev = state.entities[action.payload.postId];
            let next = Object.assign({},prev,{authorInfo:{...prev.authorInfo, followState:2 }})
            return adapter.updateOne({id: action.payload.postId,
                changes: next},
                state);
            }
        case postActions.InterestPostActionTypes.UNFOLLOW_USER_SUCCESS:{
            let prev = state.entities[action.payload.postId]; 
            let next = Object.assign({},prev,{authorInfo:{...prev.authorInfo, followState:action.payload.lastFollowState }})
            return adapter.updateOne({id: action.payload.postId,
                changes: next},
                state);        
            }
        case postActions.InterestPostActionTypes.UNFOLLOW_USER_FAIL:{
            let prev = state.entities[action.payload.postId];
            let next = Object.assign({},prev,{authorInfo:{...prev.authorInfo, followState:1 }})
            return adapter.updateOne({id: action.payload.postId,
                changes: next},
                state);
            }
        default:
        return state;
    }
  }

  export const getFeatureState = createFeatureSelector<fromInterestRoot.State>('interest');
  export const getPostState = createSelector(getFeatureState, state=>state.posts);
  export const selectLoading = createSelector(getPostState,state=>state.isLoading);
  export const selectHasNextPage = createSelector(getPostState,state=>state.hasNextPage);
  export const {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal,
    } = adapter.getSelectors(getPostState);