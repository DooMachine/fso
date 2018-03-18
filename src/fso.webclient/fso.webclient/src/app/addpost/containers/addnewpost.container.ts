import { Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { Store, Selector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MatMenuTrigger } from '@angular/material';
import { State, AddPostState } from '../reducers/addnewpost';
import * as addPostActions from '../actions/addnewpost';
import { PostPart } from '../../shared/models/postpart';
import { selectPostParts,selectInterestList,selectIsLoading, selectCollections, selectFormPending,selectPost, 
    selectPostPartsLenght, selectInterestsLoading, selectSelectedInterests, selectError, selectIsPostLoading, selectPostPartPending } from '../reducers';
import { InterestCard } from '../../shared/models/interest/interestcard';
import { CollectionCard } from '../../shared/models/collection/collectioncard';

@Component({
    selector: 'app-addnewpost',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:
        `
            <div *ngIf="(isPostLoading$ | async);else stepper" >
                <mat-progress-spinner
                    color="primary"
                    >
                </mat-progress-spinner>
            </div>
            <ng-template  #stepper>
                <mat-vertical-stepper>
                    <mat-step label="Upload your pictures">
                        <app-addpost-postparts
                        [postPartPending]="postPartPending$ | async"
                        (removePostpart) = "removePostpart($event)"
                        (postPartAdded)="addPostPart($event)"
                        [postpartcount]="postPartsLenght$ | async"
                        [postparts]="postParts$ | async"
                        >
                        </app-addpost-postparts>
                        <div class="nextStepContainer" fxLayout="row" fxLayoutAlign="center center">                   
                            <button mat-raised-button
                            class="mat-step-next"
                            color="primary"
                            matStepperNext>
                                Next
                            </button>
                        </div> 
                    </mat-step>
                    <mat-step label="Details">
                    <app-addpost-postdetail
                        (onFormSubmit)="submitForm($event)"
                        (ocInputSelected)="acInterestSelected($event)"
                        (onShowError)="acInterestShowError($event)"
                        [formError] = "formError$ | async"
                        (onRemoveSelectedInterest)="acInterestRemoved($event)"
                        [selectedInterests]="selectedInterests$ | async"
                        [collectionsList] = "collectionsList$ | async"
                        
                        (ocInputChanged)="getInterestAutoComplete($event)"
                        [pending]="formPending$ | async"
                        [autoCompleteInterests]="acInterestList$ | async"
                        [isautoCompleteInterestsLoading]="acInterestsLoading$ | async"
                        [formState]="newPostState$ | async">
                        </app-addpost-postdetail>
                    </mat-step>
                </mat-vertical-stepper>
            </ng-template>
        `,
    styles: [`.mat-step-next{margin: 0 auto;} .nextStepContainer{margin: 8px 0px}`]
})
export class AddNewPostContainer implements OnInit {
    newPostState$: Observable<AddPostState>;
    postParts$: Observable<PostPart[]>;
    postPartsLenght$: Observable<number>;
    formPending$:Observable<boolean>;
    acInterestList$:Observable<InterestCard[]>;
    collectionsList$: Observable<CollectionCard[]>;
    acInterestsLoading$: Observable<boolean>;
    selectedInterests$ : Observable<InterestCard[]>;
    formError$ : Observable<null|string>;
    postPartPending$: Observable<boolean>;
    isPostLoading$: Observable<boolean>;
    constructor(private store: Store<State>) {
        this.postParts$ = this.store.select(selectPostParts);
        this.postPartsLenght$ = this.store.select(selectPostPartsLenght);
        this.formPending$ = this.store.select(selectFormPending);
        this.newPostState$ = this.store.select(selectPost);
        this.acInterestList$ = this.store.select(selectInterestList);
        this.acInterestsLoading$ = this.store.select(selectInterestsLoading);
        this.selectedInterests$ = this.store.select(selectSelectedInterests);
        this.collectionsList$ = this.store.select(selectCollections);
        this.formError$ = this.store.select(selectError);
        this.isPostLoading$ = this.store.select(selectIsPostLoading);
        this.postPartPending$  = this.store.select(selectPostPartPending);
    }
    
    ngOnInit() {
        this.store.dispatch(new addPostActions.GetUnpublishedPost());
    }

    public addPostPart($event: any){
        console.log($event);
        this.store.dispatch(new addPostActions.AddPostPart({file: $event}));
    }
    public removePostpart($event){
        this.store.dispatch(new addPostActions.RemovePostPart({postPartId: $event.postPartId}))
    }
    acInterestSelected($event){
        this.store.dispatch(new addPostActions.SelectInterest($event));
    }
    acInterestRemoved($event){
        this.store.dispatch(new addPostActions.DeSelectInterest($event));
    }
    acInterestShowError($event){
        this.store.dispatch(new addPostActions.ShowError($event));
    }
    getInterestAutoComplete($event){
        console.debug("before  dispatch");
        this.store.dispatch(new addPostActions.GetAutoCompleteInterests({query:$event, pageSize: 4}));
    }
    submitForm($event){
        this.store.dispatch(new addPostActions.SubmitForm($event));
    }
}
