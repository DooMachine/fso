import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { State, selectAllExploreInterests,selectHasNextPage, getLoading } from '../reducers/interest';
import { selectUserName, selectUserId } from '../../auth/reducers/auth.reducer';
import { GetInterestAction, FollowInterestAction, UnfollowInterestAction } from '../actions/interest';
import { InterestCard } from "../../shared/models/interest/interestcard";


@Component({
    changeDetection:ChangeDetectionStrategy.OnPush,
    selector: 'app-explore',
    template: `
    <div *ngIf="hasNextPage$ | async"
        infiniteScroll 
        [treshold]="0.98"
        [querySelector]="'#app-explore-if-id'"
        (onEnterElement)="onScroll()"
        (onLeaveElement)="onLeave()"
        class="feed_w_wrap">
        </div>
    <div class="home-wrapper-no-vertical-margin">
        <h1>Explore feasion</h1>
        <span>Pick your interests to start your feasion adventure!</span>
        <mat-divider></mat-divider>
        <app-explore-interest-list
            [interests]="interests$ | async"
            (follow)="followInterest($event)"
            (unfollow)="unfollowInterest($event)"
            >
        </app-explore-interest-list>
    </div>
    <div fxLayout="row" fxLayoutAlign="center center" id="app-explore-if-id">            
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
    styles: [`mat-divider{margin-bottom:12px;} #app-explore-if-id{height:120px;}`]
})
export class ExploreComponent implements OnInit {
    interests$: Observable<InterestCard[]>;
    hasNextPage$:Observable<boolean>;
    loading$:Observable<boolean>;
    
    constructor(
        private store: Store<State>,
        private route: ActivatedRoute
    ) {
        this.store.dispatch(new GetInterestAction());
        this.interests$ = this.store.select(selectAllExploreInterests);
        this.loading$ = this.store.select(getLoading);
        this.hasNextPage$ = this.store.select(selectHasNextPage);
     }

    ngOnInit() {
                    
     }
     onScroll(){
        this.store.dispatch(new GetInterestAction());
     }
     followInterest($event){
        this.store.dispatch(new FollowInterestAction({id:$event.id}))
     }
     unfollowInterest($event){
        this.store.dispatch(new UnfollowInterestAction({id:$event.id}))
     }
}
