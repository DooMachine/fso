import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { State, selectAll, isEmpty, getLoading,selectHasNextPage } from '../reducers/userActivity';
import * as userActivityActions from '../actions/userActivity';
import { User } from '../models/userinfo';
import { UserActivity } from '../../shared/models/user/userActivity';
import { selectUserId } from '../../auth/reducers/auth.reducer';


@Component({
    selector: 'app-user-activity',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        
    <div *ngIf="hasNextPage$ | async"
        infiniteScroll 
        [treshold]="0.52"
        [querySelector]="'#app-user-activity-id'"
        (onEnterElement)="onScroll()"
        (onLeaveElement)="onLeave()"
        class="feed_w_wrap">
        </div>
    <app-feed-list 
      (onlikePost)="likePost($event)"
      (onlikeReview)="likeReview($event)"
      (ondislikeReview)="dislikeReview($event)"
      (onunlikePost)="unlikePost($event)"
      (onunlikeReview)="unlikeReview($event)"
      (onundislikeReview)="undislikeReview($event)"
      [authUserId]="currentUserId$ | async"
      [isEmpty]="isEmpty$ | async"
      [loading]="loading$ | async"
      
      [activities] = "activities$ | async"></app-feed-list>
    <div fxLayout="row" fxLayoutAlign="center center" id="app-user-activity-id">            
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
    styles: [`#app-user-activity-id{height:150px;}`]
})
export class UserActivityComponent implements OnInit {
    activities$: Observable<UserActivity[]>;
    hasNextPage$ : Observable<boolean>;
    isEmpty$: Observable<boolean>;
    userName: string;    
    currentUserId$:Observable<string>;
    loading$:Observable<boolean>;
    constructor(
        private store: Store<State>,
        private route: ActivatedRoute

    ) {
        this.route.parent.params.subscribe( (params) => {
            this.userName = params['userName'];
        });
        this.activities$ = this.store.select(selectAll);
        this.hasNextPage$ = this.store.select(selectHasNextPage);
        this.isEmpty$ = this.store.select(isEmpty);
        this.currentUserId$ = this.store.select(selectUserId);
        this.loading$ = this.store.select(getLoading)
     }

    ngOnInit() {
        // If username did not changed dont fetch data => SEEEFFECTS..
        //this.store.dispatch(new userActivityActions.GetUserActivitiesAction({userName: this.userName }));
     }
     onScroll(){
        this.store.dispatch(new userActivityActions.GetUserActivitiesAction({userName: this.userName }));
     }
     likePost($event){
        this.store.dispatch(new userActivityActions.LikePostAction($event))
     }
     likeReview($event){
        this.store.dispatch(new userActivityActions.LikeReviewAction($event))
     }
     dislikeReview($event){
        this.store.dispatch(new userActivityActions.DislikeReviewAction($event))
     }
     unlikePost($event){
        this.store.dispatch(new userActivityActions.UnLikePostAction($event))
    }
     unlikeReview($event){
        this.store.dispatch(new userActivityActions.UnLikeReviewAction($event))
    }
     undislikeReview($event){
        this.store.dispatch(new userActivityActions.UnDislikeReviewAction($event))
     }
}
