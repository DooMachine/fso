import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as followingActions from '../actions/following';
import { State } from '../reducers';
import { UserFollowingService } from '../services/user.following.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserInfoService } from '../../services/userinfo.service';

@Injectable()
export class FollowingEffects {

    @Effect() onGetUserFollowingsRequest$: Observable<Action> =
    this.actions$.ofType<followingActions.GetFollowingAction>(followingActions.FollowingActionTypes.GET_FOLLOWINGS)
    .withLatestFrom(this.store.select(p => p['userfollowings'].followings))
    .switchMap(([action, store]) => {
        return this.userFollowService
        .GetUserFollowings(action.payload.userName, store.pageIndex, store.pageSize)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            
            return new followingActions.GetFollowingSuccessAction(data.value);
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new followingActions.GetFollowingFailAction({showError: true})
            );
          });
    });
    @Effect() onGetUserFollowingsOpenModal$: Observable<Action> =
    this.actions$.ofType<followingActions.GetFollowingAction>(followingActions.FollowingActionTypes.GET_FOLLOWINGS)
        .mergeMap((action) => {
            return Observable.of(new followingActions.OpenModalAction());
        });
        
    @Effect() onModalClose$: Observable<Action> =
    this.actions$.ofType<followingActions.CloseModalAction>(followingActions.FollowingActionTypes.CLOSE_MODAL)
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
        this.actions$.ofType<followingActions.FollowUserAction>(followingActions.FollowingActionTypes.FOLLOW_USER)
        
        .switchMap((action) => {
            return this.userInfoService.FollowUser(action.payload.username)
            .map(data => {
                // You don't need an array because it's only 1 item
                // If you want array use `Observable.from([ /* actions here */ ])`
                //    but then you'll need to change `map` above to
                //     `mergeMap` or `switchMap`
                //   (no big difference for this use case,
                //     `switchMap` is more conventional in Ngrx effects)
                console.log(data.value);
                return new followingActions.FollowUserSuccessAction({username: action.payload.username,...data.value});
              })
              .catch((error) => {
                // You probably haven't called this yet,
                //   but `catch` must return `Obsrvable`
                // Again, if you want an array use `Observable.from([ /* array */ ])`
                return Observable.of(
                  new followingActions.FollowUserFailAction({previousFollowState: action.payload.previousFollowState})
                );
              });
        });
    
        @Effect() onUnFollowUser$: Observable<Action> =
        this.actions$.ofType<followingActions.UnfollowUserAction>(followingActions.FollowingActionTypes.UNFOLLOW_USER)
        .switchMap((action) => {
            return this.userInfoService.UnfollowUser(action.payload.username)
            .map(data => {
                // You don't need an array because it's only 1 item
                // If you want array use `Observable.from([ /* actions here */ ])`
                //    but then you'll need to change `map` above to
                //     `mergeMap` or `switchMap`
                //   (no big difference for this use case,
                //     `switchMap` is more conventional in Ngrx effects)
                console.log(data.value);
                return new followingActions.UnfollowUserSuccessAction({username: action.payload.username,...data.value});
              })
              .catch((error) => {
                // You probably haven't called this yet,
                //   but `catch` must return `Obsrvable`
                // Again, if you want an array use `Observable.from([ /* array */ ])`
                return Observable.of(
                  new followingActions.UnfollowUserFailAction({previousFollowState: action.payload.previousFollowState})
                );
              });
        });
    @Effect() onLoadMOreFollowersRequest$: Observable<Action> =
    this.actions$.ofType<followingActions.LoadMoreFollowingAction>(followingActions.FollowingActionTypes.LOAD_MORE_FOLLOWING)
    .withLatestFrom(this.store.select(p => p))
    .switchMap(([action, store]) => {
            return this.userFollowService
            .GetUserFollowings(store['profile'].userInfo.userInfo.username, store['userfollowings'].followings.pageIndex, store['userfollowings'].followings.pageSize)
            .map(data => {
                // You don't need an array because it's only 1 item
                // If you want array use `Observable.from([ /* actions here */ ])`
                //    but then you'll need to change `map` above to
                //     `mergeMap` or `switchMap`
                //   (no big difference for this use case,
                //     `switchMap` is more conventional in Ngrx effects)
                return new followingActions.LoadMoreFollowingSuccessAction(data.value);
              })
              .catch((error) => {
                // You probably haven't called this yet,
                //   but `catch` must return `Obsrvable`
                // Again, if you want an array use `Observable.from([ /* array */ ])`
                return Observable.of(
                  new followingActions.LoadMoreFollowingFailAction({showError: true})
                );
              });
        });
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private router: Router,
        private location: Location,
        private userFollowService: UserFollowingService,
        private userInfoService: UserInfoService
    ) {}
}
