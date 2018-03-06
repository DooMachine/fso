import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { State, getReviewsState,selectAll ,selectReviewsLoading,selectHasNextPage} from '../reducers/review';
import { selectAllPosts} from '../reducers/post';
import * as fromReviewActions from '../actions/review';
import * as fromPostActions from '../actions/post';
import { Review } from '../../../shared/models/review/review';
import { PostCard } from '../../../shared/models/postcard/postCard';
import { selectUserId } from '../../../auth/reducers/auth.reducer';



@Component({
    selector: 'app-user-review',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div *ngIf="hasNextPage$ | async"
        infiniteScroll 
        [treshold]="0.52"
        [querySelector]="'#app-user-review-id'"
        (onEnterElement)="onScroll()"
        (onLeaveElement)="onLeave()"
        class="feed_w_wrap">
        </div>
    <app-user-reviews-list
        [posts]="posts$ | async"
        [reviews]="reviews$ | async"        
        (onlikePost)="likePost($event)"
        (onlikeReview)="likeReview($event)"
        (ondislikeReview)="dislikeReview($event)"
        (onunlikePost)="unlikePost($event)"
        (onunlikeReview)="unlikeReview($event)"
        (onundislikeReview)="undislikeReview($event)"
        [authUserId]="currUserId$ | async"
    >
    
    </app-user-reviews-list>
    <div fxLayout="row" fxLayoutAlign="center center" id="app-user-review-id">            
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
    styles: [`#app-user-review-id{height:120px;}`]
})
export class UserReviewComponent implements OnInit {
    reviews$: Observable<Review[]>;
    posts$:Observable<PostCard[]>;
    loading$: Observable<boolean>;
    hasNextPage$:Observable<boolean>;
    currUserId$:Observable<string>;
    userName:string;
    constructor(
        private store: Store<State>,
        private route: ActivatedRoute

    ) {
        this.route.parent.parent.params.subscribe( (params) => {
            this.userName = params['userName'];
        });
        this.reviews$ = this.store.select(selectAll);
        this.posts$ = this.store.select(selectAllPosts);
        this.currUserId$ =this.store.select(selectUserId);
        this.loading$ = this.store.select(selectReviewsLoading);
        this.hasNextPage$ = this.store.select(selectHasNextPage);
     }

    ngOnInit() {
        this.store.dispatch(new fromReviewActions.LoadInitialReviews({userName: this.userName }));
     }
     onScroll(){
         console.log("davai drev");
        this.store.dispatch(new fromReviewActions.LoadReviews({userName: this.userName }));
     }
     likePost($event){
        this.store.dispatch(new fromPostActions.LikePostAction({id:$event}));
     }
     unlikePost($event){
        this.store.dispatch(new fromPostActions.UnLikePostAction({id:$event}));
     }

    likeReview($event){
        console.log($event);
        this.store.dispatch(new fromReviewActions.LikeReviewAction({id: $event}))
    }
    unlikeReview($event){
        this.store.dispatch(new fromReviewActions.UnLikeReviewAction({id: $event}))
    }
    dislikeReview($event){
        this.store.dispatch(new fromReviewActions.DislikeReviewAction({id: $event}))
    }
    undislikeReview($event){
        this.store.dispatch(new fromReviewActions.UnDislikeReviewAction({id: $event}))
    }
}
