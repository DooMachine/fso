import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../models/index';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {
  @Input() notification: Notification;
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[] = '/';
  @Output() navigate = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
