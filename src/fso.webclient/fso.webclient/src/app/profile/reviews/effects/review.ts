import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as reviewActions from '../actions/review';
import * as postActions from '../actions/post';
import { State } from '../reducers';
import { UserReviewService } from '../services/review.service';
import { ReviewLikeService } from '../../../shared/services/reviewlike.service';

@Injectable()
export class ReviewEffects {
    @Effect() onGetUserReviewsRequest$: Observable<Action> =
    this.actions$.ofType<reviewActions.LoadInitialReviews>(reviewActions.UserReviewsActionTypes.LOAD_INITIAL_REVIEWS)
    .withLatestFrom(this.store.select(p => p['userreviews'].reviews))
    .mergeMap(([action, store]) => {
        return this.userReviewService
        .GetUserReviews(action.payload.userName, store.pageIndex, store.pageSize, store.order)
        .switchMap(data => {
            return Observable.from([
                new reviewActions.LoadInitialReviewsSuccess(data),
                new postActions.GetPostSuccessAction(data.posts)
            ]);
          })
          .catch((error) => {
            return Observable.of(
              new reviewActions.LoadInitialReviewsFail({showError: true})
            );
          });
    });
    @Effect() onGetInfinite$: Observable<Action> =
    this.actions$.ofType<reviewActions.LoadReviews>(reviewActions.UserReviewsActionTypes.LOAD_REVIEWS)
    .withLatestFrom(this.store.select(p => p['userreviews'].reviews))
    .mergeMap(([action, store]) => {
        return this.userReviewService
        .GetUserReviews(action.payload.userName, store.pageIndex, store.pageSize, store.order)
        .switchMap(data => {
            return Observable.from([
                new reviewActions.LoadReviewsSuccess(data),
                new postActions.GetPostSuccessAction(data.posts)
            ]);
          })
          .catch((error) => {
            return Observable.of(
              new reviewActions.LoadReviewsFail({showError: true})
            );
          });
    });
    @Effect() onUserLikeReview$: Observable<Action> =
    this.actions$.ofType<reviewActions.LikeReviewAction>(reviewActions.UserReviewsActionTypes.LIKE_REVIEW)    
    .switchMap((action) => {
        return this.reviewLikeService
        .LikeReview(action.payload.id)
        .map(data => {
            let obs;
            if(data.value.isActionSucceed){
                obs = new reviewActions.LikeReviewSuccessAction
                ({likeStatus: data.value.likeStatus, id: action.payload.id});
            }else{
                obs = new reviewActions.LikeReviewFailAction({likeStatus: data.value.likeStatus, id: action.payload.id})
            }     
            return obs;       
          })
          .catch((error) => {
            return Observable.of(
              new reviewActions.LikeReviewFailAction({likeStatus: 2, id: action.payload.id})
            );
          });
    });

   @Effect() onUserUnlikeReview$: Observable<Action> =
   this.actions$.ofType<reviewActions.UnLikeReviewAction>(reviewActions.UserReviewsActionTypes.UNLIKE_REVIEW)    
   .switchMap((action) => {
       return this.reviewLikeService
       .UnlikeReview(action.payload.id)
       .map(data => {
           if(data.value.isActionSucceed){
               return new reviewActions.UnLikeReviewSuccessAction({likeStatus: data.value.likeStatus, id: action.payload.id});
           }else{
               return new reviewActions.UnLikeReviewFailAction({likeStatus: data.value.likeStatus, id: action.payload.id})
           }            
         })
         .catch((error) => {
           return Observable.of(
             new reviewActions.UnLikeReviewFailAction({likeStatus: 0, id: action.payload.id})
           );
         });
   });
   
   @Effect() onUserDislikeReview$: Observable<Action> =
   this.actions$.ofType<reviewActions.DislikeReviewAction>(reviewActions.UserReviewsActionTypes.DISLIKE_REVIEW)    
   .switchMap((action) => {
       return this.reviewLikeService
       .DislikeReview(action.payload.id)
       .map(data => {
           if(data.value.isActionSucceed){
               return new reviewActions.DislikeReviewSuccessAction
                   ({likeStatus: data.value.likeStatus, id: action.payload.id});
           }else{
               return new reviewActions.DislikeReviewFailAction({likeStatus: data.value.likeStatus, id: action.payload.id})
           }            
         })
         .catch((error) => {
           return Observable.of(
               new reviewActions.DislikeReviewFailAction({likeStatus: 2,id: action.payload.id})
           );
         });
   });
   @Effect() onUserUndislikeReview$: Observable<Action> =
   this.actions$.ofType<reviewActions.UnDislikeReviewAction>(reviewActions.UserReviewsActionTypes.UNDISLIKE_REVIEW)    
   .switchMap((action) => {
       return this.reviewLikeService
       .UndislikeReview(action.payload.id)
       .map(data => {
           if(data.value.isActionSucceed){
               return new reviewActions.UnDislikeReviewSuccessAction
                   ({likeStatus: data.value.likeStatus, id: action.payload.id});
           }else{
               return new reviewActions.UnDislikeReviewFailAction({likeStatus: data.value.likeStatus, id: action.payload.id})
           }            
         })
         .catch((error) => {
           return Observable.of(
               new reviewActions.UnDislikeReviewFailAction({likeStatus: 2, id: action.payload.id})
           );
         });
   });
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private reviewLikeService:ReviewLikeService,
        private userReviewService: UserReviewService
    ) {}
}
