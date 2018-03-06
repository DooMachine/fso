import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { InterestCard } from '../../shared/models/interest/interestcard';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { GetInterestAction, FollowInterestAction, UnfollowInterestAction } from '../actions/interest';
import * as fromInterest from '../reducers/interest';

@Component({
    selector: 'app-user-interests',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    
        <app-user-interestlist
         [isEmpty]="isEmpty$ | async"
         [interests] = "interests$ | async"
         (follow)="onFollow($event)"
         (unfollow)="onUnfollow($event)"
         (showMoreEmit) = "showMore()"
            >
        </app-user-interestlist>
    
    `,
    styles: [``]
})
export class UserInterestComponent implements OnInit  {
    interests$: Observable<InterestCard[]>;
    hasNextPage$: Observable<boolean>;
    isEmpty$ :Observable<boolean>;
    userName: string;
    constructor(
        private store: Store<fromInterest.State>,
        private route: ActivatedRoute

    ) {
        this.route.parent.params.subscribe( (params) => {
            this.userName = params['userName'];
        });
        this.interests$ = this.store.select(fromInterest.selectAll);
        this.isEmpty$ = this.store.select(fromInterest.isEmpty);
        this.hasNextPage$ = this.store.select(str => str['profile'].interests.hasNextPage);
     }

    ngOnInit() {
        // If username did not changed dont fetch data => SEEEFFECTS..
     }
    showMore() {
        this.store.dispatch(new GetInterestAction({ userName: this.userName }));
    }
    onFollow($event: InterestCard) {
        this.store.dispatch(new FollowInterestAction({id: $event.id}));
    }
    onUnfollow($event: InterestCard) {
        this.store.dispatch(new UnfollowInterestAction({id: $event.id}));
    }
}
