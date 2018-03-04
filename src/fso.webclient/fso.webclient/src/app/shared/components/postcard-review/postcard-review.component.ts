import { Component, OnInit, Input , Output, EventEmitter,ChangeDetectionStrategy} from '@angular/core';
import { PostCardReview } from '../../models/postCard/postCardReview';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-postcard-review',
  templateUrl: 'postcard-review.component.html',
  styleUrls: ['postcard-review.component.scss']
})
export class PostcardReviewComponent implements OnInit {
  @Input() review: PostCardReview;

  @Input() isAuthenticated: boolean;
  @Input() currentUserUsername: string;

  @Output() onlikeReview: EventEmitter<any> = new EventEmitter();
  @Output() onunlikeReview: EventEmitter<any> = new EventEmitter();
  @Output() ondislikeReview: EventEmitter<any> = new EventEmitter();
  @Output() onundislikeReview: EventEmitter<any> = new EventEmitter();
  @Output() addReviewClicked: EventEmitter<any> = new EventEmitter();
  @Output() seeReviewsClicked: EventEmitter<any> = new EventEmitter();
  @Output() addCommentClicked = new EventEmitter();
  @Output() onReportReview = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
