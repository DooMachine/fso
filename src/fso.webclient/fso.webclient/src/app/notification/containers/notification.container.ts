import { Component, OnInit, ViewChild, ChangeDetectionStrategy, AfterContentInit} from '@angular/core';
import { Store, Selector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Notification } from '../models';
import * as fromNotifications from '../reducers';
import * as notificationActions from '../actions';
import { NotificationState,selectAll } from '../reducers/index';
import { MatMenuTrigger } from '@angular/material';
import { SEOService } from '../../shared/services/seo.service';
import { State } from '../../reducers';
import { window } from 'rxjs/operators/window';
import { ScrollService } from "../../shared/services/scroll.service";

@Component({
    selector: 'app-notification',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:
        `
        <div class="main-container">
            <app-notification-list 
            (setAllReaded)="setAllReaded()"
            [notifications]="notifications$ | async"
            (navigateNotification)="navigateNotification($event)"
            >  
            </app-notification-list>
            <div class="button-area">
                <button
                    fxFill
                    mat-raised-button
                    *ngIf="(isMoreNotifications$ | async) && !(isLoading$ | async)"
                    (click)="loadMore()">Load More..</button>
                    <mat-progress-bar *ngIf="isLoading$ | async" mode="buffer"></mat-progress-bar>
            </div>
        </div>
        `,
    styles: [`.button-area{padding: 30px 0px;}`]
})
export class NotificationComponent implements OnInit ,AfterContentInit {
    notifications$: Observable<Notification[]>;
    isUserAuthenticated$: Observable<boolean>;
    isMoreNotifications$: Observable<boolean>;
    isLoading$: Observable<boolean>;
    unReadCount$: Observable<number>;
    constructor(
        private store: Store<State>,
         private seoService:SEOService,
         private scrollService:ScrollService
        ) {
        this.seoService.updateNotificationPage();
        this.isUserAuthenticated$ = this.store.select(state => state['auth'].isAuthenticated);
        this.notifications$ = this.store.select(selectAll);
        this.isMoreNotifications$ = this.store.select(state => state['notification'].isMoreNotifications);
        this.isLoading$ = this.store.select(state => state['notification'].isLoading);
        this.unReadCount$ = this.store.select(fromNotifications.selectUnreadedCount)
    }
    ngOnInit() {
       
        
        // ## SEE AUTH EFFECTS
        // this.store.dispatch(new notificationActions.GetNotifications())

        // this.isUserAuthenticated$.subscribe((isAuth) =>{ if(isAuth) this.store.dispatch(new notificationActions.GetNotifications())});
    }
    ngAfterContentInit() {
        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.
        this.scrollService.scrollToTop();
    }
    loadMore() {
        this.store.dispatch(new notificationActions.GetNotifications());
    }
    navigateNotification($event: Notification) {
        if (!$event.isSeen) {
            const narr: Array<Notification> = new Array();
            narr.push($event);
            this.store.dispatch( new notificationActions.SetNotificationsReaded(narr));
        }
    }
     setAllReaded() {
        this.store.dispatch(new notificationActions.SetNotificationsReaded());
    }
}
