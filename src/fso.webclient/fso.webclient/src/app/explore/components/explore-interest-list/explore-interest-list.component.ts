import { Component, OnInit, ChangeDetectionStrategy,Input,Output,EventEmitter } from '@angular/core';
import { InterestCard } from "../../../shared/models/interest/interestcard";

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-explore-interest-list',
  templateUrl: './explore-interest-list.component.html',
  styleUrls: ['./explore-interest-list.component.scss']
})
export class ExploreInterestListComponent implements OnInit {
  @Input() interests: InterestCard[];

  @Output() follow = new EventEmitter();
  @Output() unfollow = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
}
