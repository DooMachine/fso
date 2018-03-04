import { Component, OnInit, ChangeDetectionStrategy,Input,Output,EventEmitter } from '@angular/core';
import { UserInfoSmallCard } from "../../../shared/models/user/userSmallCard";

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-userrecommendation-list',
  templateUrl: './userrecommendation-list.component.html',
  styleUrls: ['./userrecommendation-list.component.scss']
})
export class UserrecommendationListComponent implements OnInit {
  @Input() users:UserInfoSmallCard[];
  @Output() followUser = new EventEmitter();
  @Output() unfollowUser = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
