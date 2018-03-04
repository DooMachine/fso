import { Component, OnInit,ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { InterestCard } from "../../../shared/models/interest/interestcard";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-feed-interestlist',
  templateUrl: './feed-interestlist.component.html',
  styleUrls: ['./feed-interestlist.component.scss']
})
export class FeedInterestListComponent implements OnInit {
  @Input() isEmpty: boolean;
  @Input() isLoading:boolean;
  @Input() hasNextPage:boolean;
  @Input() interests:InterestCard[];
  @Output() followInterest = new EventEmitter();
  @Output() unfollowInterest = new EventEmitter();
  @Output() showMore = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
