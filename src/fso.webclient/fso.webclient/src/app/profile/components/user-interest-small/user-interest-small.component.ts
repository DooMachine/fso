import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InterestCard } from '../../../shared/models/interest/interestcard';

@Component({
  selector: 'app-user-interest-small',
  template: `
    <div class="feasion-dark-theme">
      <a class="interest-small-link" 
      color="primary" [routerLink]="['/interest',interest.urlKey]" *ngFor="let interest of interests">{{interest.name}} </a>
    </div>
  `,
  styles: [`.interest-small-link:before{content:'';
      width:7px;
      height:7px;
      margin-right:2px;
      margin-bottom:1px;
      border-radius:50%;
      background: #aeaeaebb;
      display:inline-block;  }`]
})
export class UserInterestSmallComponent implements OnInit {

  @Input() interests: InterestCard[];
  @Output() showMoreEmit = new EventEmitter();
  // @Output() follow: EventEmitter<any> = new EventEmitter();
  // @Output() unfollow: EventEmitter<any> = new EventEmitter();
  // followingText = 'Following';
  constructor() { }

  ngOnInit() {
  }
  showMore($event) {
    $event.preventDefault();
    this.showMoreEmit.emit();
  }
  // followingEnter() {
  //   this.followingText = 'Unfollow';
  // }
  // followingLeave() {
  //   this.followingText = 'Following';
  // }

}
