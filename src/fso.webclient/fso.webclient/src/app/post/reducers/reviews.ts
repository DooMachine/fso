
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reviewActions from '../actions/reviews';
import { Review } from '../models/review';
import * as fromPostRoot from './';
import { LikeStatus } from '../../shared/models/likeStatus.enum';

export interface State extends EntityState<Review> {
    pageSize: number;
    pageIndex: number;
    totalPageCount: number;
    totalCount: number;
    isLoading: boolean;
    error: string | null;
    hasNextPage: boolean;
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
        case reviewActions.PostIndexReviewsActionTypes.SHOW_COMMENTS:
            return adapter.updateOne({id: action.payload.reviewId,
                changes: {
                    showComments:true
                }
            },
            state);
        case reviewActions.PostIndexReviewsActionTypes.HIDE_COMMENTS:
            return adapter.updateOne({id: action.payload.reviewId,
                changes: {
                    showComments:false
                }
            },
            state);
        case reviewActions.PostIndexReviewsActionTypes.LOAD_COMMENTS:
            return state
        case reviewActions.PostIndexReviewsActionTypes.LOAD_COMMENTS_FAIL:
            return state;
        case reviewActions.PostIndexReviewsActionTypes.SHOW_COMMENT_FORM:
            return adapter.updateOne({id: action.payload,
                changes: {
                     showCommentForm:true,
                 }
                },
                state);
        case reviewActions.PostIndexReviewsActionTypes.HIDE_COMMENT_FORM:
            return adapter.updateOne({id: action.payload,
                changes: {
                    showCommentForm:false
                }
                },
                state);

        case reviewActions.PostIndexReviewsActionTypes.PUBLISH_COMMENT:
            return adapter.updateOne({id: action.payload.reviewId,
                changes: {
                        commentFormPending:false
                    }
                },
                state);
        case reviewActions.PostIndexReviewsActionTypes.PUBLISH_COMMENT_FAIL:{
            return adapter.updateOne({id: action.payload.reviewId,
                changes: {
                    commentFormPending:false,
                    commentFormError:"Oopss.. An error occured in far away lands."
                }
                },
                state);
            }
        case reviewActions.PostIndexReviewsActionTypes.ADD_REVIEWS:
            if(action.payload == null){
                return state;
            }
            return adapter.addMany(action.payload.entities, state);
                
            
        case reviewActions.PostIndexReviewsActionTypes.SET_REVIEWS:
            if(action.payload == null){
                return state;
            }
            return {
                ...adapter.addAll(action.payload.entities, state),
                pageSize:action.payload.pageSize,
                pageIndex:action.payload.pageIndex,
                totalCount:action.payload.totalCount,
                totalPageCount:action.payload.totalPageCount,
                hasNextPage:action.payload.hasNextPage,
                isLoading: true,
            };
        case reviewActions.PostIndexReviewsActionTypes.LOAD_INITIAL_REVIEWS:
            return {
                ...state,
                isLoading:true,
                pageIndex:1                          
            };
        case reviewActions.PostIndexReviewsActionTypes.LOAD_INITIAL_REVIEWS_SUCCESS:
            if(action.payload == null){
                return state;
            }
            return {
                ...adapter.addAll(action.payload.entities, state),
                pageSize:action.payload.pageSize,
                pageIndex:action.payload.pageIndex,
                totalCount:action.payload.totalCount,
                totalPageCount:action.payload.totalPageCount,
                hasNextPage:action.payload.hasNextPage,
                isLoading: true,
                };
        case reviewActions.PostIndexReviewsActionTypes.LOAD_INITIAL_REVIEWS_FAIL:
            return {
                ...state,
                error:action.payload.error,
                isLoading: false,
                };
        case reviewActions.PostIndexReviewsActionTypes.LOAD_REVIEWS:
            return {
                ...state,
                isLoading:true,
                pageIndex:state.pageIndex+1                            
            };
        case reviewActions.PostIndexReviewsActionTypes.LOAD_REVIEWS_SUCCESS:
            if(action.payload == null){
                return state;
            }
            return {
                ...adapter.addMany(action.payload.entities, state),
                pageSize:action.payload.pageSize,
                pageIndex:action.payload.pageIndex,
                totalCount:action.payload.totalCount,
                totalPageCount:action.payload.totalPageCount,
                hasNextPage:action.payload.hasNextPage,
                isLoading: true,
                };
        case reviewActions.PostIndexReviewsActionTypes.LOAD_REVIEWS_SUCCESS:
            return {
                ...state,
                error:action.payload.error,
                isLoading: false,
                };

        case reviewActions.PostIndexReviewsActionTypes.LIKE_REVIEW:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:0 }},
                state);

        case reviewActions.PostIndexReviewsActionTypes.LIKE_REVIEW_SUCCESS:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:action.payload.likeStatus }},
                state);

        case reviewActions.PostIndexReviewsActionTypes.LIKE_REVIEW_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:2 }},
                state);

        case reviewActions.PostIndexReviewsActionTypes.UNLIKE_REVIEW:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:0 }},
                state);

        case reviewActions.PostIndexReviewsActionTypes.UNLIKE_REVIEW_SUCCESS:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:action.payload.likeStatus }},
                state);

        case reviewActions.PostIndexReviewsActionTypes.UNLIKE_REVIEW_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:2 }},
                state);

        case reviewActions.PostIndexReviewsActionTypes.DISLIKE_REVIEW:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:1 }},
                state);
    
        case reviewActions.PostIndexReviewsActionTypes.DISLIKE_REVIEW_SUCCESS:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:action.payload.likeStatus }},
                state);

        case reviewActions.PostIndexReviewsActionTypes.DISLIKE_REVIEW_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:2 }},
                state);

        case reviewActions.PostIndexReviewsActionTypes.UNDISLIKE_REVIEW:
        return adapter.updateOne({id: action.payload.id,
            changes: { likeStatus:2 }},
            state);

        case reviewActions.PostIndexReviewsActionTypes.UNDISLIKE_REVIEW_SUCCESS:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:action.payload.likeStatus }},
                state);

        case reviewActions.PostIndexReviewsActionTypes.UNDISLIKE_REVIEW_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { likeStatus:1 }},
                state);
        
        default:
            return state;
    }
  }
  export const getPostState = createFeatureSelector<fromPostRoot.State>('post');
  export const getReviewsState = createSelector(getPostState,state=>state.reviews);
  export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors(getReviewsState);

  export const selectPostReviewCount = createSelector(getReviewsState, state => state.totalCount);
  export const selectHasNextPage = createSelector(getReviewsState,state=>state.hasNextPage);