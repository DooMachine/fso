import { Component, OnInit, Output, Input ,ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import { PostState } from '../../reducers/post';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.scss']
})
export class PostActionsComponent implements OnInit {
  @Input() post: PostState;
  shareTabOpen:boolean;
  @Output() onlikePost = new EventEmitter();
  @Output() onunlikePost = new EventEmitter();
  @Output() onReportPost = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  toggleShare(){
    this.shareTabOpen = !this.shareTabOpen;
  }
}
