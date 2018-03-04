import { Component, OnInit, Input, Output, EventEmitter,ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-user-followbutton',
  templateUrl: './user-followbutton.component.html',
  styleUrls: ['./user-followbutton.component.scss']
})
export class UserFollowbuttonComponent implements OnInit {
  @Input() username: string;
  @Input() followState:number;
  @Input() isBorderles:boolean;
  followText = "Follow";
  followingText = "Unfollow";
  pendingText ="Pending";
  @Output() onfollow = new EventEmitter()
  @Output() onunfollow = new EventEmitter()
  @Output() navigate = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  followingEnter() {
    this.followingText = 'Unfollow';
  }
  followingLeave() {
    this.followingText = 'Following';
  }
  pendingEnter() {
    this.pendingText = 'Unfollow';
  }
  pendingLeave() {
    this.pendingText = 'Pending';
  }
}
