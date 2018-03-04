import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store,Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as notificationActions from '../actions';
import { NotificationService } from '../services/notification.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { NotificationState } from '../reducers';



@Injectable()
export class NotificationEffects {
  constructor(
      private actions: Actions,
       private _notificationService: NotificationService,
       private store: Store<NotificationState>,
       private oauthService: OAuthService
    ) {}


    @Effect()
    getNotifications: Observable<Action> = this.actions
        .ofType(notificationActions.GET_NOTIFICATIONS)
        .withLatestFrom(this.store.select(store => store))
        .switchMap(([action, store]) => {
            const notStore = store['notification'];
            const isAuthenticated = this.oauthService.hasValidIdToken() && this.oauthService.hasValidIdToken();
            if(!isAuthenticated){
                return Observable.of({type:'NOT_AUTHENTICATED'});
            }
            //if(!store.isFirstLoaded){
                return this._notificationService
                .GetNotifications(notStore.pageIndex, notStore.pageSize)
                .map(resp => {
                    return new notificationActions.GetNotificationsSuccess(
                        {notifications: resp.value.notifications,
                             isMoreNotifications: resp.value.isMoreNotifications });
                });
            //}            
        });

   @Effect()
   getNotificationUpdates = this.actions
       .ofType(notificationActions.GET_NOTIFICATION_UPDATE)
       .withLatestFrom(this.store.select(store => store))
       .switchMap(([action, store]) => {           
            const notStore = store['notification'];
            const isAuthenticated = this.oauthService.hasValidIdToken() && this.oauthService.hasValidIdToken();
            if(!isAuthenticated){
                return Observable.of({type:'NOT_AUTHENTICATED'});
            }
            return this._notificationService
            .GetNotificationUpdates(notStore.ids[0])
            .map(resp => {
                if(resp.value.length){
                    return new notificationActions.GetNotificationUpdateSuccess({notifications: resp.value });
                }else{
                    return {type:"NO_ACTION"};
                }
            });
       });
    @Effect()
    onSuccessIncrementPageIndex: Observable<Action> = this.actions
      .ofType(notificationActions.GET_NOTIFICATIONS_SUCCESS)
      .map(() => (new notificationActions.IncrementPageIndex()));
    
    @Effect()
    onSuccessSetIcons: Observable<Action> = this.actions
        .ofType(notificationActions.GET_NOTIFICATIONS_SUCCESS)
        .map(() => (new notificationActions.SetNotificationIcons()));
    @Effect()
    onUpdatedSetIcons: Observable<Action> = this.actions
        .ofType(notificationActions.GET_NOTIFICATION_UPDATE_SUCCESS)
        .map(() => (new notificationActions.SetNotificationIcons()));
    @Effect()
    onSuccessSetIconsSuccess: Observable<Action> = this.actions
        .ofType(notificationActions.SET_NOTIFICATION_ICONS)
        .mergeMap((action) => {
            return Observable.of( new notificationActions.SetNotificationIconsSuccess());
        });
    @Effect()
    setNotificationReaded: Observable<Action> = this.actions
        .ofType<notificationActions.SetNotificationsReaded>(notificationActions.SET_NOTIFICATIONS_READED)
        .withLatestFrom(this.store.select(store => store['notification']))
        .switchMap(([action, store]) => {
            let notIds;
            if(action.payload==null){
                notIds = store.ids;
            }else{
                notIds = action.payload.map(p => p.id);
            }
            return this._notificationService
            .SetNotificationsAsSeen(notIds)
            .map(resp => {
                if (resp.value.isActionSucceed === true) {
                    return new notificationActions.SetNotificationsReadedSuccess(notIds);
                }else {
                    return new notificationActions.GetNotificationUpdate();
                }
            });
        });
    @Effect()
    onSetReadedCountUnseenNotifications: Observable<Action> = this.actions
        .ofType(notificationActions.SET_NOTIFICATIONS_READED_SUCCESS)
        .map(() => (new notificationActions.SetUnreadedCount()));
}
