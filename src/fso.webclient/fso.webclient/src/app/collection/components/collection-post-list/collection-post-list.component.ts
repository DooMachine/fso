import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PostCard } from '../../../shared/models/postCard/postCard';

@Component({
  selector: 'app-collection-post-list',
  templateUrl: './collection-post-list.component.html',
  styleUrls: ['./collection-post-list.component.scss']
})
export class CollectionPostListComponent implements OnInit {
  @Input() posts: PostCard[];
  @Input() authUserId:string;
  @Output() onlikePost= new EventEmitter();
  @Output() onunlikePost = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
