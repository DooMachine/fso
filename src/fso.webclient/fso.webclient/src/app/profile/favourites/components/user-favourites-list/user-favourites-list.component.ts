import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { PostCard } from '../../../../shared/models/postcard/postCard';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-user-favourites-list',
  templateUrl: './user-favourites-list.component.html',
  styleUrls: ['./user-favourites-list.component.scss']
})
export class UserFavouritesListComponent implements OnInit {
  @Input() favourites:PostCard[];
  @Input() authUserId: string;
  
  @Output() onlikePost= new EventEmitter();
  @Output() onunlikePost = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
