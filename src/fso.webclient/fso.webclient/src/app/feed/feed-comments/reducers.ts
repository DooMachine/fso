
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as commentActions from './actions';
import {State as CommentsState } from './';
import { LikeStatus } from '../../shared/models/likeStatus.enum';
import { ReviewComment } from '../../post/models/reviewComment';

export interface State extends EntityState<ReviewComment> {
    commentloadedReviewIds:Array<number>;
    openedReviewCommentIds:Array<number>;
    openedCommentFormReviewIds:Array<number>;
}

export const adapter: EntityAdapter<ReviewComment> = createEntityAdapter<ReviewComment>({
  selectId: (comment: ReviewComment) => comment.id,
  sortComparer: sortDescendingById,
});

export function sortDescendingById(a: ReviewComment, b: ReviewComment): number {
    return b.id - a.id;
}

export const initialState: State = adapter.getInitialState({
    commentloadedReviewIds:[],
    openedReviewCommentIds:[],
    openedCommentFormReviewIds:[]
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
        case commentActions.FeedCommentsActionTypes.PUBLISH_COMMENT_SUCCESS:{
            return adapter.addOne(action.payload.comment,state);  
        }
        case commentActions.FeedCommentsActionTypes.OPEN_COMMENT_SECTION:{
            let openedIds = state.openedReviewCommentIds;
            openedIds.push(action.payload);
            return {...state,openedReviewCommentIds: openedIds};            
            }
        case commentActions.FeedCommentsActionTypes.CLOSE_COMMENT_SECTION:{
            return {...state,openedReviewCommentIds: state.openedReviewCommentIds.filter(val=> val != action.payload)};            
            }
        case commentActions.FeedCommentsActionTypes.OPEN_COMMENT_FORM_SECTION:{
            let openedIds = state.openedCommentFormReviewIds;
            openedIds.push(action.payload);
            return {...state,openedCommentFormReviewIds: openedIds};            
            }
        case commentActions.FeedCommentsActionTypes.CLOSE_COMMENT_FORM_SECTION:{
            return {...state,openedCommentFormReviewIds: state.openedCommentFormReviewIds.filter(val=> val != action.payload)};            
            }
        case commentActions.FeedCommentsActionTypes.LOAD_REVIEW_COMMENTS:{
            return state;
        }
        case commentActions.FeedCommentsActionTypes.LOAD_REVIEW_COMMENTS_SUCCESS:{
            let loadedCommentsReviewIds = state.commentloadedReviewIds;
            loadedCommentsReviewIds.push(action.payload.reviewId);
            return {...adapter.addMany(action.payload.entities,state),commentloadedReviewIds:loadedCommentsReviewIds};
            }
        case commentActions.FeedCommentsActionTypes.LOAD_REVIEW_COMMENTS_FAIL:{
            return state;
            }
        case commentActions.FeedCommentsActionTypes.LIKE_COMMENT:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: { likeStatus: action.payload.likeStatus }},
                state);
            }
        case commentActions.FeedCommentsActionTypes.LIKE_COMMENT_SUCCESS:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: {  likeStatus: action.payload.likeStatus }},
                state);
            }
        case commentActions.FeedCommentsActionTypes.LIKE_COMMENT_FAIL:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: {  likeStatus: action.payload.prevlikeStatus }},
                state);
            }
        case commentActions.FeedCommentsActionTypes.UNLIKE_COMMENT:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: { likeStatus: LikeStatus.None }},
                state);
            }
        case commentActions.FeedCommentsActionTypes.UNLIKE_COMMENT_SUCCESS:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: {  likeStatus: action.payload.likeStatus }},
                state);
            }
        case commentActions.FeedCommentsActionTypes.UNLIKE_COMMENT_FAIL:{
            return adapter.updateOne({id: action.payload.commentId,
                changes: { likeStatus: action.payload.prevlikeStatus  }},
                state);
            }

        case commentActions.FeedCommentsActionTypes.DISLIKE_COMMENT:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: { likeStatus: LikeStatus.Dislike }},
                state);
            }
        case commentActions.FeedCommentsActionTypes.DISLIKE_COMMENT_SUCCESS:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: {  likeStatus: action.payload.likeStatus }},
                state);
            }
        case commentActions.FeedCommentsActionTypes.DISLIKE_COMMENT_FAIL:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: { likeStatus: action.payload.prevlikeStatus  }},
                state);
            }
        case commentActions.FeedCommentsActionTypes.UNDISLIKE_COMMENT:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: { likeStatus: LikeStatus.None }},
                state);
            }
        case commentActions.FeedCommentsActionTypes.UNDISLIKE_COMMENT_SUCCESS:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: {  likeStatus: action.payload.likeStatus }},
                state);
            }
        case commentActions.FeedCommentsActionTypes.UNDISLIKE_COMMENT_FAIL:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: { likeStatus: action.payload.prevlikeStatus  }},
                state);
            }
       
        default:
            return state;
    }
  }
  export const getFeedCommentsState = createFeatureSelector<CommentsState>('feed-comments');
  export const getCommentsState = createSelector(getFeedCommentsState,state=>state.comments);
  export const selectOpenedCommentReviewIds = createSelector(getCommentsState,state=>state.openedReviewCommentIds);
  export const selectLoadedCommentReviewIds = createSelector(getCommentsState,state=>state.commentloadedReviewIds);
  export const selectopenedCommentFormReviewIds = createSelector(getCommentsState,state=>state.openedCommentFormReviewIds);
  export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors(getCommentsState);