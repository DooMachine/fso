import { Component, OnInit,ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Review } from '../../../../shared/models/review/review';
import { PostCard } from '../../../../shared/models/postCard/postCard';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-user-reviews-list',
  templateUrl: './user-reviews-list.component.html',
  styleUrls: ['./user-reviews-list.component.scss']
})
export class UserReviewsListComponent implements OnInit {
  @Input() reviews:Review[];
  @Input() posts: PostCard[];
  @Input() authUserId:string;
  
  @Output() onlikePost: EventEmitter<any> = new EventEmitter()
  @Output() onlikeReview: EventEmitter<any> = new EventEmitter()
  @Output() ondislikeReview: EventEmitter<any> = new EventEmitter()
  @Output() onunlikePost: EventEmitter<any> = new EventEmitter()
  @Output() onunlikeReview: EventEmitter<any> = new EventEmitter()
  @Output() onundislikeReview: EventEmitter<any> = new EventEmitter()
  
  constructor() {
   }

  ngOnInit() {
  }

}
