import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store} from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as addinterestActions from '../actions/addnewinterest';
import { State } from '../reducers/addnewinterest';
import { AddNewInterestService } from '../services/addnewinterest.service';
import {ShowProgressBar, HideProgressBar } from '../../core/actions/index';
import { Router } from '@angular/router';

@Injectable()
export class AddNewInterestEffects {

  @Effect() onGetAutoCompleteInterests$: Observable<Action> =
  this.actions$.ofType<addinterestActions.GetAutoCompleteInterests>(addinterestActions.AddNewInterestActionTypes.GET_AUTOCOMPLETE_INTEREST)
  .switchMap((action) => {
      return this.addNewInterestService
      .GetAutoCompleteInterests(action.payload.query,action.payload.pageSize)
      .map(data => {
          return new addinterestActions.GetAutoCompleteInterestsSuccess(data.value);
        })
        .catch((error) => {
          return Observable.of(
            new addinterestActions.GetAutoCompleteInterestsSuccessFail({error:error})
          );
        });
  });

    @Effect() onSubmitInterest$: Observable<Action> =
    this.actions$.ofType<addinterestActions.SubmitForm>(addinterestActions.AddNewInterestActionTypes.SUBMIT_FORM)
    .switchMap((action) => {
        return this.addNewInterestService
        .PublishInterest(action.payload)
        .map(data => {
            if(!data.isActionSucceed){
              return new addinterestActions.SubmitFormFail({error:data.errors.toString()});
            }else{
              this.router.navigate(['/explore',data.group.urlKey]);
              return new addinterestActions.SubmitFormSuccess(data);
            }
          })
          .catch((error) => {
            return Observable.of(
              new addinterestActions.SubmitFormFail({error:error})
            );
          });
    });
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private router: Router,
        private addNewInterestService: AddNewInterestService
    ) {}
}
