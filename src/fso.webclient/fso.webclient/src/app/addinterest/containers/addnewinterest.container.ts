import { Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { Store, Selector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MatMenuTrigger } from '@angular/material';
import { State, AddInterestState } from '../reducers/addnewinterest';
import * as addInterestActions from '../actions/addnewinterest';
import { selectIsLoading, selectFormPending,selectNewInterest, 
      selectError, selectInterestList, selectInterestsLoading } from '../reducers';
import { InterestCard } from '../../shared/models/interest/interestcard';
import { CollectionCard } from '../../shared/models/collection/collectioncard';

@Component({
    selector: 'app-addnewinterest',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:
        `
            <div *ngIf="(isInterestLoading$ | async);else stepper" >
                <mat-progress-spinner
                    color="primary"
                    >
                </mat-progress-spinner>
            </div>
            <ng-template  #stepper>
                <mat-vertical-stepper>
                    <mat-step label="Details">
                    <app-addinterest-interestdetail
                        (onFormSubmit)="submitForm($event)"
                        [formError] = "formError$ | async"
                        [pending]="formPending$ | async"
                        [autoCompleteInterests]="acInterestList$ | async"
                        (ocInputChanged)="getInterestAutoComplete($event)"
                        [isautoCompleteInterestsLoading]="acInterestsLoading$ | async"
                        [formState]="newInterestState$ | async">
                        </app-addinterest-interestdetail>
                    </mat-step>
                </mat-vertical-stepper>
            </ng-template>
        `,
    styles: [`.mat-step-next{margin: 0 auto;} .nextStepContainer{margin: 8px 0px}`]
})
export class AddNewInterestContainer {
    newInterestState$: Observable<AddInterestState>;
    formPending$:Observable<boolean>;
    acInterestList$:Observable<InterestCard[]>;
    acInterestsLoading$: Observable<boolean>;
    formError$ : Observable<null|string>;
    isInterestLoading$: Observable<boolean>;
    constructor(private store: Store<State>) {
        this.newInterestState$ = this.store.select(selectNewInterest);
        this.formPending$ = this.store.select(selectFormPending);
        this.acInterestList$ = this.store.select(selectInterestList);
        this.acInterestsLoading$ = this.store.select(selectInterestsLoading);
        this.formError$ = this.store.select(selectError);
    }
    acInterestShowError($event){
        this.store.dispatch(new addInterestActions.ShowError($event));
    }
    submitForm($event){
        this.store.dispatch(new addInterestActions.SubmitForm($event));
    }
    getInterestAutoComplete($event){
        this.store.dispatch(new addInterestActions.GetAutoCompleteInterests({query:$event, pageSize: 4}));
    }
}
