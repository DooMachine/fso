import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { ReviewComment } from '../../../../post/models/reviewComment';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-feed-review-comments',
  templateUrl: './feed-review-comments.component.html',
  styleUrls: ['./feed-review-comments.component.scss']
})
export class FeedReviewCommentsComponent implements OnInit {
  @Input() reviewId:number;
  @Input() authUserId:string; 
  @Input() authUserProfileImage:string;
  @Input() commentarray:ReviewComment[];
  @Input() openedCommentEditIds:number[];
  @Output() showCommentForm = new EventEmitter();
  @Output() closeCommentForm = new EventEmitter();
  @Output() deleteComment = new EventEmitter();
  @Output() editComment = new EventEmitter();

  @Output() submitEdit = new EventEmitter();
  @Output() closeCommentEditForm = new EventEmitter();
  @Input() set comments(com: ReviewComment[]) {
    if(!com) return;
    this.commentarray = com.filter((comment) => {
      return comment.reviewId == this.reviewId; 
    });
  } 
  @Output() onlikeComment: EventEmitter<any> = new EventEmitter();
  @Output() onunlikeComment: EventEmitter<any> = new EventEmitter();
  @Output() ondislikeComment: EventEmitter<any> = new EventEmitter();
  @Output() onundislikeComment: EventEmitter<any> = new EventEmitter();

  
  
  constructor() { }

  ngOnInit() {
  }
  showComment($event){
    $event.preventDefault();
    this.showCommentForm.emit(this.reviewId);
  }
}
