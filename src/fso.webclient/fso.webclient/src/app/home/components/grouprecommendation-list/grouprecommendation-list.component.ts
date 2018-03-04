import { Component, OnInit, ChangeDetectionStrategy,Input,Output,EventEmitter } from '@angular/core';

import { InterestCard } from "../../../shared/models/interest/interestcard";

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-grouprecommendation-list',
  templateUrl: './grouprecommendation-list.component.html',
  styleUrls: ['./grouprecommendation-list.component.scss']
})
export class GrouprecommendationListComponent implements OnInit {
  @Input() interests:InterestCard[];
  @Output() joinGroup = new EventEmitter();
  @Output() leaveGroup = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
