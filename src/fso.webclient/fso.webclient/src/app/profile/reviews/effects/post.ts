import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as postActions from '../actions/post';
import { State } from '../reducers';
import { PostLikeService } from '../../../shared/services/postlike.service';

@Injectable()
export class PostEffects {

    @Effect() onUserLikePost$: Observable<Action> =
    this.actions$.ofType<postActions.LikePostAction>(postActions.PostActionTypes.LIKE_POST)    
    .switchMap((action) => {
        return this.postLikeService
        .LikePost(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new postActions.LikePostSuccessAction({isLiked: data.value.isLiked, id:action.payload.id });
            }else{
                new postActions.LikePostFailAction({isLiked: data.value.isLiked, id:action.payload.id })
            }            
          })
          .catch((error) => {
            return Observable.of(
              new postActions.LikePostFailAction({isLiked: false, id:action.payload.id })
            );
          });
    });
    @Effect() onUserUnlikePost$: Observable<Action> =
    this.actions$.ofType<postActions.UnLikePostAction>(postActions.PostActionTypes.UNLIKE_POST)    
    .switchMap((action) => {
        return this.postLikeService
        .UnlikePost(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new postActions.UnLikePostSuccessAction({isLiked: false, id:action.payload.id });
            }else{
                new postActions.UnLikePostFailAction({isLiked: true })
            }            
          })
          .catch((error) => {
            return Observable.of(
              new postActions.UnLikePostFailAction({isLiked: true, id:action.payload.id })
            );
          });
    });
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private postLikeService: PostLikeService
    ) {}
}
