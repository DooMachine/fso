import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { UserActivity } from '../../shared/models/user/userActivity';

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
      *ngIf="activity.feedType === 1"
      [authUserId]="authUserId"
      [activity]="activity"></app-activity-review-post>

      <app-activity-like-review 
      (onlikePost)="onlikePost.emit({id: $event, activityId:activity.id})"
      (onlikeReview)="onlikeReview.emit({id: $event, activityId:activity.id})"
      (ondislikeReview)="ondislikeReview.emit({id: $event, activityId:activity.id})"
      (onunlikePost)="onunlikePost.emit({id: $event, activityId:activity.id})"
      (onunlikeReview)="onunlikeReview.emit({id: $event, activityId:activity.id})"
      (onundislikeReview)="onundislikeReview.emit({id: $event, activityId:activity.id})"
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
  @Input() authUserId:string;
  @Input() loading:boolean;
  @Input() isEmpty: boolean;
  @Output() onlikePost: EventEmitter<any> = new EventEmitter()
  @Output() onlikeReview: EventEmitter<any> = new EventEmitter()
  @Output() ondislikeReview: EventEmitter<any> = new EventEmitter()
  @Output() onunlikePost: EventEmitter<any> = new EventEmitter()
  @Output() onunlikeReview: EventEmitter<any> = new EventEmitter()
  @Output() onundislikeReview: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}
