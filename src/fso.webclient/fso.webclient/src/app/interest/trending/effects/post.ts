
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as trendingPostActions from '../actions/post';
import {ShowProgressBar,HideProgressBar} from '../../../core/actions';
import { State } from '../../reducers/index';
import { InterestService } from '../../services/interest.service';
import { PostLikeService } from '../../../shared/services/postlike.service';
import { UserFollowService } from '../../../shared/services/userfollow.service';


@Injectable()
export class NeedReviewEffects {
    constructor(
        private actions$: Actions,
        private postLikeService:PostLikeService,
        private userFollowService: UserFollowService,
        private interestService:InterestService,
        private store: Store<State>
    ) {}

    @Effect() onGetUserPostsRequest$: Observable<Action> =
    this.actions$.ofType<trendingPostActions.GetInterestTrendings>(trendingPostActions.InterestTrendingActionTypes.GET_TRENDING_POSTS)
    .withLatestFrom(this.store.select(store => store['interesttrending'].posts))
    .switchMap(([action, store]) => {
        return this.interestService
        .GetTrendingPosts(action.payload, store.pageIndex, 
            store.pageSize, store.order)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            return new trendingPostActions.GetInterestTrendingsSuccess(data);
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new trendingPostActions.GetInterestTrendingsFail({error: error})
            );
          });
    });

    @Effect() onUserLikePost$: Observable<Action> =
    this.actions$.ofType<trendingPostActions.LikeInterestPostAction>(trendingPostActions.InterestTrendingActionTypes.LIKE_POST)    
    .switchMap((action) => {
        return this.postLikeService
        .LikePost(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new trendingPostActions.LikePostSuccessAction({isLiked: data.value.isLiked, id:action.payload.id });
            }else{
                new trendingPostActions.LikePostFailAction({isLiked: data.value.isLiked, id:action.payload.id })
            }            
          })
          .catch((error) => {
            return Observable.of(
              new trendingPostActions.LikePostFailAction({isLiked: false, id:action.payload.id })
            );
          });
    });
    @Effect() onUserUnlikePost$: Observable<Action> =
    this.actions$.ofType<trendingPostActions.UnLikeInterestPostAction>(trendingPostActions.InterestTrendingActionTypes.UNLIKE_POST)    
    .switchMap((action) => {
        return this.postLikeService
        .UnlikePost(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new trendingPostActions.UnLikePostSuccessAction({isLiked: false, id:action.payload.id });
            }else{
                new trendingPostActions.UnLikePostFailAction({isLiked: true })
            }            
          })
          .catch((error) => {
            return Observable.of(
              new trendingPostActions.UnLikePostFailAction({isLiked: true, id:action.payload.id })
            );
          });
    });

    @Effect() onFollowUser$: Observable<Action> =
    this.actions$.ofType<trendingPostActions.FollowUser>(trendingPostActions.InterestTrendingActionTypes.FOLLOW_USER)
    
    .switchMap((action) => {
        return this.userFollowService.FollowUser(action.payload.username)
        .map(data => {
            console.log(data.value);
            return new trendingPostActions.FollowUserSuccess({username: action.payload.username,postId:action.payload.postId,...data.value});
            })
            .catch((error) => {
            return Observable.of(
                new trendingPostActions.FollowUserFail({postId:action.payload.postId})
            );
            });
    });

    @Effect() onUnFollowUser$: Observable<Action> =
    this.actions$.ofType<trendingPostActions.UnfollowUser>(trendingPostActions.InterestTrendingActionTypes.UNFOLLOW_USER)
    .switchMap((action) => {
        return this.userFollowService.UnfollowUser(action.payload.username)
        .map(data => {
            console.log(data.value);
            return new trendingPostActions.UnfollowUserSuccess({username: action.payload.username,postId:action.payload.postId,...data.value});
            })
            .catch((error) => {
            return Observable.of(
                new trendingPostActions.UnfollowUserFail({postId:action.payload.postId})
            );
            });
    });
}