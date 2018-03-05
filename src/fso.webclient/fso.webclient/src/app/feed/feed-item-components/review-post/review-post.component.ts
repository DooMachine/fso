import { Component, OnInit, Input , Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { UserActivity } from '../../../shared/models/user/userActivity';
import { ReviewComment } from '../../../post/models/reviewComment';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-activity-review-post',
  template: `
  
    <app-postcard
     (onlikePost)="onlikePost.emit($event)"
     (onunlikePost)="onunlikePost.emit($event)"
     [postCard]="activity.parentEntity"
     
     >
     <div class="activity-desc" activityDescriptionTop>
     
     <img class ="img-circle" [src]=" activity.primaryEntity.authorInfo.profileImage" />
     <b>{{ activity.primaryEntity.authorInfo.username}}</b>
      <span class="secondary-text">reviewed a post</span>
     </div>
     <app-postcard-review    
      [review] = "activity.primaryEntity"
      (onlikeReview)="onlikeReview.emit($event)"
      (ondislikeReview)="ondislikeReview.emit($event)"
      (onunlikeReview)="onunlikeReview.emit($event)"
      (onundislikeReview)="onundislikeReview.emit($event)"
      (onOpenCommentsSection)="onOpenCommentsSection.emit($event)"
      reviews> 
      
        <app-feed-review-comments comments
         *ngIf="openedCommentReviewIds!=null ? openedCommentReviewIds.indexOf(activity.primaryEntity.id)>-1 : false"
          (showCommentForm)="showCommentForm.emit($event)"
          (closeCommentForm)="closeCommentForm.emit($event)"
          (onlikeComment)="onlikeComment.emit({commentId:$event.commentId,prevlikeStatus:$event.prevlikeStatus,reviewId:activity.primaryEntity.id})"
          (onunlikeComment)="onunlikeComment.emit({commentId:$event.commentId,prevlikeStatus:$event.prevlikeStatus,reviewId:activity.primaryEntity.id})"
          (ondislikeComment)="ondislikeComment.emit({commentId:$event.commentId,prevlikeStatus:$event.prevlikeStatus,reviewId:activity.primaryEntity.id})"
          (onundislikeComment)="onundislikeComment.emit({commentId:$event.commentId,prevlikeStatus:$event.prevlikeStatus,reviewId:activity.primaryEntity.id})"
          [reviewId]="activity.primaryEntity.id"
          [comments] ="comments">  
            <app-feed-review-addcomment #commentForm
            *ngIf=" openedCommentFormReviewIds!=null ? openedCommentFormReviewIds.indexOf(activity.primaryEntity.id)>-1 : false"
            (closeCommentForm)="closeCommentForm.emit(activity.primaryEntity.id)"
            (submitComment) ="submitCommentForm.emit({reviewId:activity.primaryEntity.id,commentForm:$event})"
            [authUserProfileImage]="authUserProfileImage"
            ></app-feed-review-addcomment>     
        </app-feed-review-comments>
      </app-postcard-review>
     </app-postcard>
  `,
  styles: [`.activity-desc,.a-desc-content{margin-top:3px;}.secondary-text{font-weight:600;} .activity-desc{margin-bottom:14px;} img{width:20px;height:20px; margin-bottom:-5px;}`]
})
export class ActivityReviewPostComponent implements OnInit {
  // Parent Entity Type is Post
  @Input() activity: UserActivity;
  @Input() comments:ReviewComment[];
  @Input() openedCommentReviewIds:number[];
  @Input() loadedCommentReviewIds:number[];
  @Input() openedCommentFormReviewIds:number[];
  @Input() authUserId:string;
  @Input() authUserProfileImage:string;
  @Output() onlikePost: EventEmitter<any> = new EventEmitter();
  @Output() onunlikePost: EventEmitter<any> = new EventEmitter();

  @Output() onlikeReview: EventEmitter<any> = new EventEmitter();
  @Output() onunlikeReview: EventEmitter<any> = new EventEmitter();
  @Output() ondislikeReview: EventEmitter<any> = new EventEmitter();
  @Output() onundislikeReview: EventEmitter<any> = new EventEmitter();

  @Output() onlikeComment = new EventEmitter();
  @Output() onunlikeComment = new EventEmitter();
  @Output() ondislikeComment = new EventEmitter();
  @Output() onundislikeComment = new EventEmitter();

  @Output() onOpenCommentsSection = new EventEmitter();

  @Output() showCommentForm = new EventEmitter();
  @Output() closeCommentForm = new EventEmitter();

  @Output() submitCommentForm = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }
}