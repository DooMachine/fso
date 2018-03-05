import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { State, selectAll, isEmpty, getLoading,selectHasNextPage } from '../reducers/userActivity';
import * as userActivityActions from '../actions/userActivity';
import { User } from '../models/userinfo';
import { UserActivity } from '../../shared/models/user/userActivity';
import { selectUserId, selectUserProfileImage } from '../../auth/reducers/auth.reducer';
import { ReviewComment } from '../../post/models/reviewComment';
import * as fromFeedComments from '../../feed/feed-comments/reducers';
import * as fromFeedCommentActions from '../../feed/feed-comments/actions';

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

        (onlikeComment)="likeComment($event)"
        (onunlikeComment) = "unlikeComment($event)"
        (ondislikeComment)="dislikeComment($event)"
        (onundislikeComment)="undislikeComment($event)"

        (showCommentForm)="showCommentForm($event)"
        (hideCommentForm)="hideCommentForm($event)"
        (submitCommentForm)="submitComment($event)"

        (openCommentsSection)="openCommentsSection($event)"
        [comments]="comments$ | async"
        [openedCommentReviewIds]="openedCommentReviewIds$ | async"
        [loadedCommentReviewIds] = "loadedCommentReviewIds$ | async"
        [openedCommentFormReviewIds]="openedCommentFormReviewIds$ | async"

      [authUserProfileImage]="authUserProfileImage$ | async"
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
    authUserProfileImage$:Observable<string>
    loading$:Observable<boolean>;

    comments$: Observable<ReviewComment[]>;
    openedCommentReviewIds$:Observable<number[]>;
    loadedCommentReviewIds$:Observable<number[]>;
    openedCommentFormReviewIds$:Observable<number[]>;
    
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
        this.loading$ = this.store.select(getLoading);

        this.comments$ = this.store.select(fromFeedComments.selectAll);
        this.openedCommentReviewIds$ = this.store.select(fromFeedComments.selectOpenedCommentReviewIds);
        this.openedCommentFormReviewIds$ = this.store.select(fromFeedComments.selectopenedCommentFormReviewIds);
        this.loadedCommentReviewIds$ = this.store.select(fromFeedComments.selectLoadedCommentReviewIds);
        this.authUserProfileImage$ = this.store.select(selectUserProfileImage);    
     }

    ngOnInit() {
        // If username did not changed dont fetch data => SEE EFFECTS..
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

     openCommentsSection($event){
        this.store.dispatch(new fromFeedCommentActions.OpenCommentSection($event))
    }
     hideCommentForm($event){
        this.store.dispatch(new fromFeedCommentActions.CloseCommentFormSection($event));
     }
     showCommentForm($event){
        this.store.dispatch(new fromFeedCommentActions.OpenCommentFormSection($event));
     }
     submitComment($event){
        const body = {reviewId:$event.reviewId,content:$event.commentForm.content};
        this.store.dispatch(new fromFeedCommentActions.PublishComment(body))
     }
    likeComment($event){
        this.store.dispatch(new fromFeedCommentActions.LikeCommentAction($event));
    }
    unlikeComment($event){
        this.store.dispatch(new fromFeedCommentActions.UnLikeCommentAction($event));
    }
    dislikeComment($event){
        this.store.dispatch(new fromFeedCommentActions.DislikeCommentAction($event));
    }
    undislikeComment($event){
        this.store.dispatch(new fromFeedCommentActions.UnDislikeCommentAction($event));
    }

}
