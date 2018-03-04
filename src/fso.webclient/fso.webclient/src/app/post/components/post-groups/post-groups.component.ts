import { Component, OnInit, Input,ChangeDetectionStrategy } from '@angular/core';
import { InterestCard } from '../../../shared/models/interest/interestcard';
import { CollectionCard } from '../../../shared/models/collection/collectioncard';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-post-groups',
  templateUrl: './post-groups.component.html',
  styleUrls: ['./post-groups.component.scss']
})
export class PostGroupsComponent implements OnInit {
  @Input() groups: InterestCard[];
  @Input() collection: CollectionCard;
  @Input() username:string;
  constructor() { }

  ngOnInit() {
  }

}
