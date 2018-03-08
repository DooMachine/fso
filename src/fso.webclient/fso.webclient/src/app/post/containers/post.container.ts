import { Component, OnInit, ChangeDetectionStrategy ,AfterContentInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { State } from '../reducers';
import * as postActions from '../actions/post';
import * as postReviewActions from '../actions/reviews';
import * as postPartActions from '../actions/postparts';
import * as spostActions from '../actions/similiarposts';
import * as postCommentActions from '../actions/comments';
import * as fromPost from '../reducers/post';
import * as fromPostParts from '../reducers/postparts';
import * as fromReviews from '../reducers/reviews';
import * as fromComments from '../reducers/comment';
import * as fromSimiliarPosts from '../reducers/similiarposts';
import { PaginatedReviewList } from '../models/paginatedReviewList';
import { PostIndex } from '../models/post';
import { SimiliarPost } from '../models/similiarpost';
import { Review } from '../models/review';
import { Comment } from '../../shared/models/comment/comment';
import { PostPart } from '../../shared/models/postpart';
import { selectUserId, selectUserProfileImage } from '../../auth/reducers/auth.reducer';
import { ReviewComment } from '../models/reviewComment';
import { ScrollService } from "../../shared/services/scroll.service";

@Component({
    selector: 'app-post',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="post-wrapper">
        <div fxLayout="row" class="post-l" fxLayoutAlign="start start" fxLayoutWrap>
            <div fxFlex="60" 
            fxFlex.lt-md="100"
            fxLayout="column" fxLayoutAlign="start stretch">   
                <div>
                    <app-post-details
                    (ondelete)="deletePost($event)"
                    (followUser)="followUser($event)"
                    (unfollowUser)="unfollowUser($event)"
                    [post]="post$ | async"                    
                    [authUserId]="authUserId$ | async"
                    ></app-post-details>
                </div>  
                            
                <div>
                    <app-post-postparts
                    (changedToGrid)="changeViewToGrid($event)"
                    (changedToSlide)="changeViewToSlide($event)"
                    (navigatedLeft)="postPartNavigatedLeft($event)"
                    (navigatedRight)="postPartNavigatedRight($event)"
                    (gridPostPartClicked)="gridPostPartClick($event)"
                    [postpartViewStyle] = "postpartViewStyle$ | async"
                    [nonActivepostParts]="nonActivepostParts$ | async"
                    [activePostPart]="activePostPart$ | async"
                    ></app-post-postparts>
                </div>  
                <div>
                    <app-post-actions
                    (onlikePost)="likePost($event)"
                    [post]="post$ | async"  
                    (onunlikePost)="unlikePost($event)"
                    (onReportPost)="reportPost($event)"
                    ></app-post-actions>
                </div>          
                <router-outlet></router-outlet>
                <div #reviewlist>
                    <app-post-reviews
                    [comments]="comments$ | async"
                    (loadAllReviews)="loadAllReviews($event)"
                    [hasNextPage]="hasNextPage$ | async"
                    (loadNextPage)="loadNextReviewPage($event)"
                    [showSeeAllReviewsOption]="showSeeAllReviewsOption"
                    (onloadReviewComments)="loadReviewComments($event)"
                    (showComments)="showComments($event)"
                    (hideComments)="hideComments($event)"
                    (onlikeReview)="likeReview($event)"
                    (onunlikeReview)="unlikeReview($event)"
                    (ondislikeReview)="dislikeReview($event)"
                    (onundislikeReview)="undislikeReview($event)"
                    (showCommentForm)="showCommentForm($event)"
                    (closeCommentForm)="closeCommentForm($event)"
                    (submitCommentForm)="submitCommentForm($event)"
                    (onlikeComment)="likeComment($event)"
                    (onunlikeComment)="unlikeComment($event)"
                    (ondislikeComment)="dislikeComment($event)"
                    (onundislikeComment)="undislikeComment($event)"
                    [totalReviewCount]="totalReviewCount$ | async"
                    [authUserProfileImage] = "authUserProfileImage$ | async"
                    [reviews]="reviews$ | async"
                    [isLoading]="isLoading$ | async"
                    ></app-post-reviews>
                </div>
            </div>
            <div 
            fxFlex="29"
            fxFlex.lt-md="100"
            fxLayout="column" fxLayoutAlign="start start"> 

                <app-post-similiarposts
                [isLoading]="isLoading$ | async"
                (mouseOnPostEmitter)="mouseOnPost($event)"
                (mouseLeavedPostEmitter)="mouseLeavedPost($event)"
                [similiarPosts]="similiarPosts$ | async"
                ></app-post-similiarposts>
            </div>
        </div>
    </div>
         `,
    styles: [`.post-l{margin-top:15px;}`]
})

export class PostComponent implements OnInit, AfterContentInit {
    @ViewChild('reviewlist') reviewlist:ElementRef;
    authUserId$: Observable<string>;
    post$: Observable<fromPost.PostState>;
    similiarPosts$:Observable<SimiliarPost[]>;
    nonActivepostParts$: Observable<PostPart[]>;
    comments$:Observable<ReviewComment[]>;
    activePostPart$:Observable<PostPart>;
    postpartViewStyle$:Observable<number>;
    reviews$:Observable<Review[]>;
    totalReviewCount$:Observable<number>;
    urlParam: number;
    reviewIdparam:number;
    authUserProfileImage$:Observable<string>;
    isLoading$:Observable<boolean>;
    showSeeAllReviewsOption:boolean;
    hasNextPage$:Observable<boolean>;

    constructor(private store: Store<State>, private route: ActivatedRoute,private scrollService: ScrollService) {
        this.route.params.subscribe( (params) => {
            this.urlParam = params['postId'];  
            this.scrollService.scrollToTop();
            this.reviewIdparam = params['reviewId'];  
            this.showSeeAllReviewsOption = this.reviewIdparam !=undefined;
            if(this.showSeeAllReviewsOption){
                setTimeout(() => {
                    this.reviewlist.nativeElement.scrollIntoView({ behavior: "smooth"}); 
                }, 220);
            }
            this.store.dispatch(new postActions.GetPost({postId:this.urlParam,reviewId:this.reviewIdparam}));
        });
        
    }
    ngOnInit() {    
        
        this.hasNextPage$ = this.store.select(fromReviews.selectHasNextPage);
        this.isLoading$ = this.store.select(fromPost.selectIsLoading)
        this.post$ = this.store.select(fromPost.getPost);
        this.similiarPosts$ = this.store.select(fromSimiliarPosts.getPaginatedSimiliarPosts);
        this.nonActivepostParts$ = this.store.select(fromPostParts.getOtherPostParts);
        this.reviews$= this.store.select(fromReviews.selectAll);
        this.totalReviewCount$ = this.store.select(fromReviews.selectTotal);
        this.comments$ = this.store.select(fromComments.selectAll);
        this.activePostPart$ = this.store.select(fromPostParts.getActivePostPart);
        this.postpartViewStyle$ = this.store.select(fromPostParts.selectPostPartViewStyle);
        this.authUserId$ = this.store.select(selectUserId);
        this.authUserProfileImage$ = this.store.select(selectUserProfileImage);    
    }
    ngAfterContentInit() {
        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.
    } 
    loadAllReviews($event){
        this.store.dispatch(new postReviewActions.LoadInitialReviews({id:this.urlParam}))
    }
    postPartNavigatedLeft($event){
        this.store.dispatch(new postPartActions.DecreaseActivePostPartIndex());
    }
    postPartNavigatedRight($event){
        
        this.store.dispatch(new postPartActions.IncreaseActivePostPartIndex());
    }
    changeViewToGrid($event){
        this.store.dispatch(new postPartActions.ChangeViewStyle(1))
    }
    changeViewToSlide($event){
        this.store.dispatch(new postPartActions.ChangeViewStyle(0))
    }
    gridPostPartClick($event){
        this.store.dispatch(new postPartActions.ChangeActivePostPartId($event));
    }
    followUser($event){
        this.store.dispatch(new postActions.FollowUserAction($event));
    }
    unfollowUser($event){
        this.store.dispatch(new postActions.UnfollowUserAction($event));
    }
    likePost($event){
        console.log($event);
        this.store.dispatch(new postActions.LikePostAction({id: this.urlParam}))
     }
     unlikePost($event){
        this.store.dispatch(new postActions.UnLikePostAction({id: this.urlParam}))
    }
    reportPost($event){
        //this.store.dispatch(new postActions.ReportPost($event));
    }
    deletePost($event){
        this.store.dispatch(new postActions.DeletePost($event));
    }
    likeReview($event){
        console.log($event);
        this.store.dispatch(new postReviewActions.LikeReviewAction({id: $event}))
    }
    unlikeReview($event){
        this.store.dispatch(new postReviewActions.UnLikeReviewAction({id: $event}))
    }
    dislikeReview($event){
        this.store.dispatch(new postReviewActions.DislikeReviewAction({id: $event}))
    }
    undislikeReview($event){
        this.store.dispatch(new postReviewActions.UnDislikeReviewAction({id: $event}))
    }
    mouseOnPost($event){
        console.log($event);
        this.store.dispatch(new spostActions.IncrementPostThumbnailIndex({id:$event.id}))
    }
    mouseLeavedPost($event){
        this.store.dispatch(new spostActions.ResetPostThumnnailIndex({id:$event.id}))
    }
    loadReviewComments($event){
        this.store.dispatch(new postReviewActions.LoadComments({id:$event}));
    }
    showCommentForm($event){
        this.store.dispatch(new postReviewActions.ShowCommentForm($event));
    }
    closeCommentForm($event){
        this.store.dispatch(new postReviewActions.HideCommentForm($event));
    }
    submitCommentForm($event){
        const body = {reviewId:$event.reviewId,content:$event.commentForm.content};
        this.store.dispatch(new postReviewActions.PublishComment(body))
    }
    showComments($event){
        this.store.dispatch(new postReviewActions.ShowComments({reviewId:$event}));
    }
    hideComments($event){
        this.store.dispatch(new postReviewActions.HideComments({reviewId:$event}));
    }
    likeComment($event){
        this.store.dispatch(new postCommentActions.LikeCommentAction($event));
    }
    unlikeComment($event){
        this.store.dispatch(new postCommentActions.UnLikeCommentAction($event));
    }
    dislikeComment($event){
        this.store.dispatch(new postCommentActions.DislikeCommentAction($event));
    }
    undislikeComment($event){
        this.store.dispatch(new postCommentActions.UnDislikeCommentAction($event));
    }
    loadNextReviewPage($event){
        this.store.dispatch(new postReviewActions.LoadReviews({id:this.urlParam}));
    }
}
