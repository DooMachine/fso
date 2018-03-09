import { Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { Store, Selector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MatMenuTrigger } from '@angular/material';
import { SEOService } from '../../shared/services/seo.service';
import { State } from '../reducers';
import { getIsAuthenticated, selectUserId } from '../../auth/reducers/auth.reducer';
import * as groupRecommendationActions  from '../actions/grouprecommendation';
import { UserActivity } from '../../shared/models/user/userActivity';
import { selectAll, isEmpty, getLoading, selectHasNextPage } from '../reducers/userrecommendation'
import * as fromUser from '../reducers/userrecommendation';
import { InterestCard } from "../../shared/models/interest/interestcard";
import { UserInfoSmallCard } from "../../shared/models/user/userSmallCard";
import * as fromUserRecommendations from '../actions/userrecommendation';

@Component({
    changeDetection:ChangeDetectionStrategy.OnPush,
    selector: 'app-home-userrecommendation',    
    template:
        `
        <mat-card *ngIf="!(isEmpty$ | async)">
        <h3>Suggested follows</h3>
            <app-userrecommendation-list
                [users]="users$ | async"
                (followUser)="followUser($event)"
                (unfollowUser)="unfollowUser($event)"
                >
            </app-userrecommendation-list>
            <div fxLayout="row" fxLayoutAlign="center center" id="botofrec">                 
                <mat-progress-spinner
                    *ngIf="(loading$ | async)"
                    class="center"
                    color="primary"
                    mode="indeterminate"
                    diameter="32"
                    >
                </mat-progress-spinner>            
            </div>
            <a class="a-grey" [routerLink]="['find-people']"><h4>Find more people</h4></a>
        </mat-card>
        `,
    styles: [`mat-card{padding-bottom:6px; margin-bottom:8px;} h4{font-weight:500}`]
})
export class HomeUserRecommendationComponent implements OnInit {
    
    isUserAuthenticated$: Observable<boolean>;
    users$:Observable<UserInfoSmallCard[]>;
    hasNextPage$:Observable<boolean>;
    isEmpty$: Observable<boolean>;
    currentUserId$:Observable<string>;
    loading$:Observable<boolean>;

    constructor(private store: Store<State>) {        

        this.users$ = this.store.select(fromUser.selectAll);
        this.hasNextPage$ = this.store.select(selectHasNextPage);
        this.isEmpty$ = this.store.select(isEmpty);
        this.currentUserId$ = this.store.select(selectUserId);
        this.loading$ = this.store.select(getLoading)
        this.isUserAuthenticated$ = this.store.select(getIsAuthenticated);
    }
    ngOnInit() {
    }
    followUser($event){
        this.store.dispatch(new fromUserRecommendations.FollowUserAction($event))
     }
     unfollowUser($event){
        this.store.dispatch(new fromUserRecommendations.UnfollowUserAction($event))
     }
}
