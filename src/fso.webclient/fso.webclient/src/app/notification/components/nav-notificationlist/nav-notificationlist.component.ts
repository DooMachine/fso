import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from './../../models';

@Component({
    selector: 'nav-notificationlist',
    templateUrl: './nav-notificationlist.component.html',
    styleUrls: ['./nav-notificationlist.component.scss']
})
export class NavNotificationListComponent implements OnInit {
    @Input() notifications: Notification[];
    
    constructor() { }

    
    ngOnInit() { }
}