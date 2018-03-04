import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notification, NotificationType } from './../../models';

@Component({
  selector: 'nav-notificationitem',
  templateUrl: './nav-notificationitem.component.html',
  styleUrls: ['./nav-notificationitem.component.scss']
})
export class NavNotificationitemComponent implements OnInit {
  @Input() notification: Notification;
  @Input() icon = '';
  @Input() hint = '';
  @Input() imageUrl = '';
  @Input() routerLink: string | any[] = '/';
  @Output() navigate = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
