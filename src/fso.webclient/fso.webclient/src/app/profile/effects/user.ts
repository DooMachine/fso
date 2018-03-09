import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/concatMap'
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as userInfoActions from '../actions/user';
import * as interestActions from '../actions/interest';
import * as userActivityActions from '../actions/userActivity';
import * as popActions from '../actions/popularposts';
import * as fromLayout from '../../core/actions/index';
import {  State } from '../reducers/user';
import { UserInfoService } from '../services/userinfo.service';
import { SEOService } from '../../shared/services/seo.service';

@Injectable()
export class UserInfoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private userInfoService: UserInfoService,
    private seoService: SEOService,
) {}

    @Effect() onGetUserInfo$=
    this.actions$.ofType<userInfoActions.GetUserAction>(userInfoActions.UserActionTypes.GET_USER)
    .withLatestFrom(this.store.select(p => p['profile']))
    .mergeMap(([action,state]) => {
        // If Username Is not changed dont fetch data
        if(state.userInfo.userInfo.username === action.payload.userName){               
          return Observable.of({type:"NO_ACTION"});
        }
        return this.userInfoService.GetUserInfo(action.payload.userName)
        .concatMap(data => {  
            this.seoService.updateUserPage(data.value);
            return Observable.from([
              {type:"CLEAR_PROFILE_STATE"},
              new userInfoActions.GetUserSuccessAction(data.value),
              new interestActions.GetInterestAction({userName: action.payload.userName}),
              ]);
          })
          .catch((error) => {
            return Observable.of(
              new userInfoActions.GetUserFailAction({showError: true}),
            );
          });
    });

    @Effect() onUpdateSeo$=
    this.actions$.ofType<userInfoActions.UpdateProfileSeo>(userInfoActions.UserActionTypes.UPDATE_PROFILE_SEO)
    .withLatestFrom(this.store.select(p => p['profile']))
    .mergeMap(([action,state]) => {
      this.seoService.updateUserPage(state.userInfo.userInfo);
      return Observable.from([{type:'PROFILE_META_UPDATED'}]);
    });

    @Effect() onGetUserInfoSuccess$: Observable<Action> =
    this.actions$.ofType<userInfoActions.GetUserSuccessAction>(userInfoActions.UserActionTypes.GET_USER_SUCCESS)
    .mergeMap((action) => {
        return Observable.of(new fromLayout.ChangeNavbarColor({color: action.payload.alphaColor }));
    });


    @Effect() onFollowUser$: Observable<Action> =
    this.actions$.ofType<userInfoActions.FollowUserAction>(userInfoActions.UserActionTypes.FOLLOW_USER)
    .withLatestFrom(this.store.select(p => p.userInfo))
    .switchMap(([action, store]) => {
        return this.userInfoService.FollowUser(action.payload.userName)
        .map(data => {
            return new userInfoActions.FollowUserSuccessAction({username: action.payload.username,...data.value});
          })
          .catch((error) => {
            return Observable.of(
              new userInfoActions.FollowUserFailAction({previousFollowState: action.payload.previousFollowState})
            );
          });
    });

    @Effect() onUnFollowUser$: Observable<Action> =
    this.actions$.ofType<userInfoActions.UnfollowUserAction>(userInfoActions.UserActionTypes.UNFOLLOW_USER)
    .switchMap((action) => {
        return this.userInfoService.UnfollowUser(action.payload.userName)
        .map(data => {
            return new userInfoActions.UnfollowUserSuccessAction({username: action.payload.username,...data.value});
          })
          .catch((error) => {
            return Observable.of(
              new userInfoActions.UnfollowUserFailAction({previousFollowState: action.payload.previousFollowState})
            );
          });
    });
}
