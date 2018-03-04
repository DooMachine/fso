import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as userInfoActions from '../actions/user';
import * as interestActions from '../actions/interest';
import * as userActivityActions from '../actions/userActivity';

import { State } from '../reducers/user';
import { UserInfoService } from '../services/userinfo.service';

///
/// WHEN USER DATA  LOADED START LOADING OTHER FEATURES
///

@Injectable()
export class UserInfoEffects {
    @Effect() onGetUserInfo$: Observable<Action> =
    this.actions$.ofType<userInfoActions.GetUserSuccessAction>(userInfoActions.UserActionTypes.GET_USER_SUCCESS)
    .withLatestFrom(this.store.select(p => p.userInfo))
    .switchMap(([action, store]) => {
        return this.userInfoService.GetUserInfo(action.payload.userName)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            return new userInfoActions.GetUserSuccessAction(data);
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new userInfoActions.GetUserFailAction({showError: true})
            );
          });
    });

    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private userInfoService: UserInfoService
    ) {}
}
