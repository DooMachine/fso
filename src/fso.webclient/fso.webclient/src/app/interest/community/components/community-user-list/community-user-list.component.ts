import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { UserInfoSmallCard } from '../../../../shared/models/user/userSmallCard';

@Component({
  selector: 'app-community-user-list',
  templateUrl: './community-user-list.component.html',
  styleUrls: ['./community-user-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CommunityUserListComponent implements OnInit {
  @Input() users:UserInfoSmallCard[];
  @Input() isLoading:boolean;
  @Input() hasNextPage:boolean;

  @Output() loadMore = new EventEmitter();
  @Output() followUser = new EventEmitter();
  @Output() unfollowUser = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

}
