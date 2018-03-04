import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as userRecActions from '../actions/userrecommendation';
import { State } from '../reducers';
import { UserFollowService } from "../../shared/services/userfollow.service";

@Injectable()
export class UserRecommendationEffects {
        @Effect() onFollowUser$: Observable<Action> =
        this.actions$.ofType<userRecActions.FollowUserAction>(userRecActions.UserRecommendationActionTypes.FOLLOW_USER)        
        .switchMap((action) => {
            return this.userFollowService.FollowUser(action.payload.username)
            .map(data => {
                return new userRecActions.FollowUserSuccessAction({username: action.payload.username,...data.value});
              })
              .catch((error) => {
                return Observable.of(
                  new userRecActions.FollowUserFailAction({previousFollowState: action.payload.previousFollowState})
                );
              });
        });
    
        @Effect() onUnFollowUser$: Observable<Action> =
        this.actions$.ofType<userRecActions.UnfollowUserAction>(userRecActions.UserRecommendationActionTypes.UNFOLLOW_USER)
        .switchMap((action) => {
            return this.userFollowService.UnfollowUser(action.payload.username)
            .map(data => {
                return new userRecActions.UnfollowUserSuccessAction({username: action.payload.username,...data.value});
              })
              .catch((error) => {
                return Observable.of(
                  new userRecActions.UnfollowUserFailAction({previousFollowState: action.payload.previousFollowState})
                );
              });
        });    
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private userFollowService: UserFollowService,
    ) {}
}
