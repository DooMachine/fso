import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as userActivityActions from '../actions/userActivity';
import { State } from '../reducers';
import { UserActivityService } from '../services/userActivity.service';
import { PostLikeService } from '../../shared/services/postlike.service';
import { ReviewLikeService } from '../../shared/services/reviewlike.service';

@Injectable()
export class ReviewLikeEffects {
     @Effect() onUserLikeReview$: Observable<Action> =
     this.actions$.ofType<userActivityActions.LikeReviewAction>(userActivityActions.UserActivityActionTypes.LIKE_REVIEW)    
     .switchMap((action) => {
         return this.reviewLikeService
         .LikeReview(action.payload.id)
         .map(data => {
             // You don't need an array because it's only 1 item
             // If you want array use `Observable.from([ /* actions here */ ])`
             //    but then you'll need to change `map` above to
             //     `mergeMap` or `switchMap`
             //   (no big difference for this use case,
             //     `switchMap` is more conventional in Ngrx effects)
             if(data.value.isActionSucceed){
                 return new userActivityActions.LikeReviewSuccessAction
                 ({likeStatus: data.value.likeStatus, activityId: action.payload.activityId});
             }else{
                 return new userActivityActions.LikeReviewFailAction({likeStatus: data.value.likeStatus, activityId: action.payload.activityId})
             }            
           })
           .catch((error) => {
             // You probably haven't called this yet,
             //   but `catch` must return `Obsrvable`
             // Again, if you want an array use `Observable.from([ /* array */ ])`
             return Observable.of(
               new userActivityActions.LikeReviewFailAction({likeStatus: 2, activityId: action.payload.activityId})
             );
           });
     });
    @Effect() onUserUnlikeReview$: Observable<Action> =
    this.actions$.ofType<userActivityActions.UnLikeReviewAction>(userActivityActions.UserActivityActionTypes.UNLIKE_REVIEW)    
    .switchMap((action) => {
        return this.reviewLikeService
        .UnlikeReview(action.payload.id)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            if(data.value.isActionSucceed){
                return new userActivityActions.UnLikeReviewSuccessAction({likeStatus: data.value.likeStatus, activityId: action.payload.activityId});
            }else{
                return new userActivityActions.UnLikeReviewFailAction({likeStatus: data.value.likeStatus, activityId: action.payload.activityId})
            }            
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new userActivityActions.UnLikeReviewFailAction({likeStatus: 0, activityId: action.payload.activityId})
            );
          });
    });
    
    @Effect() onUserDislikeReview$: Observable<Action> =
    this.actions$.ofType<userActivityActions.DislikeReviewAction>(userActivityActions.UserActivityActionTypes.DISLIKE_REVIEW)    
    .switchMap((action) => {
        return this.reviewLikeService
        .DislikeReview(action.payload.id)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            if(data.value.isActionSucceed){
                return new userActivityActions.DislikeReviewSuccessAction
                    ({likeStatus: data.value.likeStatus, activityId: action.payload.activityId});
            }else{
                return new userActivityActions.DislikeReviewFailAction({likeStatus: data.value.likeStatus, activityId: action.payload.activityId})
            }            
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
                new userActivityActions.DislikeReviewFailAction({likeStatus: 2, activityId: action.payload.activityId})
            );
          });
    });
    @Effect() onUserUndislikeReview$: Observable<Action> =
    this.actions$.ofType<userActivityActions.UnDislikeReviewAction>(userActivityActions.UserActivityActionTypes.UNDISLIKE_REVIEW)    
    .switchMap((action) => {
        return this.reviewLikeService
        .UndislikeReview(action.payload.id)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            if(data.value.isActionSucceed){
                return new userActivityActions.UnDislikeReviewSuccessAction
                    ({likeStatus: data.value.likeStatus, activityId: action.payload.activityId});
            }else{
                return new userActivityActions.UnDislikeReviewFailAction({likeStatus: data.value.likeStatus, activityId: action.payload.activityId})
            }            
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
                new userActivityActions.UnDislikeReviewFailAction({likeStatus: 2, activityId: action.payload.activityId})
            );
          });
    });
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private reviewLikeService: ReviewLikeService
    ) {}
}
