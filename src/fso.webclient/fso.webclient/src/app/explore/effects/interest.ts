import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as interestActions from '../actions/interest';
import { State } from '../reducers';
import { ExploreService } from '../services/explore.service';

@Injectable()
export class ExploreInterestEffects {
    @Effect() onGetUserInterestsRequest$: Observable<Action> =
    this.actions$.ofType<interestActions.GetInterestAction>(interestActions.InterestActionTypes.GET_INTERESTS)
    .withLatestFrom(this.store.select(p => p))
    .mergeMap(([action, store]) => {
        return this.exploreService
        .GetExploreServices(store['explore'].interests.langCode,
            store['explore'].interests.pageIndex, store['explore'].interests.pageSize, store['explore'].interests.order)
        .map(data => {
            return new interestActions.GetInterestSuccessAction(data);
          })
          .catch((error) => {
            return Observable.of(
              new interestActions.GetInterestFailAction({showError: true})
            );
          });
    });

    @Effect() onUserFollowInterest$: Observable<Action> =
    this.actions$.ofType<interestActions.FollowInterestAction>(interestActions.InterestActionTypes.FOLLOW_INTERESTS)
    .mergeMap((action) => {
        return this.exploreService
        .FollowInterest(action.payload.id)
        .map(data => {
            if (data.value.isActionSucceed) {
                return new interestActions.FollowInterestSuccessAction({id: action.payload.id, followState: data.value.lastFollowState});
            } else {
                return new interestActions.FollowInterestFailAction({id: action.payload.id, followState: data.value.lastFollowState});
            }
          })
          .catch((error) => {
            return Observable.of(
              new interestActions.FollowInterestFailAction({id: action.payload.id, followState: 1})
            );
        });
    });
    @Effect() onUserUnfollowInterest$: Observable<Action> =
    this.actions$.ofType<interestActions.UnfollowInterestAction>(interestActions.InterestActionTypes.UNFOLLOW_INTERESTS)
    .mergeMap((action) => {
        return this.exploreService
        .UnfollowInterest(action.payload.id)
        .map(data => {
            if (data.value.isActionSucceed) {
                return new interestActions.UnfollowInterestSuccessAction({id: action.payload.id, followState: data.value.lastFollowState});
            } else {
                return new interestActions.UnfollowInterestFailAction({id: action.payload.id, followState: data.value.lastFollowState});
            }
          })
          .catch((error) => {
            return Observable.of(
              new interestActions.UnfollowInterestFailAction({id: action.payload.id, followState: 0})
            );
        });
    });
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private exploreService: ExploreService
    ) {}
}
