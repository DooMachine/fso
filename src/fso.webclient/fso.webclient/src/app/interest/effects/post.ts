
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as postActions from '../actions/posts';
import { GetPostSuccessAction } from '../actions/posts';
import * as fromCore from '../../core/actions';
import { State } from '../../reducers/index';
import { InterestService } from '../services/interest.service';
import { InterestActionService } from '../services/interestaction.service';
import { GroupFollowService } from '../../shared/services/groupfollow.service';
import { PostLikeService } from '../../shared/services/postlike.service';
import { UserFollowService } from '../../shared/services/userfollow.service';


@Injectable()
export class InterestPostEffects {
    constructor(
        private actions$: Actions,
        private postLikeService:PostLikeService,
        private userFollowService: UserFollowService,
        private interestService:InterestService,
        private store: Store<State>
    ) {}

    @Effect()
    onRequestInterestPost$: Observable<Action> =
    this.actions$.ofType<postActions.GetInterestPostAction>(postActions.InterestPostActionTypes.GET_POSTS)
    .withLatestFrom(this.store.select(store => store['interest'])) 
    .switchMap(([action, store]) => {
        return this.interestService
        .GetGroupPosts(action.payload.urlKey, store['posts'].pageIndex, 
            store['posts'].pageSize, store['posts'].order)
        .map(data => {
            return new postActions.GetPostSuccessAction(data);
          })
          .catch((error) => {
            return Observable.of(
              new postActions.GetPostFailAction({error: error})
            );
        });
    });

    @Effect() onUserLikePost$: Observable<Action> =
    this.actions$.ofType<postActions.LikeInterestPostAction>(postActions.InterestPostActionTypes.LIKE_POST)    
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
    this.actions$.ofType<postActions.UnLikeInterestPostAction>(postActions.InterestPostActionTypes.UNLIKE_POST)    
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

    @Effect() onFollowUser$: Observable<Action> =
    this.actions$.ofType<postActions.FollowUser>(postActions.InterestPostActionTypes.FOLLOW_USER)
    
    .switchMap((action) => {
        return this.userFollowService.FollowUser(action.payload.username)
        .map(data => {
            console.log(data.value);
            return new postActions.FollowUserSuccess({username: action.payload.username,postId:action.payload.postId,...data.value});
            })
            .catch((error) => {
            return Observable.of(
                new postActions.FollowUserFail({postId:action.payload.postId})
            );
            });
    });

    @Effect() onUnFollowUser$: Observable<Action> =
    this.actions$.ofType<postActions.UnfollowUser>(postActions.InterestPostActionTypes.UNFOLLOW_USER)
    .switchMap((action) => {
        return this.userFollowService.UnfollowUser(action.payload.username)
        .map(data => {
            console.log(data.value);
            return new postActions.UnfollowUserSuccess({username: action.payload.username,postId:action.payload.postId,...data.value});
            })
            .catch((error) => {
            return Observable.of(
                new postActions.UnfollowUserFail({postId:action.payload.postId})
            );
            });
    });
}