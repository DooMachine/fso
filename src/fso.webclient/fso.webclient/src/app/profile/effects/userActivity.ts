import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as userActivityActions from '../actions/userActivity';
import { State } from '../reducers';
import { UserActivityService } from '../services/userActivity.service';

@Injectable()
export class UserActivityEffects {
    @Effect() onGetUserReviewsRequest$: Observable<Action> =
    this.actions$.ofType<userActivityActions.GetUserActivitiesAction>(userActivityActions.UserActivityActionTypes.GET_USER_ACTIVITIES)
    .withLatestFrom(this.store.select(p => p['profile']))
    .switchMap(([action, store]) => {
        return this.userActivityService
        .GetUserActivities(action.payload.userName, store.activity.pageIndex, store.activity.pageSize)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            return new userActivityActions.GetUserActivitiesSuccessAction(data);
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new userActivityActions.GetUserActivitiesFailAction({showError: true})
            );
          });
    });

    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private userActivityService: UserActivityService
    ) {}
}
