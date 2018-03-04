import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { InterestCard } from '../../../shared/models/interest/interestcard';

@Component({
  selector: 'app-user-interestlist',
  templateUrl: './user-interest.component.html',
  styleUrls: ['./user-interest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInterestListComponent implements OnInit {
  @Input() interests: InterestCard[];
  @Input() isEmpty:boolean;
  @Output() showMoreEmit = new EventEmitter();
  @Output() follow: EventEmitter<any> = new EventEmitter();
  @Output() unfollow: EventEmitter<any> = new EventEmitter();
  followingText = 'Following';
  constructor() { }

  ngOnInit() {
  }
  showMore($event) {
    $event.preventDefault();
    this.showMoreEmit.emit();
  }
  followingEnter() {
    this.followingText = 'Unfollow';
  }
  followingLeave() {
    this.followingText = 'Following';
  }
}
