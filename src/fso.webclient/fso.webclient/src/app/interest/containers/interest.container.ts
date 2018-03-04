import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import * as interestActions from '../actions/interest';
import { Interest } from '../models/interest';
import { PaginatedPostList } from '../models/paginatedPost';
import * as fromInterest from '../reducers/interest';
import * as fromInterestPost from '../reducers/posts';
import { PostCard } from '../../shared/models/postCard/postCard';
import { selectUserId,selectIsMod } from '../../auth/reducers/auth.reducer';
import { selectInterest } from '../reducers/interest';
import { State } from '../reducers/interest';

@Component({
    selector: 'app-interest',
    template: `
            <app-interest-detail
                [interest]="interest$ | async"
                [isMod]="isMod$ | async"
                (onCoverImageChanged)="changeCoverImage($event)"
                (onProfileImageChanged)="changeProfileImage($event)"
                (followGroup)="followGroup($event)"
                (leaveGroup)="leaveGroup($event)"
            >
            <div tabs class="home-wrapper-no-vertical-margin">
                <app-interest-tabs >
                </app-interest-tabs>
            </div>
            </app-interest-detail>            
            <div class="home-wrapper">
             <router-outlet></router-outlet>
            </div>
            `,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class InterestComponent implements OnInit {

    interest$: Observable<Interest>;
    isMod$:Observable<boolean>;
    urlKey: string;
    constructor(private store: Store<State>, private route: ActivatedRoute) {
        this.route.params.subscribe( (params) => {
            this.urlKey = params['urlKey'];
        });
        this.interest$ = this.store.select(selectInterest);
        this.isMod$ = this.store.select(selectIsMod);
    }
    ngOnInit() {
        this.store.dispatch(new interestActions.RequestInterest( {urlKey: this.urlKey} ));
     }
     changeCoverImage($event){
         this.store.dispatch(new interestActions.UpdateCoverImage($event))
     }
     changeProfileImage($event){
         this.store.dispatch(new interestActions.UpdateProfileImage($event));
     }

     followGroup($event){
        this.store.dispatch(new interestActions.FollowInterestAction($event));
     }
     leaveGroup($event){
         this.store.dispatch(new interestActions.UnfollowInterestAction($event));
     }
}
