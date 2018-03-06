import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { PostCard } from '../../../../shared/models/postcard/postCard';
import { Review } from '../../../../shared/models/review/review';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-user-review-item',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.scss']
})
export class UserReviewItemComponent implements OnInit {
  @Input() post:PostCard;
  @Input() actualreview: Review
  @Input() set reviews(reviews){this.actualreview = reviews.find(f=>f.postId==this.post.id)};
 
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
