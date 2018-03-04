import { Component, OnInit, Input, Output, EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import { PostState } from '../../reducers/post';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  @Input() post: PostState;


  @Output() followUser = new EventEmitter();
  @Output() unfollowUser = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  @Input() authUserId:string;
}
