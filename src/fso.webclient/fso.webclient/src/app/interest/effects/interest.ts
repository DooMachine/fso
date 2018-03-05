import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/concatMap'
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as interestActions from '../actions/interest';
import { GetPostSuccessAction } from '../actions/posts';
import * as fromCore from '../../core/actions';
import { State } from '../../reducers/index';
import { InterestService } from '../services/interest.service';
import { InterestActionService } from '../services/interestaction.service';
import { GroupFollowService } from '../../shared/services/groupfollow.service';
import { SEOService } from "../../shared/services/seo.service";


@Injectable()
export class InterestEffects {
    constructor(
        private actions$: Actions,
        private _interestService: InterestService,
        private _interestActionService:InterestActionService,
        private _seoService:SEOService,
        private _interestFollowService: GroupFollowService,
        private store: Store<State>
    ) {}

    @Effect()
    onRequestInterest$: Observable<Action> =
    this.actions$.ofType<interestActions.RequestInterest>(interestActions.InterestActionTypes.REQUEST_INTEREST)
    .withLatestFrom(this.store.select(store => store['interest'])) 
    .switchMap(([action, store]) => {
        if(store.interest.urlKey == action.payload.urlKey){
            return Observable.of({type:'NO_ACTION'});
        }
        return this._interestService
        .GetGroupIndex(action.payload.urlKey,store['posts'].pageIndex, 
         store['posts'].pageSize, store['posts'].order)
        .concatMap(resp => {
            this._seoService.updateInterestPage(resp.group);
            let obs = [
                {type:'CLEAR_INTEREST_STATE'},
                new interestActions.RecieveInterestSuccess(resp.group),
                new GetPostSuccessAction(resp.posts)
            ];
            return Observable.from(obs);
        });
    });
    @Effect() onCoverImageUpload$: Observable<Action> =
    this.actions$.ofType<interestActions.UpdateCoverImage>(interestActions.InterestActionTypes.UPDATE_COVER_IMAGE)
   .switchMap((action) => {
        return this._interestActionService
        .UpdateGroupCoverImage(action.payload)
        .map(data => {
            return new interestActions.UpdateCoverImageSuccess(data.value);             
          })
          .catch((error) => {
            return Observable.of(
              new interestActions.UpdateCoverImageFail(error)
            );
          });
    });
    @Effect() onProfileImageUpload$: Observable<Action> =
    this.actions$.ofType<interestActions.UpdateProfileImage>(interestActions.InterestActionTypes.UPDATE_PROFILE_IMAGE)
   .switchMap((action) => {
        return this._interestActionService
        .UpdateGroupProfileImage(action.payload)
        .map(data => {
            return new interestActions.UpdateProfileImageSuccess(data.value);             
          })
          .catch((error) => {
              console.log(error);
            return Observable.of(
              new interestActions.UpdateProfileImageFail(error)
            );
          });
    });
    @Effect()
    onInterestRecieveLayoutEffect: Observable<Action> = this.actions$
      .ofType(interestActions.InterestActionTypes.RECIEVE_INTEREST_SUCCESS)
      .withLatestFrom(this.store.select(store => store))
      .switchMap(([action, store]) => {
          return Observable.of(new fromCore.ChangeNavbarColor({color: store['interest'].alphaColor }));
      });
      @Effect() onUserFollowInterest$: Observable<Action> =
    this.actions$.ofType<interestActions.FollowInterestAction>(interestActions.InterestActionTypes.FOLLOW_INTERESTS)
    .mergeMap((action) => {
        return this._interestFollowService
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
        return this._interestFollowService
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
}
