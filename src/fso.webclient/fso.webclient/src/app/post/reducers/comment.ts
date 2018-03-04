
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as commentActions from '../actions/comments';
import * as fromPostRoot from './';
import { LikeStatus } from '../../shared/models/likeStatus.enum';
import { ReviewComment } from '../models/reviewComment';

export interface State extends EntityState<ReviewComment> {
    pageSize: number;
    pageIndex: number;
    totalPageCount: number;
    totalCount: number;
    isLoading: boolean;
    error: string | null;
    hasNextPage: boolean;
    order: string;    
}

export const adapter: EntityAdapter<ReviewComment> = createEntityAdapter<ReviewComment>({
  selectId: (comment: ReviewComment) => comment.id,
  sortComparer: sortDescendingById,
});

export function sortDescendingById(a: ReviewComment, b: ReviewComment): number {
    return b.id - a.id;
}

export const initialState: State = adapter.getInitialState({
    pageSize: 4,
    pageIndex: 1,
    totalPageCount: 0,
    totalCount: 0,
    isLoading: false,
    error: null,
    hasNextPage: true,
    order: 'publishDate',
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
        case commentActions.PostIndexCommentsActionTypes.PUBLISH_COMMENT_SUCCESS:{
            return adapter.addOne(action.payload.comment,state);            
            }
        case commentActions.PostIndexCommentsActionTypes.LOAD_COMMENTS_SUCCESS:{

            return adapter.addMany(action.payload.entities,state);

            }
        case commentActions.PostIndexCommentsActionTypes.LIKE_COMMENT:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: { likeStatus: action.payload.likeStatus }},
                state);
            }
        case commentActions.PostIndexCommentsActionTypes.LIKE_COMMENT_SUCCESS:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: {  likeStatus: action.payload.likeStatus }},
                state);
            }
        case commentActions.PostIndexCommentsActionTypes.LIKE_COMMENT_FAIL:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: {  likeStatus: action.payload.prevlikeStatus }},
                state);
            }
        case commentActions.PostIndexCommentsActionTypes.UNLIKE_COMMENT:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: { likeStatus: LikeStatus.None }},
                state);
            }
        case commentActions.PostIndexCommentsActionTypes.UNLIKE_COMMENT_SUCCESS:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: {  likeStatus: action.payload.likeStatus }},
                state);
            }
        case commentActions.PostIndexCommentsActionTypes.UNLIKE_COMMENT_FAIL:{
            return adapter.updateOne({id: action.payload.commentId,
                changes: { likeStatus: action.payload.prevlikeStatus  }},
                state);
            }

        case commentActions.PostIndexCommentsActionTypes.DISLIKE_COMMENT:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: { likeStatus: LikeStatus.Dislike }},
                state);
            }
        case commentActions.PostIndexCommentsActionTypes.DISLIKE_COMMENT_SUCCESS:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: {  likeStatus: action.payload.likeStatus }},
                state);
            }
        case commentActions.PostIndexCommentsActionTypes.DISLIKE_COMMENT_FAIL:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: { likeStatus: action.payload.prevlikeStatus  }},
                state);
            }
        case commentActions.PostIndexCommentsActionTypes.UNDISLIKE_COMMENT:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: { likeStatus: LikeStatus.None }},
                state);
            }
        case commentActions.PostIndexCommentsActionTypes.UNDISLIKE_COMMENT_SUCCESS:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: {  likeStatus: action.payload.likeStatus }},
                state);
            }
        case commentActions.PostIndexCommentsActionTypes.UNDISLIKE_COMMENT_FAIL:{

            return adapter.updateOne({id: action.payload.commentId,
                changes: { likeStatus: action.payload.prevlikeStatus  }},
                state);
            }
       
        default:
            return state;
    }
  }
  export const getPostState = createFeatureSelector<fromPostRoot.State>('post');
  export const getCommentsState = createSelector(getPostState,state=>state.comments)
  export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors(getCommentsState);