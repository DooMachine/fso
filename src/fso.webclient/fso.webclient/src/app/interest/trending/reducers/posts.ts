
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as trendingPosts from '../actions/post';
import * as fromFeatureRoot from './';
import { PostCard } from '../../../shared/models/postcard/postCard';

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
        case trendingPosts.InterestTrendingActionTypes.GET_TRENDING_POSTS:
            return {
                ...state,
                isLoading: true,
                pageIndex: state.pageIndex,
            };
        case trendingPosts.InterestTrendingActionTypes.GET_TRENDING_POSTS_SUCCESS:
            if(action.payload == null){
                return {...state,hasNextPage:false};
            }
            return {
                ...adapter.addMany(action.payload.entities, state),
                totalPageCount: action.payload.totalPageCount,
                totalCount: action.payload.totalCount,
                hasNextPage: action.payload.hasNextPage,
                isLoading: false
            };
        case trendingPosts.InterestTrendingActionTypes.GET_TRENDING_POSTS_FAIL:
            return {
                ...state,
                isLoading: false,
                showError: true,
                pageIndex: state.pageIndex,
            };
        case trendingPosts.InterestTrendingActionTypes.LIKE_POST:        
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: true }},
                state);

        case trendingPosts.InterestTrendingActionTypes.LIKE_POST_SUCCESS:    
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: action.payload.isLiked }},
                state);
        

        case trendingPosts.InterestTrendingActionTypes.LIKE_POST_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: false }},
                state);

        case trendingPosts.InterestTrendingActionTypes.UNLIKE_POST:        
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: false }},
                state);

        case trendingPosts.InterestTrendingActionTypes.UNLIKE_POST_SUCCESS:    
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: action.payload.isLiked }},
                state);        

        case trendingPosts.InterestTrendingActionTypes.UNLIKE_POST_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: true }},
                state);
        case trendingPosts.InterestTrendingActionTypes.FOLLOW_USER:{
            let prev = state.entities[action.payload.postId];
            let next = Object.assign({},prev,{authorInfo:{...prev.authorInfo, followState:1 }})
            return adapter.updateOne({id: action.payload.postId,
                changes: next},
                state);
            }
        case trendingPosts.InterestTrendingActionTypes.FOLLOW_USER_SUCCESS:{
            let prev = state.entities[action.payload.postId]; 
            let next = Object.assign({},prev,{authorInfo:{...prev.authorInfo, followState:action.payload.lastFollowState }})
            return adapter.updateOne({id: action.payload.postId,
                changes: next},
                state);        
            }
        case trendingPosts.InterestTrendingActionTypes.FOLLOW_USER_FAIL:{
            let prev = state.entities[action.payload.postId];
            let next = Object.assign({},prev,{authorInfo:{...prev.authorInfo, followState:2 }})
            return adapter.updateOne({id: action.payload.postId,
                changes: next},
                state);
            }
        case trendingPosts.InterestTrendingActionTypes.UNFOLLOW_USER:{
            let prev = state.entities[action.payload.postId];
            let next = Object.assign({},prev,{authorInfo:{...prev.authorInfo, followState:2 }})
            return adapter.updateOne({id: action.payload.postId,
                changes: next},
                state);
            }
        case trendingPosts.InterestTrendingActionTypes.UNFOLLOW_USER_SUCCESS:{
            let prev = state.entities[action.payload.postId]; 
            let next = Object.assign({},prev,{authorInfo:{...prev.authorInfo, followState:action.payload.lastFollowState }})
            return adapter.updateOne({id: action.payload.postId,
                changes: next},
                state);        
            }
        case trendingPosts.InterestTrendingActionTypes.UNFOLLOW_USER_FAIL:{
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

  export const getFeatureState = createFeatureSelector<fromFeatureRoot.State>('interesttrending');
  export const getTrendingPosts = createSelector(getFeatureState, state=>state.posts)
  export const {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal,
    } = adapter.getSelectors(getTrendingPosts);