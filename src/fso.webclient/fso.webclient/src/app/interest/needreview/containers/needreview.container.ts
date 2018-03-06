import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PostCard } from '../../../shared/models/postcard/postCard';
import { selectUserId,selectIsMod } from '../../../auth/reducers/auth.reducer';
import { State } from '../reducers';
import * as fromNeedReview from '../reducers/needreviews';
import * as needReviewActions from '../actions/needreview';

@Component({    
    selector: 'app-interest-need-review',
    template: `
            <app-paginated-post
                [authUserId]="authUserId$ | async"
                [isMod]="isMod$ | async"
                [posts]="posts$ | async"
                (onScrollTriggered)="triggerScroll($event)"
                (likePost)="likePost($event)"
                (unlikePost)="unlikePost($event)"
                (followUser)="followUser($event)"
                (unfollowUser)="unfollowUser($event)"
            >

            </app-paginated-post>
            `,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class InterestNeedReviewComponent implements OnInit {

    posts$: Observable<PostCard[]>;
    authUserId$: Observable<string>;
    isMod$:Observable<boolean>;
    urlKey: string;
    constructor(private store: Store<State>, private route: ActivatedRoute) {
        this.route.parent.parent.params.subscribe( (params) => {
            this.urlKey = params['urlKey'];
        });
        this.store.dispatch(new needReviewActions.GetNeedReviews(this.urlKey));
        this.posts$ = this.store.select(fromNeedReview.selectAll);
        this.authUserId$ = this.store.select(selectUserId);
        this.isMod$ = this.store.select(selectIsMod);
    }
    ngOnInit() {

    }
    triggerScroll($event){
        console.log("Implement infinite-scroll");
    }
    
    likePost($event){
        this.store.dispatch(new needReviewActions.LikeInterestPostAction({id:$event}));
    }
    unlikePost($event){
        this.store.dispatch(new needReviewActions.UnLikeInterestPostAction({id:$event}));
    }

    followUser($event){
        this.store.dispatch(new needReviewActions.FollowUser($event));
    }
    unfollowUser($event){
        this.store.dispatch(new needReviewActions.UnfollowUser($event));
    }
}
