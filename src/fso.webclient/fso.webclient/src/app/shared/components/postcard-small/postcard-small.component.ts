import { Component, OnInit, Input, Output, EventEmitter,ChangeDetectionStrategy } from '@angular/core';

import { PostCard } from '../../models/postCard/postCard';
import { PostCardReview } from '../../models/postCard/postCardReview';
@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-postcard-small',
  templateUrl: './postcard-small.component.html',
  styleUrls: ['./postcard-small.component.scss']
  
})
export class PostCardSmallComponent implements OnInit {
  

  @Input() postCard: PostCard;
  @Input() isAuthenticated: boolean;
  @Input() currentUserUsername: string;
  @Output() onlikePost = new EventEmitter();
  @Output() onunlikePost = new EventEmitter();

  @Output() followUser = new EventEmitter();
  @Output() unfollowUser = new EventEmitter();

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
  shareFacebook($event){
    
  }
  onFollowUser($event){
    this.followUser.emit({postId:this.postCard.id,username:$event.username});
  }
  onUnfollowUser($event){
    this.unfollowUser.emit({postId:this.postCard.id,username:$event.username});
  }
}
