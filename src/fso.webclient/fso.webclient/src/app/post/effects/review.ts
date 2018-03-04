import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as postReviewActions from '../actions/reviews';
import * as postCommentActions from '../actions/comments';
import * as authActions from '../../auth/actions/auth.actions';
import * as fromCore from '../../core/actions';
import { State } from '../../reducers';
import { PostLikeService } from '../../shared/services/postlike.service';
import { ReviewLikeService } from '../../shared/services/reviewlike.service';
import { PostService } from '../services/post.service';
import { CommentService } from '../../shared/services/comment.service';

@Injectable()
export class PostReviewLikeEffects {
    @Effect() onLoadPaginated$: Observable<Action> =
     this.actions$.ofType<postReviewActions.LoadReviews>(postReviewActions.PostIndexReviewsActionTypes.LOAD_REVIEWS)
     .withLatestFrom(this.store.select(state=> state['post'].reviews))
     .switchMap(([action,reviewState]) => {
         return this._postService
         .GetPaginatedReviews(action.payload.id,reviewState.pageIndex,reviewState.pageSize, reviewState.order)
         .map(data => {
                 return new postReviewActions.LoadReviewsSuccess(data);
                 
           })
           .catch((error) => {
             return Observable.of(
               new postReviewActions.LoadReviewsFail({error: error})
             );
           });
     });
     @Effect() onLoadInitialPaginatedReviews$: Observable<Action> =
     this.actions$.ofType<postReviewActions.LoadInitialReviews>(postReviewActions.PostIndexReviewsActionTypes.LOAD_INITIAL_REVIEWS)
     .withLatestFrom(this.store.select(state=> state['post'].reviews))
     .switchMap(([action,reviewState]) => {
         return this._postService
         .GetPaginatedReviews(action.payload.id,reviewState.pageIndex,reviewState.pageSize, reviewState.order)
         .map(data => {
                 return new postReviewActions.LoadInitialReviewsSuccess(data);
                 
           })
           .catch((error) => {
             return Observable.of(
               new postReviewActions.LoadInitialReviewsFail({error: error})
             );
           });
     });
     @Effect() onUserLikeReview$: Observable<Action> =
     this.actions$.ofType<postReviewActions.LikeReviewAction>(postReviewActions.PostIndexReviewsActionTypes.LIKE_REVIEW)    
     .switchMap((action) => {
         return this.reviewLikeService
         .LikeReview(action.payload.id)
         .map(data => {
             let obs;
             if(data.value.isActionSucceed){
                 obs = new postReviewActions.LikeReviewSuccessAction
                 ({likeStatus: data.value.likeStatus, id: action.payload.id});
             }else{
                 obs = new postReviewActions.LikeReviewFailAction({likeStatus: data.value.likeStatus, id: action.payload.id})
             }     
             return obs;       
           })
           .catch((error) => {
             return Observable.of(
               new postReviewActions.LikeReviewFailAction({likeStatus: 2, id: action.payload.id})
             );
           });
     });

