import { Component, OnInit, Input, Output, EventEmitter,ChangeDetectionStrategy } from '@angular/core';

import { PostCard } from '../../models/postCard/postCard';
import { PostCardReview } from '../../models/postCard/postCardReview';
@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss']
  
})
export class PostCardComponent implements OnInit {
  shareTabOpen:boolean;
  //@Input() smallCollapse:boolean;

  @Input() postCard: PostCard;
  @Input() reviews: PostCardReview;
  @Input() isAuthenticated: boolean;
  @Input() currentUserUsername: string;
  @Output() postPartClicked = new EventEmitter();
  @Output() onlikePost = new EventEmitter();
  @Output() onunlikePost = new EventEmitter();
  @Output() addReviewClicked = new EventEmitter();
  @Output() seeReviewsClicked = new EventEmitter();
  @Output() onReportPost = new EventEmitter();

  isOwner: boolean;
  @Input()
  set authUserId(userId: string) {
    if (userId === this.postCard.authorInfo.appUserId) {
      this.isOwner = true;
    } else {
      this.isOwner = false;
    }
  }
  constructor() { }
  
  ngOnInit() {
    
  }
  toggleShare(){
    this.shareTabOpen =!this.shareTabOpen;
  }
  shareFacebook($event){
    
  }
}
