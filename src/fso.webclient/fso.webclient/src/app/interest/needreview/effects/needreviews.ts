
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as needReviewActions from '../actions/needreview';
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
    this.actions$.ofType<needReviewActions.GetNeedReviews>(needReviewActions.NeedReviewActionTypes.GET_NEED_REVIEWS)
    .withLatestFrom(this.store.select(store => store['needreview'].needreview))
    .switchMap(([action, store]) => {
        return this.interestService
        .GetGroupNeedReviews(action.payload, store.pageIndex, 
            store.pageSize, store.order)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            return new needReviewActions.GetNeedReviewsSuccess(data);
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new needReviewActions.GetNeedReviewsFail({error: error})
            );
          });
    });

    @Effect() onUserLikePost$: Observable<Action> =
    this.actions$.ofType<needReviewActions.LikeInterestPostAction>(needReviewActions.NeedReviewActionTypes.LIKE_POST)    
    .switchMap((action) => {
        return this.postLikeService
        .LikePost(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new needReviewActions.LikePostSuccessAction({isLiked: data.value.isLiked, id:action.payload.id });
            }else{
                new needReviewActions.LikePostFailAction({isLiked: data.value.isLiked, id:action.payload.id })
            }            
          })
          .catch((error) => {
            return Observable.of(
              new needReviewActions.LikePostFailAction({isLiked: false, id:action.payload.id })
            );
          });
    });
    @Effect() onUserUnlikePost$: Observable<Action> =
    this.actions$.ofType<needReviewActions.UnLikeInterestPostAction>(needReviewActions.NeedReviewActionTypes.UNLIKE_POST)    
    .switchMap((action) => {
        return this.postLikeService
        .UnlikePost(action.payload.id)
        .map(data => {
            if(data.value.isActionSucceed){
                return new needReviewActions.UnLikePostSuccessAction({isLiked: false, id:action.payload.id });
            }else{
                new needReviewActions.UnLikePostFailAction({isLiked: true })
            }            
          })
          .catch((error) => {
            return Observable.of(
              new needReviewActions.UnLikePostFailAction({isLiked: true, id:action.payload.id })
            );
          });
    });

    @Effect() onFollowUser$: Observable<Action> =
    this.actions$.ofType<needReviewActions.FollowUser>(needReviewActions.NeedReviewActionTypes.FOLLOW_USER)
    
    .switchMap((action) => {
        return this.userFollowService.FollowUser(action.payload.username)
        .map(data => {
            console.log(data.value);
            return new needReviewActions.FollowUserSuccess({username: action.payload.username,postId:action.payload.postId,...data.value});
            })
            .catch((error) => {
            return Observable.of(
                new needReviewActions.FollowUserFail({postId:action.payload.postId})
            );
            });
    });

    @Effect() onUnFollowUser$: Observable<Action> =
    this.actions$.ofType<needReviewActions.UnfollowUser>(needReviewActions.NeedReviewActionTypes.UNFOLLOW_USER)
    .switchMap((action) => {
        return this.userFollowService.UnfollowUser(action.payload.username)
        .map(data => {
            console.log(data.value);
            return new needReviewActions.UnfollowUserSuccess({username: action.payload.username,postId:action.payload.postId,...data.value});
            })
            .catch((error) => {
            return Observable.of(
                new needReviewActions.UnfollowUserFail({postId:action.payload.postId})
            );
            });
    });
}