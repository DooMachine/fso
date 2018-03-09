import { Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { Store, Selector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MatMenuTrigger } from '@angular/material';
import { SEOService } from '../../shared/services/seo.service';
import { State } from '../reducers';
import { getIsAuthenticated, selectUserId, selectUserProfileImage } from '../../auth/reducers/auth.reducer';
import * as fromActivityActions  from '../actions/activityfeed';
import { UserActivity } from '../../shared/models/user/userActivity';
import { selectAll, isEmpty, getLoading, selectHasNextPage } from '../reducers/activityfeed'
import { ReviewComment } from '../../post/models/reviewComment';
import * as fromFeedComments from '../../feed/feed-comments/reducers';
import * as fromFeedCommentActions from '../../feed/feed-comments/actions';

@Component({
    changeDetection:ChangeDetectionStrategy.OnPush,
    selector: 'app-home-feed',    
    template:
        `
        <div *ngIf="isUserAuthenticated$ | async">
            <div *ngIf="hasNextPage$ | async"
                infiniteScroll 
                [treshold]="0.80"
                [querySelector]="'#botofdiv'"
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
                    
                    (deleteComment)="deleteCommentAction($event)"

                    (editComment)="editCommentAction($event)"
                    (closeCommentEditForm)="closeCommentEditForm($event)"
                    (submitEdit)="submitCommentEdit($event)"
                    [openedCommentEditIds]="openedCommentEditIds$ | async"

                    (showCommentForm)="showCommentForm($event)"
                    (hideCommentForm)="hideCommentForm($event)"
                    (submitCommentForm)="submitComment($event)"
                    [authUserProfileImage]="authUserProfileImage$ | async"
                    [authUserId]="currentUserId$ | async"
                    [isEmpty]="isEmpty$ | async"
                    [loading]="loading$ | async"
                    (openCommentsSection)="openCommentsSection($event)"
                    [comments]="comments$ | async"
                    [openedCommentReviewIds]="openedCommentReviewIds$ | async"
                    [loadedCommentReviewIds] = "loadedCommentReviewIds$ | async"
                    [openedCommentFormReviewIds]="openedCommentFormReviewIds$ | async"

                [activities] = "feedActivities$ | async">
                
                </app-feed-list>
                <div fxLayout="row" fxLayoutAlign="center center" id="botofdiv">                 
                    <mat-progress-spinner
                    *ngIf="(loading$ | async)"
                    class="center"
                    color="primary"
                    mode="indeterminate"
                    diameter="32"
                    >
                    </mat-progress-spinner>            
                </div>
                <div *ngIf="((isEmpty$ | async) && (!loading$ | async)) || (!hasNextPage$ | async)">
                    <a class="primary-light-text" [routerLink]="['explore']">
                        <h5>Looks like we could not populate your feed. You may start from exploring your interests.</h5>                
                    </a>
            </div>
        </div>
        `,
    styles: [`#botofdiv{height:200px;}`]
})
export class HomeFeedComponent implements OnInit {
 
    isUserAuthenticated$: Observable<boolean>;
    feedActivities$:Observable<UserActivity[]>;
    hasNextPage$:Observable<boolean>;
    isEmpty$: Observable<boolean>;
    currentUserId$:Observable<string>;
    loading$:Observable<boolean>;
    authUserProfileImage$:Observable<string>
    
    comments$: Observable<ReviewComment[]>;
    openedCommentReviewIds$:Observable<number[]>;
    loadedCommentReviewIds$:Observable<number[]>;
    openedCommentFormReviewIds$:Observable<number[]>;
    openedCommentEditIds$:Observable<number[]>;

    constructor(private store: Store<State>) {        
        //this.store.dispatch( new fromActivityActions.GetFeedAction());
        this.feedActivities$ = this.store.select(selectAll);
        this.hasNextPage$ = this.store.select(selectHasNextPage);
        this.isEmpty$ = this.store.select(isEmpty);
        this.currentUserId$ = this.store.select(selectUserId);
        this.loading$ = this.store.select(getLoading)
        this.isUserAuthenticated$ = this.store.select(getIsAuthenticated);

        this.comments$ = this.store.select(fromFeedComments.selectAll);
        this.openedCommentReviewIds$ = this.store.select(fromFeedComments.selectOpenedCommentReviewIds);
        this.openedCommentFormReviewIds$ = this.store.select(fromFeedComments.selectopenedCommentFormReviewIds);
        this.loadedCommentReviewIds$ = this.store.select(fromFeedComments.selectLoadedCommentReviewIds);
        this.openedCommentEditIds$ = this.store.select(fromFeedComments.selectopenedCommentEditIds);
        this.authUserProfileImage$ = this.store.select(selectUserProfileImage);    
    }
    ngOnInit() {
    }
    onScroll(){
        this.store.dispatch( new fromActivityActions.GetFeedAction());        
    }
    onLeave(){

    }
    
    likePost($event){
        this.store.dispatch(new fromActivityActions.LikePostAction($event))
     }
     likeReview($event){
        this.store.dispatch(new fromActivityActions.LikeReviewAction($event))
     }
     dislikeReview($event){
        this.store.dispatch(new fromActivityActions.DislikeReviewAction($event))
     }
     unlikePost($event){
        this.store.dispatch(new fromActivityActions.UnLikePostAction($event))
    }
     unlikeReview($event){
        this.store.dispatch(new fromActivityActions.UnLikeReviewAction($event))
    }
     undislikeReview($event){
        this.store.dispatch(new fromActivityActions.UnDislikeReviewAction($event))
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
    deleteCommentAction($event){
        this.store.dispatch(new fromFeedCommentActions.DeleteComment($event));
    }
    editCommentAction($event){
        this.store.dispatch(new fromFeedCommentActions.OpenEditComment($event));
    }
    closeCommentEditForm($event){
        this.store.dispatch(new fromFeedCommentActions.CloseEditComment($event));
    }
    submitCommentEdit($event){
        this.store.dispatch(new fromFeedCommentActions.SaveEditComment($event));
    }
}
