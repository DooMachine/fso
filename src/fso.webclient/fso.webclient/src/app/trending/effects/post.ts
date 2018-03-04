
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as postActions from '../actions/post';
import {ShowProgressBar,HideProgressBar} from '../../core/actions';
import { State } from '../../reducers/index';
import { InterestService } from "../../interest/services/interest.service";
import { UserFollowService } from "../../shared/services/userfollow.service";
import { PostLikeService } from "../../shared/services/postlike.service";
import { TrendingPostService } from "../services/post.service";


@Injectable()
export class TrendingPostEffects {
    constructor(
        private actions$: Actions,
        private postLikeService:PostLikeService,
        private userFollowService: UserFollowService,
        private trendingPostService:TrendingPostService,
        private store: Store<State>
    ) {}

    @Effect() onGetUserPostsRequest$: Observable<Action> =
    this.actions$.ofType<postActions.GetTrendingPosts>(postActions.TrendingPostActionTypes.GET_TRENDING_POSTS)
    .withLatestFrom(this.store.select(store => store['trending'].posts))
    .switchMap(([action, store]) => {
        return this.trendingPostService
        .GetTredingPosts(action.payload, store.pageIndex, 
            store.pageSize, store.order)
        .map(data => {
            return new postActions.GetTrendingPostsSuccess(data);
          })
          .catch((error) => {
            return Observable.of(
              new postActions.GetTrendingPostsFail({error: error})
            );
          });
    });

    @Effect() onUserLikePost$: Observable<Action> =
    this.actions$.ofType<postActions.LikeInterestPostAction>(postActions.TrendingPostActionTypes.LIKE_POST)    
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
    this.actions$.ofType<postActions.UnLikeInterestPostAction>(postActions.TrendingPostActionTypes.UNLIKE_POST)    
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
    this.actions$.ofType<postActions.FollowUser>(postActions.TrendingPostActionTypes.FOLLOW_USER)
    
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
    this.actions$.ofType<postActions.UnfollowUser>(postActions.TrendingPostActionTypes.UNFOLLOW_USER)
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