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
export class UserLikeEffects {
    @Effect() onUserLikePost$: Observable<Action> =
    this.actions$.ofType<userActivityActions.LikePostAction>(userActivityActions.UserActivityActionTypes.LIKE_POST)    
    .switchMap((action) => {
        console.log(action);
        return this.postLikeService
        .LikePost(action.payload.id)
        .map(data => {
            
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            if(data.value.isActionSucceed){
                return new userActivityActions.LikePostSuccessAction({isLiked: data.value.isLiked, activityId:action.payload.activityId });
            }else{
                new userActivityActions.LikePostFailAction({isLiked: data.value.isLiked, activityId:action.payload.activityId })
            }            
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new userActivityActions.LikePostFailAction({isLiked: false, activityId:action.payload.activityId })
            );
          });
    });
    @Effect() onUserUnlikePost$: Observable<Action> =
    this.actions$.ofType<userActivityActions.UnLikePostAction>(userActivityActions.UserActivityActionTypes.UNLIKE_POST)    
    .switchMap((action) => {
        return this.postLikeService
        .UnlikePost(action.payload.id)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            if(data.value.isActionSucceed){
                return new userActivityActions.UnLikePostSuccessAction({isLiked: false, activityId:action.payload.activityId });
            }else{
                new userActivityActions.UnLikePostFailAction({isLiked: true, activityId:action.payload.activityId })
            }            
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new userActivityActions.UnLikePostFailAction({isLiked: true, activityId:action.payload.activityId })
            );
          });
    });

     
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private postLikeService: PostLikeService
    ) {}
}
