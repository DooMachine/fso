import { Component, OnInit, Output, EventEmitter,Input,ChangeDetectionStrategy } from '@angular/core';
import { Notification } from '../../models/index';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  @Input() notifications:Notification[];

  @Output() navigateNotification = new EventEmitter();
  @Output() setAllReaded = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  setAllNotificationReaded($event){
    $event.preventDefault();
    this.setAllReaded.emit();
  }
}
