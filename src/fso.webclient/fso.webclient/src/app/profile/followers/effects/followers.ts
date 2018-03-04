import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as followersActions from '../actions/followers';
import { State } from '../reducers';
import { UserFollowerService } from '../services/follower.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserInfoService } from '../../services/userinfo.service';

@Injectable()
export class FollowersEffects {
    @Effect() onGetUserFollowersRequest$: Observable<Action> =
    this.actions$.ofType<followersActions.GetFollowerAction>(followersActions.FollowerActionTypes.GET_FOLLOWERS)
    .withLatestFrom(this.store.select(p => p['userfollowers'].followers))
    .switchMap(([action, store]) => {
        return this.userFollowService
        .GetUserFollowers(action.payload.userName, store.pageIndex, store.pageSize)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            return new followersActions.GetFollowerSuccessAction(data.value);
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new followersActions.GetFollowerFailAction({showError: true})
            );
          });
    });
    @Effect() onGetUserFollowingsOpenModal$: Observable<Action> =
    this.actions$.ofType<followersActions.GetFollowerAction>(followersActions.FollowerActionTypes.GET_FOLLOWERS)
        .mergeMap((action) => {
            return Observable.of(new followersActions.OpenModalAction());
        });
        
    @Effect() onModalClose$: Observable<Action> =
    this.actions$.ofType<followersActions.CloseModalAction>(followersActions.FollowerActionTypes.CLOSE_MODAL)
        .withLatestFrom(this.store.select(p => p['router']))
        .mergeMap(([action, routerStore]) => {
            if (routerStore['navigationId'] != 1) {
                this.location.back();
            } else {
                this.router.navigate(['/user/'+action.payload.userName])
            }
            return Observable.of({type:'NO_ACTION'});
        });

        @Effect() onFollowUser$: Observable<Action> =
        this.actions$.ofType<followersActions.FollowUserAction>(followersActions.FollowerActionTypes.FOLLOW_USER)
        
        .switchMap((action) => {
            return this.userInfoService.FollowUser(action.payload.username)
            .map(data => {
                // You don't need an array because it's only 1 item
                // If you want array use `Observable.from([ /* actions here */ ])`
                //    but then you'll need to change `map` above to
                //     `mergeMap` or `switchMap`
                //   (no big difference for this use case,
                //     `switchMap` is more conventional in Ngrx effects)
                return new followersActions.FollowUserSuccessAction({username: action.payload.username,...data.value});
              })
              .catch((error) => {
                // You probably haven't called this yet,
                //   but `catch` must return `Obsrvable`
                // Again, if you want an array use `Observable.from([ /* array */ ])`
                return Observable.of(
                  new followersActions.FollowUserFailAction({previousFollowState: action.payload.previousFollowState})
                );
              });
        });
    
        @Effect() onUnFollowUser$: Observable<Action> =
        this.actions$.ofType<followersActions.UnfollowUserAction>(followersActions.FollowerActionTypes.UNFOLLOW_USER)
        .switchMap((action) => {
            return this.userInfoService.UnfollowUser(action.payload.username)
            .map(data => {
                // You don't need an array because it's only 1 item
                // If you want array use `Observable.from([ /* actions here */ ])`
                //    but then you'll need to change `map` above to
                //     `mergeMap` or `switchMap`
                //   (no big difference for this use case,
                //     `switchMap` is more conventional in Ngrx effects)
                return new followersActions.UnfollowUserSuccessAction({username: action.payload.username,...data.value});
              })
              .catch((error) => {
                // You probably haven't called this yet,
                //   but `catch` must return `Obsrvable`
                // Again, if you want an array use `Observable.from([ /* array */ ])`
                return Observable.of(
                  new followersActions.UnfollowUserFailAction({previousFollowState: action.payload.previousFollowState})
                );
              });
        });
    
    @Effect() onLoadMoreFollowersRequest$: Observable<Action> =
    this.actions$.ofType<followersActions.LoadMoreFollowerAction>(followersActions.FollowerActionTypes.LOAD_MORE_FOLLOWER)
    .withLatestFrom(this.store.select(p => p))
    .switchMap(([action, store]) => {
        return this.userFollowService
        .GetUserFollowers(store['profile'].userInfo.userInfo.username, store['userfollowers'].followers.pageIndex, store['userfollowers'].followers.pageSize)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            return new followersActions.LoadMoreFollowerSuccessAction(data.value);
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new followersActions.LoadMoreFollowerFailAction({showError: true})
            );
          });
    });
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private router: Router,
        private location: Location,
        private userFollowService: UserFollowerService,
        private userInfoService: UserInfoService
    ) {}
}