    @Effect() onUserUnlikeReview$: Observable<Action> =
    this.actions$.ofType<postReviewActions.UnLikeReviewAction>(postReviewActions.PostIndexReviewsActionTypes.UNLIKE_REVIEW)    
    .switchMap((action) => {
        return this.reviewLikeService
        .UnlikeReview(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new postReviewActions.UnLikeReviewSuccessAction({likeStatus: data.value.likeStatus, id: action.payload.id});
            }else{
                return new postReviewActions.UnLikeReviewFailAction({likeStatus: data.value.likeStatus, id: action.payload.id})
            }            
          })
          .catch((error) => {
            return Observable.of(
              new postReviewActions.UnLikeReviewFailAction({likeStatus: 0, id: action.payload.id})
            );
          });
    });
    
    @Effect() onUserDislikeReview$: Observable<Action> =
    this.actions$.ofType<postReviewActions.DislikeReviewAction>(postReviewActions.PostIndexReviewsActionTypes.DISLIKE_REVIEW)    
    .switchMap((action) => {
        return this.reviewLikeService
        .DislikeReview(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new postReviewActions.DislikeReviewSuccessAction
                    ({likeStatus: data.value.likeStatus, id: action.payload.id});
            }else{
                return new postReviewActions.DislikeReviewFailAction({likeStatus: data.value.likeStatus, id: action.payload.id})
            }            
          })
          .catch((error) => {
            return Observable.of(
                new postReviewActions.DislikeReviewFailAction({likeStatus: 2,id: action.payload.id})
            );
          });
    });
    @Effect() onUserUndislikeReview$: Observable<Action> =
    this.actions$.ofType<postReviewActions.UnDislikeReviewAction>(postReviewActions.PostIndexReviewsActionTypes.UNDISLIKE_REVIEW)    
    .switchMap((action) => {
        return this.reviewLikeService
        .UndislikeReview(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new postReviewActions.UnDislikeReviewSuccessAction
                    ({likeStatus: data.value.likeStatus, id: action.payload.id});
            }else{
                return new postReviewActions.UnDislikeReviewFailAction({likeStatus: data.value.likeStatus, id: action.payload.id})
            }            
          })
          .catch((error) => {
            return Observable.of(
                new postReviewActions.UnDislikeReviewFailAction({likeStatus: 2, id: action.payload.id})
            );
          });
    });
    @Effect() onLoadComments$: Observable<Action> =
     this.actions$.ofType<postReviewActions.LoadComments>(postReviewActions.PostIndexReviewsActionTypes.LOAD_COMMENTS)
     .switchMap((action) => {
         return this._postService
         .GetReviewComments(action.payload.id,)
         .map(data => {
                 return new postCommentActions.LoadCommentsSuccess
                 ({entities: data.entities, id: action.payload.id});
           })
           .catch((error) => {
             return Observable.of(
               new postReviewActions.LoadCommentsFail({id: action.payload.id})
             );
           });
     });
     @Effect() onPublishComment$: Observable<Action> =
     this.actions$.ofType<postReviewActions.PublishComment>(postReviewActions.PostIndexReviewsActionTypes.PUBLISH_COMMENT)    
     
     .switchMap((action) => {
         return this.commentService
         .PublishComment(action.payload)
         .map(data => {             
                return new postCommentActions.PublishCommentSuccess(data);
           })
           .catch((error) => {
             return Observable.of(
               new postReviewActions.PublishCommentFail({id: action.payload.reviewId})
             );
           });
     });
    @Effect() onShowBarPublishComments$: Observable<Action> =
    this.actions$.ofType<postReviewActions.PublishComment>(postReviewActions.PostIndexReviewsActionTypes.PUBLISH_COMMENT)
    .switchMap((action) => {
        return Observable.of(new fromCore.ShowProgressBar())
    });
    
    @Effect() onShowComments$: Observable<Action> =
    this.actions$.ofType<postReviewActions.ShowComments>(postReviewActions.PostIndexReviewsActionTypes.SHOW_COMMENTS)
    .switchMap((action) => {
        return Observable.of(new postReviewActions.LoadComments({id:action.payload.reviewId}))
    });

    @Effect() onShowCommentsForm$: Observable<Action> =
    this.actions$.ofType<postReviewActions.ShowCommentForm>(postReviewActions.PostIndexReviewsActionTypes.SHOW_COMMENT_FORM)
    .switchMap((action) => {
        return Observable.of(new postReviewActions.ShowComments({reviewId:action.payload}))
    });

    @Effect() onShowCommentForm$: Observable<Action> =
    this.actions$.ofType<postReviewActions.ShowCommentForm>(postReviewActions.PostIndexReviewsActionTypes.SHOW_COMMENT_FORM)
    .withLatestFrom(this.store.select(state=> state.auth.isAuthenticated))
    .switchMap(([action,isAuthenticated]) => {
        let obs;
        if(!isAuthenticated){            
           obs = Observable.of(new authActions.AttemptLogin());
        }else{
            obs = Observable.of({type:'NO_ACTION'});
        }
        return obs;
    });
    
            constructor(
                private actions$: Actions,
                private _postService: PostService,
                private commentService:CommentService,
                private store: Store<State>,
                private reviewLikeService: ReviewLikeService
            ) {}
        }
