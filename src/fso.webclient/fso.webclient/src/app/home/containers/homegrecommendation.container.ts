import { Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { Store, Selector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MatMenuTrigger } from '@angular/material';
import { SEOService } from '../../shared/services/seo.service';
import { State } from '../reducers';
import { getIsAuthenticated, selectUserId } from '../../auth/reducers/auth.reducer';
import * as groupRecommendationActions  from '../actions/grouprecommendation';
import { selectAll, isEmpty, getLoading, selectHasNextPage } from '../reducers/grouprecommendation'
import * as fromGroup from '../reducers/grouprecommendation';
import { InterestCard } from "../../shared/models/interest/interestcard";
import * as fromGroupRecommendations from '../actions/grouprecommendation';

@Component({
    changeDetection:ChangeDetectionStrategy.OnPush,
    selector: 'app-home-grouprecommendation',    
    template:
        `
        <mat-card *ngIf="!(isEmpty$ | async)">
        <h3>Explore</h3>
            <app-grouprecommendation-list
                [interests]="interests$ | async"
                (joinGroup)="joinGroup($event)"
                (leaveGroup)="leaveGroup($event)"
                > 
            </app-grouprecommendation-list>
            <div fxLayout="row" fxLayoutAlign="center center" id="botofgrec">                 
                <mat-progress-spinner
                    *ngIf="(loading$ | async)"
                    class="center"
                    color="primary"
                    mode="indeterminate"
                    diameter="32"
                    >
                </mat-progress-spinner>
            </div>
            <mat-divider></mat-divider>
            <a class="a-grey" [routerLink]="['explore']"><h4>Explore feasion</h4></a>
        </mat-card>
        `,
    styles: [`mat-card{padding-bottom:6px;} h4{font-weight:500}`]
})
export class HomeGroupRecommendationComponent implements OnInit {
    
    isUserAuthenticated$: Observable<boolean>;
    interests$:Observable<InterestCard[]>;
    hasNextPage$:Observable<boolean>;
    isEmpty$: Observable<boolean>;
    currentUserId$:Observable<string>;
    loading$:Observable<boolean>;

    constructor(private store: Store<State>) {        

        this.interests$ = this.store.select(fromGroup.selectAll);
        this.hasNextPage$ = this.store.select(selectHasNextPage);
        this.isEmpty$ = this.store.select(isEmpty);
        this.currentUserId$ = this.store.select(selectUserId);
        this.loading$ = this.store.select(getLoading)
        this.isUserAuthenticated$ = this.store.select(getIsAuthenticated);
    }
    ngOnInit() {
    }
    joinGroup($event){
        this.store.dispatch(new fromGroupRecommendations.FollowGroupRecommendationAction($event))
     }
     leaveGroup($event){
        this.store.dispatch(new fromGroupRecommendations.UnfollowGroupRecommendationAction($event))
     }
}
