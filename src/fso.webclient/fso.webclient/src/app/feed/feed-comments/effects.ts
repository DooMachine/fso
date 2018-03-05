import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as authActions from '../../auth/actions/auth.actions';
import * as fromCore from '../../core/actions';
import { CommentService } from '../../shared/services/comment.service';
import * as feedCommentActions from './actions';
import { FeedCommentsService } from './commentservice';

@Injectable()
export class FeedCommentEffects { 

    @Effect() onPublishComment$: Observable<Action> =
    this.actions$.ofType<feedCommentActions.PublishComment>(feedCommentActions.FeedCommentsActionTypes.PUBLISH_COMMENT)    
    
    .switchMap((action) => {
        return this.commentService
        .PublishComment(action.payload)
        .map(data => {             
               return new feedCommentActions.PublishCommentSuccess(data);
          })
          .catch((error) => {
            return Observable.of(
              new feedCommentActions.PublishCommentFail({id: action.payload.reviewId})
            );
          });
    });
    @Effect() onUserLikeComment$: Observable<Action> =
    this.actions$.ofType<feedCommentActions.LikeCommentAction>(feedCommentActions.FeedCommentsActionTypes.LIKE_COMMENT)    
    .switchMap((action) => {
        return this.commentService
        .LikeComment(action.payload.commentId)
        .map(data => {
            if(data.isActionSucceed){
                return new feedCommentActions.LikeCommentSuccessAction
                ({likeStatus: data.likeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId});
            }else{
                return new feedCommentActions.LikeCommentFailAction({likeStatus: data.likeStatus,commentId: action.payload.commentId, reviewId:action.payload.reviewId})
            }            
            })
            .catch((error) => {
                return Observable.of(
                new feedCommentActions.LikeCommentFailAction({likeStatus: action.payload.prevlikeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId})
                );
            });
        });
        @Effect() onUserUnlikeComment$: Observable<Action> =
        this.actions$.ofType<feedCommentActions.UnLikeCommentAction>(feedCommentActions.FeedCommentsActionTypes.UNLIKE_COMMENT)    
        .switchMap((action) => {
        return this.commentService
        .UnlikeComment(action.payload.commentId)
        .map(data => {
            if(data.isActionSucceed){
                return new feedCommentActions.UnLikeCommentSuccessAction({likeStatus: data.likeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId});
            }else{
                return new feedCommentActions.UnLikeCommentFailAction({likeStatus: data.likeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId})
            }            
            })
            .catch((error) => {
            return Observable.of(
                new feedCommentActions.UnLikeCommentFailAction({likeStatus: action.payload.prevlikeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId})
            );
            });
        });
        @Effect() onShowBarPublishComments$: Observable<Action> =
        this.actions$.ofType<feedCommentActions.PublishComment>(feedCommentActions.FeedCommentsActionTypes.PUBLISH_COMMENT)
        .switchMap((action) => {
            return Observable.of( 
                new fromCore.ShowProgressBar()
            );
        });
        @Effect() onHideBarPublishComments$: Observable<Action> =
        this.actions$.ofType<feedCommentActions.PublishCommentSuccess>(feedCommentActions.FeedCommentsActionTypes.PUBLISH_COMMENT_SUCCESS)
        .switchMap((action) => {
            return Observable.from([ 
                new fromCore.HideProgressBar(),
                new feedCommentActions.CloseCommentFormSection(action.payload.comment.reviewId)
            ]);
        });
        @Effect() onUserDislikeComment$: Observable<Action> =
        this.actions$.ofType<feedCommentActions.DislikeCommentAction>(feedCommentActions.FeedCommentsActionTypes.DISLIKE_COMMENT)    
        .switchMap((action) => {
        return this.commentService
        .DislikeComment(action.payload.commentId)
        .map(data => {
            if(data.isActionSucceed){
                return new feedCommentActions.DislikeCommentSuccessAction
                    ({likeStatus: data.likeStatus,commentId:action.payload.commentId, reviewId: action.payload.reviewId});
            }else{
                return new feedCommentActions.DislikeCommentFailAction({likeStatus: data.likeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId})
            }            
            })
            .catch((error) => {
            return Observable.of(
                new feedCommentActions.DislikeCommentFailAction({likeStatus: action.payload.prevlikeStatus,commentId: action.payload.commentId, reviewId:action.payload.reviewId})
            );
            });
        });
        @Effect() onUserUndislikeComment$: Observable<Action> =
        this.actions$.ofType<feedCommentActions.UnDislikeCommentAction>(feedCommentActions.FeedCommentsActionTypes.UNDISLIKE_COMMENT)    
        .switchMap((action) => {
        return this.commentService
        .UndislikeComment(action.payload.commentId)
        .map(data => {
            if(data.isActionSucceed){
                return new feedCommentActions.UnDislikeCommentSuccessAction
                    ({likeStatus: data.likeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId});
            }else{
                return new feedCommentActions.UnDislikeCommentFailAction({likeStatus: data.likeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId})
            }            
            })
            .catch((error) => {
            return Observable.of(
                new feedCommentActions.UnDislikeCommentFailAction({likeStatus: action.payload.prevlikeStatus, commentId: action.payload.commentId, reviewId:action.payload.reviewId})
            );
            });
        });
        
    @Effect() onOpenReviewComments$: Observable<Action> =
    this.actions$.ofType<feedCommentActions.OpenCommentSection>(feedCommentActions.FeedCommentsActionTypes.OPEN_COMMENT_SECTION)    
    .switchMap((action) => {
        return this.commentFetchService
        .GetReviewComments(action.payload)
        .map(data => {
                return new feedCommentActions.LoadFeedCommentsSuccess
                ({entities: data.entities, id: action.payload});
          })
          .catch((error) => {
            return Observable.of(
              new feedCommentActions.LoadFeedCommentsFail({id: action.payload})
            );
          });
    });
        constructor(
            private actions$: Actions,
            private commentService:CommentService,
            private commentFetchService:FeedCommentsService
        ) {}
        }
