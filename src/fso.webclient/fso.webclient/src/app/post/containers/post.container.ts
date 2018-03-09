import { Component, OnInit, ChangeDetectionStrategy ,AfterContentInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { State } from '../reducers';
import * as postActions from '../actions/post';
import * as postReviewActions from '../actions/reviews';
import * as postPartActions from '../actions/postparts';
import * as spostActions from '../actions/similiarposts';
import * as fromPost from '../reducers/post';
import * as fromPostParts from '../reducers/postparts';
import * as fromReviews from '../reducers/reviews';
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

import * as fromFeedComments from '../../feed/feed-comments/reducers';
import * as fromFeedCommentActions from '../../feed/feed-comments/actions';

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
                    [authUserId]="authUserId$ | async"
                    (loadAllReviews)="loadAllReviews($event)"
                    [hasNextPage]="hasNextPage$ | async"
                    (loadNextPage)="loadNextReviewPage($event)"
                    [showSeeAllReviewsOption]="showSeeAllReviewsOption"
                    (onlikeReview)="likeReview($event)"
                    (onunlikeReview)="unlikeReview($event)"
                    (ondislikeReview)="dislikeReview($event)"
                    (onundislikeReview)="undislikeReview($event)"
                    [totalReviewCount]="totalReviewCount$ | async"
                    [authUserProfileImage] = "authUserProfileImage$ | async"
                    [reviews]="reviews$ | async"
                    [isLoading]="isLoading$ | async"

                    (onlikeComment)="likeComment($event)"
                    (onunlikeComment) = "unlikeComment($event)"
                    (ondislikeComment)="dislikeComment($event)"
                    (onundislikeComment)="undislikeComment($event)"
                    
                    (deleteComment)="deleteCommentAction($event)"

                    (editComment)="editCommentAction($event)"
                    (closeCommentEditForm)="closeCommentEditForm($event)"
                    (submitEdit)="submitCommentEdit($event)"

                    (showCommentForm)="showCommentForm($event)"
                    (hideCommentForm)="hideCommentForm($event)"
                    (submitCommentForm)="submitComment($event)"
                    [openedCommentEditIds]="openedCommentEditIds$ | async"
                    (openCommentsSection)="openCommentsSection($event)"
                    [comments]="comments$ | async"
                    [openedCommentReviewIds]="openedCommentReviewIds$ | async"
                    [loadedCommentReviewIds] = "loadedCommentReviewIds$ | async"
                    [openedCommentFormReviewIds]="openedCommentFormReviewIds$ | async"

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

export class PostComponent implements OnInit {
    @ViewChild('reviewlist') reviewlist:ElementRef;
    authUserId$: Observable<string>;
    post$: Observable<fromPost.PostState>;
    similiarPosts$:Observable<SimiliarPost[]>;
    nonActivepostParts$: Observable<PostPart[]>;
    
    activePostPart$:Observable<PostPart>;
    postpartViewStyle$:Observable<number>;
    reviews$:Observable<Review[]>;
    totalReviewCount$:Observable<number>;
    urlParam: string;
    reviewIdparam:string;
    commentIdparam:string;
    commentParamExist:boolean;
    authUserProfileImage$:Observable<string>;
    isLoading$:Observable<boolean>;
    showSeeAllReviewsOption:boolean;
    hasNextPage$:Observable<boolean>;

    comments$: Observable<ReviewComment[]>;
    openedCommentReviewIds$:Observable<number[]>;
    loadedCommentReviewIds$:Observable<number[]>;
    openedCommentFormReviewIds$:Observable<number[]>;
    openedCommentEditIds$:Observable<number[]>;

    constructor(private store: Store<State>, private route: ActivatedRoute,private scrollService: ScrollService) {
        this.route.params.subscribe( (params) => {
            this.urlParam = params['postId'];  
            this.scrollService.scrollToTop();
            this.reviewIdparam = params['reviewId'];  
            this.commentIdparam = params['commentId'];  
            this.showSeeAllReviewsOption = this.reviewIdparam !=undefined;
            this.commentParamExist = this.commentIdparam !=undefined;
            if(this.showSeeAllReviewsOption){               
                
                setTimeout(() => {
                    this.reviewlist.nativeElement.scrollIntoView({ behavior: "smooth"}); 
                }, 220);
            }
            this.store.dispatch(new postActions.GetPost({postId:this.urlParam,reviewId:this.reviewIdparam}));
        });
        
    }
    ngOnInit() {    
        if(this.showSeeAllReviewsOption){
            this.openCommentsSection(parseInt(this.reviewIdparam));
        }
        this.hasNextPage$ = this.store.select(fromReviews.selectHasNextPage);
        this.isLoading$ = this.store.select(fromPost.selectIsLoading)
        this.post$ = this.store.select(fromPost.getPost);
        this.similiarPosts$ = this.store.select(fromSimiliarPosts.getPaginatedSimiliarPosts);
        this.nonActivepostParts$ = this.store.select(fromPostParts.getOtherPostParts);
        this.reviews$= this.store.select(fromReviews.selectAll);
        this.totalReviewCount$ = this.store.select(fromReviews.selectTotal);
        
        this.activePostPart$ = this.store.select(fromPostParts.getActivePostPart);
        this.postpartViewStyle$ = this.store.select(fromPostParts.selectPostPartViewStyle);
        this.authUserId$ = this.store.select(selectUserId);
        this.authUserProfileImage$ = this.store.select(selectUserProfileImage); 
        
        this.comments$ = this.store.select(fromFeedComments.selectAll);
        this.openedCommentReviewIds$ = this.store.select(fromFeedComments.selectOpenedCommentReviewIds);
        this.openedCommentFormReviewIds$ = this.store.select(fromFeedComments.selectopenedCommentFormReviewIds);
        this.loadedCommentReviewIds$ = this.store.select(fromFeedComments.selectLoadedCommentReviewIds);
        this.openedCommentEditIds$ = this.store.select(fromFeedComments.selectopenedCommentEditIds);
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
        this.store.dispatch(new postActions.LikePostAction({id: parseInt(this.urlParam)}))
     }
     unlikePost($event){
        this.store.dispatch(new postActions.UnLikePostAction({id: parseInt(this.urlParam)}))
    }
    reportPost($event){
        //this.store.dispatch(new postActions.ReportPost($event));
    }
    deletePost($event){
        this.store.dispatch(new postActions.DeletePost($event));
    }
    likeReview($event){
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
        this.store.dispatch(new spostActions.IncrementPostThumbnailIndex({id:$event.id}))
    }
    mouseLeavedPost($event){
        this.store.dispatch(new spostActions.ResetPostThumnnailIndex({id:$event.id}))
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
    loadNextReviewPage($event){
        this.store.dispatch(new postReviewActions.LoadReviews({id:this.urlParam}));
    }
}
