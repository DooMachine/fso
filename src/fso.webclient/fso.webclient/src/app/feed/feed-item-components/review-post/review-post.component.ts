import { Component, OnInit, Input , Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { UserActivity } from '../../../shared/models/user/userActivity';

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
      reviews> 
      </app-postcard-review>

     </app-postcard>
  `,
  styles: [`.activity-desc,.a-desc-content{margin-top:3px;}.secondary-text{font-weight:600;} .activity-desc{margin-bottom:14px;} img{width:20px;height:20px; margin-bottom:-5px;}`]
})
export class ActivityReviewPostComponent implements OnInit {
  // Parent Entity Type is Post
  @Input() activity: UserActivity;
  @Input() authUserId:string;
  @Output() onlikePost: EventEmitter<any> = new EventEmitter();
  @Output() onunlikePost: EventEmitter<any> = new EventEmitter();

  @Output() onlikeReview: EventEmitter<any> = new EventEmitter();
  @Output() onunlikeReview: EventEmitter<any> = new EventEmitter();
  @Output() ondislikeReview: EventEmitter<any> = new EventEmitter();
  @Output() onundislikeReview: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }
}