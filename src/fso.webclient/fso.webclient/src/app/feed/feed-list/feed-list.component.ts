import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { UserActivity } from '../../shared/models/user/userActivity';
import { ReviewComment } from '../../post/models/reviewComment';

@Component({
  selector: 'app-feed-list',
  changeDetection:ChangeDetectionStrategy.OnPush,
  template: `
    
    
    <div *ngFor="let activity of activities;last as isLast">
      
      <app-activity-review-post 
      (onlikePost)="onlikePost.emit({id: $event, activityId:activity.id})"
      (onlikeReview)="onlikeReview.emit({id: $event, activityId:activity.id})"
      (ondislikeReview)="ondislikeReview.emit({id: $event, activityId:activity.id})"
      (onunlikePost)="onunlikePost.emit({id: $event, activityId:activity.id})"
      (onunlikeReview)="onunlikeReview.emit({id: $event, activityId:activity.id})"
      (onundislikeReview)="onundislikeReview.emit({id: $event, activityId:activity.id})"

      (onlikeComment)="onlikeComment.emit($event)"
      (onunlikeComment) = "onunlikeComment.emit($event)"
      (ondislikeComment)="ondislikeComment.emit($event)"
      (onundislikeComment)="onundislikeComment.emit($event)"
      (onOpenCommentsSection)="openCommentsSection.emit($event)"

      (showCommentForm)="showCommentForm.emit($event)"
      (closeCommentForm)="hideCommentForm.emit($event)"
      (submitCommentForm)="submitCommentForm.emit($event)"
      *ngIf="activity.feedType === 1"
      [authUserProfileImage]="authUserProfileImage"
      [authUserId]="authUserId"
      [comments]="comments"
      [openedCommentReviewIds]="openedCommentReviewIds"
      [loadedCommentReviewIds]="loadedCommentReviewIds"
      [openedCommentFormReviewIds]="openedCommentFormReviewIds"
      [activity]="activity"></app-activity-review-post>

      <app-activity-like-review 
      (onlikePost)="onlikePost.emit({id: $event, activityId:activity.id})"
      (onlikeReview)="onlikeReview.emit({id: $event, activityId:activity.id})"
      (ondislikeReview)="ondislikeReview.emit({id: $event, activityId:activity.id})"
      (onunlikePost)="onunlikePost.emit({id: $event, activityId:activity.id})"
      (onunlikeReview)="onunlikeReview.emit({id: $event, activityId:activity.id})"
      (onundislikeReview)="onundislikeReview.emit({id: $event, activityId:activity.id})"

      (onlikeComment)="onlikeComment.emit($event)"
      (onunlikeComment) = "onunlikeComment.emit($event)"
      (ondislikeComment)="ondislikeComment.emit($event)"
      (onundislikeComment)="onundislikeComment.emit($event)"
      *ngIf="activity.feedType === 2"
      [authUserId]="authUserId"
      [activity]="activity"></app-activity-like-review>

      <app-activity-add-post 
      (onlikePost)="onlikePost.emit({id: $event, activityId:activity.id})"
      (onunlikePost)="onunlikePost.emit({id: $event, activityId:activity.id})"
      *ngIf="activity.feedType === 8"
      [authUserId]="authUserId"
      [activity]="activity"></app-activity-add-post>

      <app-activity-add-collection 
      *ngIf="activity.feedType === 7"
      [authUserId]="authUserId"
      [activity]="activity"></app-activity-add-collection>
    </div>
  `,
  styles: []
})
export class FeedListComponent implements OnInit {
  @Input() activities: UserActivity[];
  @Input() comments: ReviewComment[];

  @Input() openedCommentReviewIds:number[];
  @Input() loadedCommentReviewIds:number[];
  @Input() openedCommentFormReviewIds:number[];

  @Input() authUserId:string;
  @Input() authUserProfileImage:string;
  @Input() loading:boolean;
  @Input() isEmpty: boolean;
  @Output() onlikePost: EventEmitter<any> = new EventEmitter()
  @Output() onlikeReview: EventEmitter<any> = new EventEmitter()
  @Output() ondislikeReview: EventEmitter<any> = new EventEmitter()
  @Output() onunlikePost: EventEmitter<any> = new EventEmitter()
  @Output() onunlikeReview: EventEmitter<any> = new EventEmitter()
  @Output() onundislikeReview: EventEmitter<any> = new EventEmitter()

  @Output() onlikeComment = new EventEmitter();
  @Output() onunlikeComment = new EventEmitter();
  @Output() ondislikeComment = new EventEmitter();
  @Output() onundislikeComment = new EventEmitter();

  @Output() openCommentsSection = new EventEmitter();
  @Output() closeCommentsSection = new EventEmitter();

  @Output() showCommentForm = new EventEmitter();
  @Output() hideCommentForm = new EventEmitter();
  @Output() submitCommentForm = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
