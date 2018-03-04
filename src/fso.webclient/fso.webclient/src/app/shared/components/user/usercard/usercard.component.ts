import { Component, OnInit, Input, Output, EventEmitter ,ChangeDetectionStrategy} from '@angular/core';
import { UserInfoSmallCard } from '../../../models/user/userSmallCard';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.scss']
})
export class UsercardComponent implements OnInit {
  @Input() user: UserInfoSmallCard;
  @Output() onfollow = new EventEmitter()
  @Output() onunfollow = new EventEmitter()
  @Output() navigate = new EventEmitter();
  
  followText= "Follow";
  followingText = "Following";
  pendingText = "Pending";

  constructor() { }

  ngOnInit() {
  }

  pendingEnter() {
    this.pendingText = 'Unfollow';
  }
  pendingLeave() {
    this.pendingText = 'Pending';
  }
}
