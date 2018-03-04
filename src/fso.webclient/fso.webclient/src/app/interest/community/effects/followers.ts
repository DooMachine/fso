
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as interestFollowersActions from '../actions/followers';
import {ShowProgressBar,HideProgressBar} from '../../../core/actions';
import { State } from '../../reducers/index';
import { InterestService } from '../../services/interest.service';
import { PostLikeService } from '../../../shared/services/postlike.service';
import { UserFollowService } from '../../../shared/services/userfollow.service';


@Injectable()
export class CommunityEffects {
    constructor(
        private actions$: Actions,
        private userFollowService: UserFollowService,
        private interestService:InterestService,
        private store: Store<State>
    ) {}

    @Effect() onGetUserPostsRequest$: Observable<Action> =
    this.actions$.ofType<interestFollowersActions.GetInterestFollowers>(interestFollowersActions.InterestFollowersActionTypes.GET_INTEREST_FOLLOWERS)
    .withLatestFrom(this.store.select(store => store['community'].followers))
    .switchMap(([action, store]) => {
        return this.interestService
        .GetFollowers(action.payload, store.pageIndex, 
            store.pageSize, store.order)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            return new interestFollowersActions.GetInterestFollowersSuccess(data);
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new interestFollowersActions.GetInterestFollowersFail({error: error})
            );
          });
    });


    @Effect() onFollowUser$: Observable<Action> =
    this.actions$.ofType<interestFollowersActions.FollowUser>(interestFollowersActions.InterestFollowersActionTypes.FOLLOW_USER)
    
    .switchMap((action) => {
        return this.userFollowService.FollowUser(action.payload.username)
        .map(data => {
            console.log(data.value);
            return new interestFollowersActions.FollowUserSuccess({username: action.payload.username,postId:action.payload.postId,...data.value});
            })
            .catch((error) => {
            return Observable.of(
                new interestFollowersActions.FollowUserFail({postId:action.payload.postId})
            );
            });
    });

    @Effect() onUnFollowUser$: Observable<Action> =
    this.actions$.ofType<interestFollowersActions.UnfollowUser>(interestFollowersActions.InterestFollowersActionTypes.UNFOLLOW_USER)
    .switchMap((action) => {
        return this.userFollowService.UnfollowUser(action.payload.username)
        .map(data => {
            console.log(data.value);
            return new interestFollowersActions.UnfollowUserSuccess({username: action.payload.username,postId:action.payload.postId,...data.value});
            })
            .catch((error) => {
            return Observable.of(
                new interestFollowersActions.UnfollowUserFail({postId:action.payload.postId})
            );
            });
    });
}