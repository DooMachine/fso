import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { PostCard } from '../../../../shared/models/postcard/postCard';

@Component({
  selector: 'app-userpost-list-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './userpost-list-component.component.html',
  styleUrls: ['./userpost-list-component.component.scss']
})
export class UserpostListComponentComponent implements OnInit {
  @Input() posts: PostCard[];
  @Input() authUserId:string;
  @Output() onlikePost= new EventEmitter();
  @Output() onunlikePost = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
