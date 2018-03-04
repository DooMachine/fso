import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as recommendationActions from '../actions/grouprecommendation';
import { State } from '../reducers';
import { GroupFollowService } from "../../shared/services/groupfollow.service";

@Injectable()
export class GroupRecommendationEffects {
    @Effect() onUserFollowRecommendation$: Observable<Action> =
    this.actions$.ofType<recommendationActions.FollowGroupRecommendationAction>(recommendationActions.GroupRecommendationActionTypes.FOLLOW_INTERESTS)
    .mergeMap((action) => {
        return this.groupFollowService
        .FollowInterest(action.payload.id)
        .map(data => {
            if (data.value.isActionSucceed) {
                return new recommendationActions.FollowInterestSuccessAction({id: action.payload.id, followState: data.value.lastFollowState});
            } else {
                return new recommendationActions.FollowInterestFailAction({id: action.payload.id, followState: data.value.lastFollowState});
            }
          })
          .catch((error) => {
            return Observable.of(
              new recommendationActions.FollowInterestFailAction({id: action.payload.id, followState: 1})
            );
        });
    });
    @Effect() onUserUnfollowRecommendation$: Observable<Action> =
    this.actions$.ofType<recommendationActions.UnfollowGroupRecommendationAction>(recommendationActions.GroupRecommendationActionTypes.UNFOLLOW_INTERESTS)
    .mergeMap((action) => {
        return this.groupFollowService
        .UnfollowInterest(action.payload.id)
        .map(data => {
            if ( data.value.isActionSucceed ) {
                return new recommendationActions.UnfollowInterestSuccessAction({id: action.payload.id, followState: data.value.lastFollowState});
            } else {
                return new recommendationActions.UnfollowInterestFailAction({id: action.payload.id, followState: data.value.lastFollowState});
            }
          })
          .catch((error) => {
            return Observable.of(
              new recommendationActions.UnfollowInterestFailAction({id: action.payload.id, followState: 0})
            );
        });
    });
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private groupFollowService: GroupFollowService
    ) {}
}
