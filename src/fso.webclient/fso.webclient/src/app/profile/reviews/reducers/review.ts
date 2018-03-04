
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserReviewRoot from './';
import * as reviewActions from '../actions/review';
import { ReviewViaPost } from '../../../shared/models/review/reviewViaPost';
import { Review } from '../../../shared/models/review/review';

export interface State extends EntityState<Review> {
    pageSize: number;
    pageIndex: number;
    totalPageCount: number;
    hasNextPage:boolean;
    totalCount: number;
    isLoading: boolean;
    error: string | null;
    order: string;    
}

export const adapter: EntityAdapter<Review> = createEntityAdapter<Review>({
  selectId: (review: Review) => review.id,
  sortComparer: sortDescendingById,
});

export function sortDescendingById(a: Review, b: Review): number {
    return b.id - a.id;
  }

export const initialState: State = adapter.getInitialState({
    pageSize: 6,
    pageIndex: 1,
    totalPageCount: 0,
    totalCount: 0,
    isLoading: false,
    error: null,
    hasNextPage: false,
    order: 'publishDate',        
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
        case reviewActions.UserReviewsActionTypes.LOAD_INITIAL_REVIEWS:
            return {
                ...state,
                isLoading:true,
                pageIndex:1,
                pageSize:6,                          
            };
        case reviewActions.UserReviewsActionTypes.LOAD_INITIAL_REVIEWS_SUCCESS:
            if(action.payload == null){
                return {...state,hasNextPage:false,isLoading:false};
            }
            return {
                ...adapter.addAll(action.payload.entities, state),
                pageSize:action.payload.pageSize,
                pageIndex:action.payload.pageIndex,
                totalCount:action.payload.totalCount,
                totalPageCount:action.payload.totalPageCount,
                hasNextPage:action.payload.hasNextPage,
                isLoading: false,
                };
        case reviewActions.UserReviewsActionTypes.LOAD_INITIAL_REVIEWS_FAIL:
            return {
                ...state,
                error:action.payload.error,
                isLoading: false,
                hasNextPage:false,
                };
        case reviewActions.UserReviewsActionTypes.LOAD_REVIEWS:
            return {
                ...state,
                isLoading:true,
                pageIndex:state.pageIndex+1                            
            };
        case reviewActions.UserReviewsActionTypes.LOAD_REVIEWS_SUCCESS:
            if(action.payload == null){
                return {...state,isLoading:false,hasNextPage:false};
            }
            return {
                ...adapter.addMany(action.payload.entities, state),
                pageSize:action.payload.pageSize,
                pageIndex:action.payload.pageIndex,
                totalCount:action.payload.totalCount,
                totalPageCount:action.payload.totalPageCount,
                hasNextPage:action.payload.hasNextPage,
                isLoading: false,
                };
        case reviewActions.UserReviewsActionTypes.LOAD_REVIEWS_FAIL:
            return {
                ...state,
                error:action.payload.error,
                isLoading: false,
                hasNextPage:false,
                };

        case reviewActions.UserReviewsActionTypes.LIKE_REVIEW:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:0 }},
                state);

        case reviewActions.UserReviewsActionTypes.LIKE_REVIEW_SUCCESS:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:action.payload.likeStatus }},
                state);

        case reviewActions.UserReviewsActionTypes.LIKE_REVIEW_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:2 }},
                state);

        case reviewActions.UserReviewsActionTypes.UNLIKE_REVIEW:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:0 }},
                state);

        case reviewActions.UserReviewsActionTypes.UNLIKE_REVIEW_SUCCESS:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:action.payload.likeStatus }},
                state);

        case reviewActions.UserReviewsActionTypes.UNLIKE_REVIEW_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:2 }},
                state);

        case reviewActions.UserReviewsActionTypes.DISLIKE_REVIEW:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:1 }},
                state);
    
        case reviewActions.UserReviewsActionTypes.DISLIKE_REVIEW_SUCCESS:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:action.payload.likeStatus }},
                state);

        case reviewActions.UserReviewsActionTypes.DISLIKE_REVIEW_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:2 }},
                state);

        case reviewActions.UserReviewsActionTypes.UNDISLIKE_REVIEW:
        return adapter.updateOne({id: action.payload.id,
            changes: { likeStatus:2 }},
            state);

        case reviewActions.UserReviewsActionTypes.UNDISLIKE_REVIEW_SUCCESS:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:action.payload.likeStatus }},
                state);

        case reviewActions.UserReviewsActionTypes.UNDISLIKE_REVIEW_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:1 }},
                state);
        
        default:
            return state;
    }
  }
  export const getFeatureState = createFeatureSelector<fromUserReviewRoot.State>('userreviews');
  export const getReviewsState = createSelector(getFeatureState, state=>state.reviews);
  export const selectReviewsHasNextPage = createSelector(getReviewsState,state=>state.hasNextPage);
  export const selectReviewsLoading = createSelector(getReviewsState,state=>state.isLoading);
  export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors(getReviewsState);

  export const selectHasNextPage = createSelector(getReviewsState,state=>state.hasNextPage);