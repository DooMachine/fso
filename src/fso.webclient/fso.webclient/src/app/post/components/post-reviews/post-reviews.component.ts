import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Review } from '../../models/review';
import { ReviewComment } from '../../models/reviewComment';
@Component({
  selector: 'app-post-reviews',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './post-reviews.component.html',
  styleUrls: ['./post-reviews.component.scss']
})
export class PostReviewsComponent implements OnInit {
  @Input() reviews: Review[];
  @Input() totalReviewCount:number;
  @Input() postId:number;
  @Input() authUserProfileImage:string;
  @Input() authUserId:string;
  @Input() isLoading:boolean;
  @Input() showSeeAllReviewsOption: boolean;
  @Input() comments:ReviewComment[];
  @Input() hasNextPage:boolean;
  
  @Output() deleteComment = new EventEmitter();
  @Output() loadAllReviews = new EventEmitter();
  @Output() loadNextPage = new EventEmitter();
  @Output() hideComments = new EventEmitter();
  @Output() showComments = new EventEmitter();
  @Output() onlikeReview: EventEmitter<any> = new EventEmitter();
  @Output() onunlikeReview: EventEmitter<any> = new EventEmitter();
  @Output() ondislikeReview: EventEmitter<any> = new EventEmitter();
  @Output() onundislikeReview: EventEmitter<any> = new EventEmitter();
  @Output() addReviewClicked: EventEmitter<any> = new EventEmitter();
  @Output() seeReviewsClicked: EventEmitter<any> = new EventEmitter();
  @Output() onloadReviewComments = new EventEmitter();
  @Output() onReportReview = new EventEmitter();
  @Output() showCommentForm = new EventEmitter();
  @Output() closeCommentForm = new EventEmitter();
  @Output() submitCommentForm =new EventEmitter();
  @Output() onlikeComment: EventEmitter<any> = new EventEmitter();
  @Output() onunlikeComment: EventEmitter<any> = new EventEmitter();
  @Output() ondislikeComment: EventEmitter<any> = new EventEmitter();
  @Output() onundislikeComment: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  onScroll(){
    console.log('infinite triggered');
  }
}
