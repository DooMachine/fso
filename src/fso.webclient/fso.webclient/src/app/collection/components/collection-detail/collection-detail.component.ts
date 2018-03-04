import { Component, OnInit, Input,ChangeDetectionStrategy } from '@angular/core';
import { CollectionState } from '../../reducers/collection';
import { environment } from '../../../../environments/environment';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.scss']
})
export class CollectionDetailComponent implements OnInit {
  @Input() collection:CollectionState;
  @Input() postCount:number;
  defaultCollectionThumbUrl:string = environment.placeHolderImages.collection;
  constructor() { }

  ngOnInit() {
  }

}
