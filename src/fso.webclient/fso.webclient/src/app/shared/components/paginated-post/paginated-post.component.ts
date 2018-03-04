import { Component, OnInit, Input, Output, EventEmitter ,ChangeDetectionStrategy} from '@angular/core';

import { PostCard } from '../../../shared/models/postCard/postCard';
@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-paginated-post',
  templateUrl: './paginated-post.component.html',
  styleUrls: ['./paginated-post.component.scss']
})
export class PaginatedPostComponent implements OnInit {
  @Input() posts: PostCard[];
  @Input() authUserId:string;
  @Input() isMod:boolean;

  @Output() followUser = new EventEmitter();
  @Output() unfollowUser = new EventEmitter();

  @Output() likePost = new EventEmitter();
  @Output() unlikePost = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
