import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../models/userinfo';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent implements OnInit {

  @Output() followEmit = new EventEmitter();
  @Output() unFollowEmit = new EventEmitter();
  @Input() userInfo: User;
  @Input() userInfoCardStylePosition: string;
  @Input() currentUserName: string;
  followingText = 'Following';
  constructor() { }

  ngOnInit() {
  }
  followingEnter() {
    this.followingText = 'Unfollow';
  }
  followingLeave() {
    this.followingText = 'Following';
  }
}
