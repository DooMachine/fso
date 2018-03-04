import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as interestActions from '../actions/interest';
import { State } from '../reducers';
import { GroupFollowService } from '../../shared/services/groupfollow.service';
import { HomeInterestService } from '../services/homeinterest.service';
import { OAuthService } from "angular-oauth2-oidc";


@Injectable()
export class HomeInterestEffects {
    @Effect() onGetUserInterestsRequest$: Observable<Action> =
    this.actions$.ofType<interestActions.GetInterestAction>(interestActions.InterestActionTypes.GET_INTERESTS)
    .withLatestFrom(this.store.select(p => p))
    .switchMap(([action, store]) => {
        const isAuthenticated = this.oauthService.hasValidIdToken() && this.oauthService.hasValidIdToken();
        console.log("isauth",isAuthenticated);
        if(!isAuthenticated){
            return Observable.from([{type:'NOT_AUTHENTICATED'}]);
        }
        return this.homeInterestService
        .GetUserInterests(
            store['home'].interests.pageIndex, store['home'].interests.pageSize, store['home'].interests.order)
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
        return this.groupFollowService
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
        return this.groupFollowService
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
        private groupFollowService: GroupFollowService,
        private homeInterestService:HomeInterestService,
        private oauthService:OAuthService
    ) {}
}
