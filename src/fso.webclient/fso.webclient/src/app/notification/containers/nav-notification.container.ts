import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, Selector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Notification } from '../models';
import 'rxjs/add/observable/interval';
import * as fromNotifications from '../reducers';
import * as notificationActions from '../actions';
import { NotificationState } from '../reducers/index';
import { MatMenuTrigger } from '@angular/material';
import { State } from '../../reducers';


@Component({
    selector: 'app-nav-notification',
    template:
        `
        <div *ngIf="(isUserAuthenticated$ | async)" class="n-not-c">
            <div  *ngIf="(this.unseenCount$ | async) > 0"
            class="unseenC primary-bg">{{ this.unseenCount$ | async}}</div>
            <a [routerLink]="['notifications']"
            matTooltip="Notifications"
            matTooltipShowDelay="310"
            routerLinkActive #rla55="routerLinkActive"
            mat-icon-button
            (onMenuOpen)="notificationMenuOpened()" 
            (onMenuClose)="notificationMenuClosed()"
             #navMenuTrigger>
                <mat-icon color="{{rla55.isActive ? 'primary': 'accent'}}"  *ngIf='!(unseenCount$ | async); else noUnseenNotification '>notifications_none</mat-icon>
                <ng-template #noUnseenNotification>
                    <mat-icon color="{{rla55.isActive ? 'primary': 'accent'}}">notifications_active</mat-icon>
                </ng-template >
            </a>
        </div>
        `,
    styles: [`.n-not-c{position:relative;}.unseenC{position:absolute;
         text-align:center;
          font-size:12px;
          font-weight:600;
          pointer-events:none;
            bottom:4px;left:4px; 
            padding:1px;
            z-index:123;
            line-height:13px;
            color:#fff;
            border-radius:70%;
            width:13px; height:13px;}`]
})
export class NavNotificationContainer implements OnInit, OnDestroy {
    unseenCount$: Observable<number>;
    isMenuOpen$: Observable<boolean>;
    isUserAuthenticated$: Observable<boolean>;

    @ViewChild('navMenuTrigger') trigger;
    constructor(private store: Store<State>) {
        this.isUserAuthenticated$ = this.store.select(state => state['auth'].isAuthenticated);
        this.unseenCount$ = this.store.select(fromNotifications.selectUnreadedCount);
        this.isMenuOpen$ = this.store.select(state => state['notifications'].isMenuOpen);
    }
    ngOnInit() {
        // ## SEE AUTH EFFECTS
        this.store.dispatch(new notificationActions.GetNotifications())
        if(typeof window != 'undefined'){
            Observable.interval(300 * 120).subscribe(x => {
                this.store.dispatch( new notificationActions.GetNotificationUpdate());
              });
              
        }        
    }
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
    
    }
    closeNotificationMenu() {
        // this.trigger.closeMenu();
    }
    notificationMenuOpened() {
        this.store.dispatch(new notificationActions.OpenNotificationTab());
    }
    notificationMenuClosed() {
        this.store.dispatch(new notificationActions.CloseNotificationTab());
    }

}
