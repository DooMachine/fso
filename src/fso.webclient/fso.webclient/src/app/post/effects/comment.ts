import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as postCommentActions from '../actions/comments';
import * as authActions from '../../auth/actions/auth.actions';
import * as fromCore from '../../core/actions';
import { State } from '../../reducers';
import { PostLikeService } from '../../shared/services/postlike.service';
import { ReviewLikeService } from '../../shared/services/reviewlike.service';
import { PostService } from '../services/post.service';
import { CommentService } from '../../shared/services/comment.service';
import { HideCommentForm } from '../actions/reviews';

@Injectable()
export class PostCommentEffects {

    @Effect() onUserLikeComment$: Observable<Action> =
    this.actions$.ofType<postCommentActions.LikeCommentAction>(postCommentActions.PostIndexCommentsActionTypes.LIKE_COMMENT)    
    .switchMap((action) => {
        return this.commentService
        .LikeComment(action.payload.commentId)
        .map(data => {
            if(data.isActionSucceed){
                return new postCommentActions.LikeCommentSuccessAction
                ({likeStatus: data.likeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId});
            }else{
                return new postCommentActions.LikeCommentFailAction({likeStatus: data.likeStatus,commentId: action.payload.commentId, reviewId:action.payload.reviewId})
            }            
            })
            .catch((error) => {
                console.log(error);
                return Observable.of(
                new postCommentActions.LikeCommentFailAction({likeStatus: action.payload.prevlikeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId})
                );
            });
        });
    @Effect() onDeleteComment$: Observable<Action> =
    this.actions$.ofType<postCommentActions.DeleteComment>(postCommentActions.PostIndexCommentsActionTypes.DELETE_COMMENT)    
    
    .switchMap((action) => {
        return this.commentService
        .DeleteComment(action.payload)
        .map(data => {             
            return new postCommentActions.DeleteCommentSuccess({commentId:action.payload});
        })
        .catch((error) => {
            return Observable.of(
            new postCommentActions.DeleteCommentFail({commentId: action.payload.comentId})
            );
        });
    });
        @Effect() onUserUnlikeComment$: Observable<Action> =
        this.actions$.ofType<postCommentActions.UnLikeCommentAction>(postCommentActions.PostIndexCommentsActionTypes.UNLIKE_COMMENT)    
        .switchMap((action) => {
        return this.commentService
        .UnlikeComment(action.payload.commentId)
        .map(data => {
            if(data.isActionSucceed){
                return new postCommentActions.UnLikeCommentSuccessAction({likeStatus: data.likeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId});
            }else{
                return new postCommentActions.UnLikeCommentFailAction({likeStatus: data.likeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId})
            }            
            })
            .catch((error) => {
            return Observable.of(
                new postCommentActions.UnLikeCommentFailAction({likeStatus: action.payload.prevlikeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId})
            );
            });
        });
        @Effect() onHideBarPublishComments$: Observable<Action> =
        this.actions$.ofType<postCommentActions.PublishCommentSuccess>(postCommentActions.PostIndexCommentsActionTypes.PUBLISH_COMMENT_SUCCESS)
        .switchMap((action) => {
            return Observable.from([ 
                new fromCore.HideProgressBar(),
                new HideCommentForm(action.payload.comment.reviewId)
            ]);
        });
        @Effect() onUserDislikeComment$: Observable<Action> =
        this.actions$.ofType<postCommentActions.DislikeCommentAction>(postCommentActions.PostIndexCommentsActionTypes.DISLIKE_COMMENT)    
        .switchMap((action) => {
        return this.commentService
        .DislikeComment(action.payload.commentId)
        .map(data => {
            if(data.isActionSucceed){
                return new postCommentActions.DislikeCommentSuccessAction
                    ({likeStatus: data.likeStatus,commentId:action.payload.commentId, reviewId: action.payload.reviewId});
            }else{
                return new postCommentActions.DislikeCommentFailAction({likeStatus: data.likeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId})
            }            
            })
            .catch((error) => {
            return Observable.of(
                new postCommentActions.DislikeCommentFailAction({likeStatus: action.payload.prevlikeStatus,commentId: action.payload.commentId, reviewId:action.payload.reviewId})
            );
            });
        });
        @Effect() onUserUndislikeComment$: Observable<Action> =
        this.actions$.ofType<postCommentActions.UnDislikeCommentAction>(postCommentActions.PostIndexCommentsActionTypes.UNDISLIKE_COMMENT)    
        .switchMap((action) => {
        return this.commentService
        .UndislikeComment(action.payload.commentId)
        .map(data => {
            if(data.isActionSucceed){
                return new postCommentActions.UnDislikeCommentSuccessAction
                    ({likeStatus: data.likeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId});
            }else{
                return new postCommentActions.UnDislikeCommentFailAction({likeStatus: data.likeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId})
            }            
            })
            .catch((error) => {
            return Observable.of(
                new postCommentActions.UnDislikeCommentFailAction({likeStatus: action.payload.prevlikeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId})
            );
            });
        });
            constructor(
                private actions$: Actions,
                private commentService:CommentService,
                private store: Store<State>
            ) {}
        }
