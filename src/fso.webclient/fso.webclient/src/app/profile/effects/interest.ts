import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as interestActions from '../actions/interest';
import { State } from '../reducers';
import { UserInterestService } from '../services/interest.service';

@Injectable()
export class UserInterestEffects {
    @Effect() onGetUserInterestsRequest$: Observable<Action> =
    this.actions$.ofType<interestActions.GetInterestAction>(interestActions.InterestActionTypes.GET_INTERESTS)
    .withLatestFrom(this.store.select(p => p))
    .mergeMap(([action, store]) => {
        return this.userInterestService
        .GetUserInterests(action.payload.userName,
            store['profile'].interests.pageIndex, store['profile'].interests.pageSize, store['profile'].interests.order)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            return new interestActions.GetInterestSuccessAction(data.value);
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new interestActions.GetInterestFailAction({showError: true})
            );
          });
    });

    @Effect() onUserFollowInterest$: Observable<Action> =
    this.actions$.ofType<interestActions.FollowInterestAction>(interestActions.InterestActionTypes.FOLLOW_INTERESTS)
    .mergeMap((action) => {
        return this.userInterestService
        .FollowInterest(action.payload.id)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            if (data.value.isActionSucceed) {
                return new interestActions.FollowInterestSuccessAction({id: action.payload.id, followState: data.value.lastFollowState});
            } else {
                return new interestActions.FollowInterestFailAction({id: action.payload.id, followState: data.value.lastFollowState});
            }
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new interestActions.FollowInterestFailAction({id: action.payload.id, followState: 1})
            );
        });
    });
    @Effect() onUserUnfollowInterest$: Observable<Action> =
    this.actions$.ofType<interestActions.UnfollowInterestAction>(interestActions.InterestActionTypes.UNFOLLOW_INTERESTS)
    .mergeMap((action) => {
        return this.userInterestService
        .UnfollowInterest(action.payload.id)
        .map(data => {
            // You don't need an array because it's only 1 item
            // If you want array use `Observable.from([ /* actions here */ ])`
            //    but then you'll need to change `map` above to
            //     `mergeMap` or `switchMap`
            //   (no big difference for this use case,
            //     `switchMap` is more conventional in Ngrx effects)
            if (data.value.isActionSucceed) {
                return new interestActions.UnfollowInterestSuccessAction({id: action.payload.id, followState: data.value.lastFollowState});
            } else {
                return new interestActions.UnfollowInterestFailAction({id: action.payload.id, followState: data.value.lastFollowState});
            }
          })
          .catch((error) => {
            // You probably haven't called this yet,
            //   but `catch` must return `Obsrvable`
            // Again, if you want an array use `Observable.from([ /* array */ ])`
            return Observable.of(
              new interestActions.UnfollowInterestFailAction({id: action.payload.id, followState: 0})
            );
        });
    });
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private userInterestService: UserInterestService
    ) {}
}
