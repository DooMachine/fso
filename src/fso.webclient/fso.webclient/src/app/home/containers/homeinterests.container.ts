import { Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { Store, Selector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MatMenuTrigger } from '@angular/material';
import { SEOService } from '../../shared/services/seo.service';
import { State } from '../reducers';
import { getIsAuthenticated, selectUserId } from '../../auth/reducers/auth.reducer';
import * as fromInterestActions  from '../actions/interest';
import { UserActivity } from '../../shared/models/user/userActivity';
import { selectAll, isEmpty, getLoading,selectHasNextPage } from '../reducers/interest'
import { InterestCard } from "../../shared/models/interest/interestcard";

@Component({
    selector: 'app-home-interests',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:
        `
        <mat-card>
            <app-feed-interestlist 
                *ngIf="isAuthorized$ | async"
                [interests]="interests$ | async"
                [isEmpty]="isEmpty$ | async"
                [hasNextPage]="hasNextPage$ | async"
                [isLoading]="isLoading$ | async"
                (followInterest)="onFollow($event)"
                (unfollowInterest)="onUnfollow($event)"
                (showMore)="showMore()"
            >
            </app-feed-interestlist>
        </mat-card>
        `,
    styles: [``]
})
export class HomeInterestsComponent implements OnInit {
    interests$: Observable<InterestCard[]>;
    hasNextPage$: Observable<boolean>;
    isEmpty$ :Observable<boolean>;
    isLoading$:Observable<boolean>;
    isAuthorized$:Observable<boolean>;
    userName: string;
    constructor(
        private store: Store<State>

    ) {
        this.interests$ = this.store.select(selectAll);
        this.isLoading$ = this.store.select(getLoading);
        this.isEmpty$ = this.store.select(isEmpty);
        this.hasNextPage$ = this.store.select(selectHasNextPage);
        this.isAuthorized$ = this.store.select(getIsAuthenticated);
     }

    ngOnInit() {
        // If username did not changed dont fetch data => SEEEFFECTS..
        this.store.dispatch(new fromInterestActions.GetInterestAction());
     }
    showMore() {
        this.store.dispatch(new fromInterestActions.GetInterestAction());
    }
    onFollow($event: InterestCard) {
        this.store.dispatch(new fromInterestActions.FollowInterestAction({id: $event.id}));
    }
    onUnfollow($event: InterestCard) {
        this.store.dispatch(new fromInterestActions.UnfollowInterestAction({id: $event.id}));
    }
}
