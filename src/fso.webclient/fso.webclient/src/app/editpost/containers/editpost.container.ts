import { Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { Store, Selector } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatMenuTrigger } from '@angular/material';
import { State, EditPostState } from '../reducers/editpost';
import * as editPostActions from '../actions/editpost';
import { PostPart } from '../../shared/models/postpart';
import { selectPostParts,selectInterestList,selectIsLoading, selectCollections, selectFormPending,selectPost, 
    selectPostPartsLenght, selectInterestsLoading, selectSelectedInterests, selectError, selectIsPostLoading, selectPostPartPending, selectPrevCollection } from '../reducers';
import { InterestCard } from '../../shared/models/interest/interestcard';
import { CollectionCard } from '../../shared/models/collection/collectioncard';

@Component({
    selector: 'app-editpost',
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
                    <mat-step label="Pictures">
                        <app-editpost-postparts
                        [postPartPending]="postPartPending$ | async"
                        (removePostpart) = "removePostpart($event)"
                        (postPartAdded)="addPostPart($event)"
                        [postpartcount]="postPartsLenght$ | async"
                        [postparts]="postParts$ | async"
                        >
                        </app-editpost-postparts>
                        <div class="nextStepContainer" fxLayout="row" fxLayoutAlign="center center">                   
                            <button mat-raised-button
                            class="mat-step-next"
                            color="primary"
                            matStepperNext>
                                Next
                            </button>
                        </div> 
                    </mat-step>
                    <mat-step label="Post Details">
                    <app-editpost-postdetail
                        (onFormSubmit)="submitForm($event)"
                        (ocInputSelected)="acInterestSelected($event)"
                        (onShowError)="acInterestShowError($event)"
                        [formError] = "formError$ | async"
                        (onRemoveSelectedInterest)="acInterestRemoved($event)"
                        [selectedInterests]="selectedInterests$ | async"
                        [collectionsList] = "collectionsList$ | async"
                        [isautoCompleteInterestsLoading]="acInterestsLoading$ | async"
                        (ocInputChanged)="getInterestAutoComplete($event)"
                        [pending]="formPending$ | async"
                        [prevSelectedCollectionId]="prevSelectedCollectionId$ | async"
                        [autoCompleteInterests]="acInterestList$ | async"
                        [formState]="newPostState$ | async">
                        </app-editpost-postdetail>
                    </mat-step>
                </mat-vertical-stepper>
            </ng-template>
        `,
    styles: [`.mat-step-next{margin: 0 auto;} .nextStepContainer{margin: 8px 0px}`]
})
export class EditPostContainer implements OnInit {
    postId:number;
    newPostState$: Observable<EditPostState>;
    postParts$: Observable<PostPart[]>;
    postPartsLenght$: Observable<number>;
    prevSelectedCollectionId$:Observable<number>;
    formPending$:Observable<boolean>;
    acInterestList$:Observable<InterestCard[]>;
    collectionsList$: Observable<CollectionCard[]>;
    acInterestsLoading$: Observable<boolean>;
    selectedInterests$ : Observable<InterestCard[]>;
    formError$ : Observable<null|string>;
    postPartPending$: Observable<boolean>;
    isPostLoading$: Observable<boolean>;
    constructor(private store: Store<State>, private route: ActivatedRoute) {
        this.route.params.subscribe( (params) => {
            this.postId = params['postId'];
            this.store.dispatch({type:'CLEAR_EDIT_POST_STATE'});
        });

        this.postParts$ = this.store.select(selectPostParts);
        this.postPartsLenght$ = this.store.select(selectPostPartsLenght);
        this.formPending$ = this.store.select(selectFormPending);
        this.newPostState$ = this.store.select(selectPost);
        this.acInterestList$ = this.store.select(selectInterestList);
        this.acInterestsLoading$ = this.store.select(selectInterestsLoading);
        this.selectedInterests$ = this.store.select(selectSelectedInterests);
        this.collectionsList$ = this.store.select(selectCollections);
        this.prevSelectedCollectionId$=this.store.select(selectPrevCollection)
        this.formError$ = this.store.select(selectError);
        this.isPostLoading$ = this.store.select(selectIsPostLoading);
        this.postPartPending$  = this.store.select(selectPostPartPending);
    }
    
    ngOnInit() {
        this.store.dispatch(new editPostActions.GetEditingPost({postId:this.postId}));
    }

    addPostPart($event: any){
        this.store.dispatch(new editPostActions.AddPostPart({file: $event}));
    }
    removePostpart($event){
        this.store.dispatch(new editPostActions.RemovePostPart({postPartId: $event.postPartId}))
    }
    acInterestSelected($event){
        this.store.dispatch(new editPostActions.SelectInterest($event));
    }
    acInterestRemoved($event){
        this.store.dispatch(new editPostActions.DeSelectInterest($event));
    }
    acInterestShowError($event){
        this.store.dispatch(new editPostActions.ShowError($event));
    }
    getInterestAutoComplete($event){
        this.store.dispatch(new editPostActions.GetAutoCompleteInterests({query:$event, pageSize: 4}));
    }
    submitForm($event){
        this.store.dispatch(new editPostActions.SubmitForm($event));
    }
}
