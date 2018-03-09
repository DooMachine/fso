import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { State, getCollectionsState, selectAll,selectIsLoading,selectHasNextPage ,selectShowCollectionForm} from '../reducers/collections';
import { GetCollectionAction, AddCollection, UpdateCollectionImage, DeleteCollection, ToggleCollectionForm } from '../actions/collection';
import { getIsUserOwner } from '../../reducers/user';
import { CollectionCard } from '../../../shared/models/collection/collectioncard';


@Component({
    selector: 'app-user-collections',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div *ngIf="isUserOwner$ | async" >
    <a color="accent" mat-stroked-button href="#" (click)="toggleShowForm($event)">Add a new collection</a>
    <app-add-new-collection
        (submitCollection)="addCollection($event)"
        *ngIf="showForm$ | async"></app-add-new-collection>
    </div>
    <div *ngIf="hasNextPage$ | async"
        infiniteScroll 
        [treshold]="0.52"
        [querySelector]="'#app-user-col-id'"
        (onEnterElement)="onScroll()"
        (onLeaveElement)="onLeave()"
        class="feed_w_wrap">
    </div>
    <app-profile-collection-list
        (updateColThumb)="updateCollectionThumb($event)"
        (collectionDelete)="deleteCollection($event)"
        [isOwner]="isUserOwner$ | async"
        [collections]="collections$ | async">
    
    </app-profile-collection-list>
    <div fxLayout="row" fxLayoutAlign="center center" id="app-user-col-id">            
        <mat-progress-spinner
        *ngIf="(loading$ | async)"
        class="center"
        color="primary"
        mode="indeterminate"
        diameter="32"
        >
        </mat-progress-spinner>            
    </div>
    `,
    styles: [`#app-user-col-id{height:120px}`]
})
export class UserCollectionsComponent implements OnInit {
    collectionsState$: Observable<State>;
    showForm$: Observable<boolean>;
    collections$:Observable<CollectionCard[]>
    userName: string;
    isUserOwner$:Observable<boolean>;
    loading$: Observable<boolean>;
    hasNextPage$:Observable<boolean>;

    constructor(
        private store: Store<State>,
        private route: ActivatedRoute
    ) {
        this.route.parent.parent.params.subscribe( (params) => {
            this.userName = params['userName'];
        });
        this.collectionsState$ = this.store.select(getCollectionsState);
        this.collections$ = this.store.select(selectAll);
        this.isUserOwner$ = this.store.select(getIsUserOwner);
        this.showForm$ = this.store.select(selectShowCollectionForm);
        this.loading$ = this.store.select(selectIsLoading);
        this.hasNextPage$ = this.store.select(selectHasNextPage);
     }

    ngOnInit() {        
        // this.store.dispatch(new GetCollectionAction({userName: this.userName }));
    }
    onScroll(){
        this.store.dispatch(new GetCollectionAction({userName: this.userName }));
    }
    updateCollectionThumb($event){
        this.store.dispatch(new UpdateCollectionImage($event));
    }
    addCollection($event){
        this.store.dispatch( new AddCollection($event));
    }
    deleteCollection($event){
        this.store.dispatch(new DeleteCollection($event))
    }
    toggleShowForm($event){
        $event.preventDefault();
        this.store.dispatch(new ToggleCollectionForm());
    }
}
