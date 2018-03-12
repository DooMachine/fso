import { Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { Store, Selector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MatMenuTrigger } from '@angular/material';
import { SEOService } from '../../shared/services/seo.service';
import { State } from '../../reducers';
import { getIsAuthenticated } from '../../auth/reducers/auth.reducer';
import { GetFeedAction } from '../actions/activityfeed';

@Component({
    selector: 'app-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:
        `
        
        <div 
            class="home-wrapper"
                fxLayout="row"
                 fxLayout.lt-md="column" 
                 fxLayoutAlign.lt-md="start stretch"
                  fxLayoutAlign="center start"
                  fxLayoutGap="8px"                
            >
            <div fxFlex="19" fxFlex.lt-md="100" >
                <app-home-interests></app-home-interests>
            </div>
            <div fxFlex>
                <app-home-feed></app-home-feed>
            </div>
            <div  fxFlex="29" fxFlex.lt-md="100">
                <app-home-userrecommendation></app-home-userrecommendation>
                <mat-divider></mat-divider>
                <app-home-grouprecommendation></app-home-grouprecommendation>
            </div>
        </div>
        <app-home-noauth
            *ngIf="!isUserAuthenticated$ | async"
            >            
        </app-home-noauth>

        `,
    styles: [``]
})
export class HomeComponent implements OnInit {
 
    isUserAuthenticated$: Observable<boolean>;
    isLoading$: Observable<boolean>;

    constructor(private store: Store<State>, private seoService:SEOService) {
        this.isUserAuthenticated$ = this.store.select(getIsAuthenticated);
        this.seoService.updateHome();
    }
    ngOnInit() {        
    }
}
