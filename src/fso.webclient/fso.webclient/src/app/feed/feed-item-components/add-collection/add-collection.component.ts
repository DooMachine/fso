import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { UserActivity } from '../../../shared/models/user/userActivity';
import { environment } from '../../../../environments/environment';
@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-activity-add-collection',
  template: `
  <mat-card>
  <div class ="cq">
    <div class="activity-desc" activityDescriptionTop>
      
    <img class ="img-circle" [default] [src]=" activity.primaryEntity.userInfo.profileImage" />
    <b>{{ activity.primaryEntity.userInfo.username}}</b>
    <span class="secondary-text">published a new collection</span>
    </div>
     <div fxLayout="row" fxLayoutAlign="start stretch" fxLayoutGap="4px">
      <div fxFlex="50" fxFlex.lt-md="100" class="col-img-holder">
        <mat-grid-list cols="1" rowHeight="1:1">
          <mat-grid-tile
            colspan="1"
            rowspan="1"
            >
            <a [routerLink]="['',activity.primaryEntity.userInfo.username,'collections',activity.primaryEntity.id]">
              <img [default]="defaultCollectionThumbUrl" [src]="activity.primaryEntity.thumbImageUrl" alt="{{activity.primaryEntity.name}}" >
            </a>
          </mat-grid-tile>
        </mat-grid-list>
      </div>
      <div fxLayout="column" fxLayoutAlign="space-between stretch"
      class="col-detail-holder" fxFlex="49" fxFlex.lt-md="100">
      <div>
      <a class="c-a-name a-grey" [routerLink]="['',activity.primaryEntity.userInfo.username,'collections',activity.primaryEntity.id]">
        <h2 >{{activity.primaryEntity.name}}</h2>
      </a>
        <p>{{activity.primaryEntity.description}}</p>
      </div>
      <div fxLayout="column" fxLayoutAlign="start start" fxLayoutWrap fxLayoutGap="4px">
        <span  class="secondary-text">{{activity.primaryEntity.postsCount}} posts</span>
        <span  class="secondary-text">Last Updated : {{activity.primaryEntity.dateUtcModified | date:'HH:mm'}} - {{activity.primaryEntity.dateUtcModified | date}}</span>
      </div>
      </div>
    </div>
    </div>
    </mat-card>
  `,
  styles: [`.cq{padding:2px; padding-bottom:10px; padding-top:10px; position:relative;}.c-a-name{text-decoration:none;} h2{margin-top:4px; margin-bot:4px;}
  .activity-desc,.a-desc-content{margin-top:3px;}.secondary-text{font-weight:600;} .activity-desc{margin-bottom:14px;} .activity-desc img{width:20px;height:20px; margin-bottom:-5px;}
  `]
})
export class AddCollectionComponent implements OnInit {

  @Input() activity: UserActivity;
  @Input() authUserId:string;
  defaultCollectionThumbUrl:string = environment.placeHolderImages.collection;
  constructor() { }

  ngOnInit() {
  }

}
