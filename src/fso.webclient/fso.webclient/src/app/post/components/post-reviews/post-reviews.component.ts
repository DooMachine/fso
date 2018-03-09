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

  @Output() onlikeComment = new EventEmitter();
  @Output() onunlikeComment = new EventEmitter();
  @Output() ondislikeComment = new EventEmitter();
  @Output() onundislikeComment = new EventEmitter();
  @Output() deleteComment = new EventEmitter();
  @Output() editComment = new EventEmitter();
  @Output() submitEdit = new EventEmitter();
  @Output() closeCommentEditForm = new EventEmitter();

  @Output() openCommentsSection = new EventEmitter();
  @Output() closeCommentsSection = new EventEmitter();

  @Output() showCommentForm = new EventEmitter();
  @Output() hideCommentForm = new EventEmitter();
  @Output() submitCommentForm = new EventEmitter();

  @Input() openedCommentReviewIds:number[];
  @Input() loadedCommentReviewIds:number[];
  @Input() openedCommentFormReviewIds:number[];
  @Input() openedCommentEditIds:number[];

  @Output() closeCommentForm = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }
  onScroll(){
    console.log('infinite triggered');
  }
}
