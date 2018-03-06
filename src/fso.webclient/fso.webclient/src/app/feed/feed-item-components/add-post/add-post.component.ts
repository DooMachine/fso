import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PostCard } from '../../../shared/models/postcard/postCard';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-activity-add-post',
  template: `
      <app-postcard
        (onlikePost)="onlikePost.emit($event)"
        (onunlikePost)="onunlikePost.emit($event)"
        [postCard]="activity.primaryEntity"
        [authUserId]="authUserId"
        >
        <span activityDescription>published a post</span>
      </app-postcard>
  `,
  styles: []
})
export class AddPostActivityComponent implements OnInit {
  @Input() activity;
  @Input() authUserId;
  @Output() onlikePost = new EventEmitter();
  @Output() onunlikePost = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
