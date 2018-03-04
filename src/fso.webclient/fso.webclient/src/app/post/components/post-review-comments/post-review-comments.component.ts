import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { PaginatedCommentList } from '../../models/paginatedReviewCommentList';
import { ReviewComment } from '../../models/reviewComment';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-post-review-comments',
  templateUrl: './post-review-comments.component.html',
  styleUrls: ['./post-review-comments.component.scss']
})
export class PostReviewCommentsComponent implements OnInit {
  @Input() reviewId:number;
  @Input() commentarray:ReviewComment[];
  @Output() showCommentForm = new EventEmitter();
  @Output() closeCommentForm = new EventEmitter();
  
  @Input() set comments(com: ReviewComment[]) {
    this.commentarray = com.filter((comment) => {
      return comment.reviewId==this.reviewId;
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
