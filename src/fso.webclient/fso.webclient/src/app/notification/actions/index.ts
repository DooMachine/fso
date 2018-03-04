import { Action } from '@ngrx/store';
import { Notification, NotificationType } from '../models';

export const GET_NOTIFICATIONS          = '[Notifications] GET_NOTIFICATIONS';
export const GET_NOTIFICATIONS_SUCCESS         = '[Notifications] GET_NOTIFICATIONS_SUCCESS';
export const SET_UNREADED_COUNT          = '[Notifications] SET_UNREADED_COUNT';
export const INCREMENT_PAGEINDEX          = '[Notifications] INCREMENT_PAGEINDEX';
export const GET_NOTIFICATION_UPDATE          = '[Notifications] GET_NOTIFICATION_UPDATE';
export const GET_NOTIFICATION_UPDATE_SUCCESS          = '[Notifications] GET_NOTIFICATION_UPDATE_SUCCESS';
export const OPEN_NOTIFICATION_TAB          = '[Notifications] OPEN_NOTIFICATION_TAB';
export const CLOSE_NOTIFICATION_TAB          = '[Notifications] CLOSE_NOTIFICATION_TAB';
export const TOGGLE_NOTIFICATION_TAB          = '[Notifications] TOGGLE_NOTIFICATION_TAB';
export const SET_NOTIFICATION_ICONS = '[Notifications] SET_NOTIFICATION_ICONS';
export const SET_NOTIFICATION_ICONS_SUCCESS = '[Notifications] SET_NOTIFICATION_ICONS_SUCCESS';

export const SET_NOTIFICATIONS_READED = '[Notifications] SET_NOTIFICATIONS_READED';
export const SET_NOTIFICATIONS_READED_SUCCESS = '[Notifications] SET_NOTIFICATIONS_READED_SUCCESS';

export class GetNotifications implements Action {
  readonly type = GET_NOTIFICATIONS;
  constructor() {}
}
export class GetNotificationsSuccess implements Action {
  readonly type = GET_NOTIFICATIONS_SUCCESS;
  constructor(public payload: { notifications: Notification[], isMoreNotifications: boolean }) {}
}
export class IncrementNotificationPageIndex implements Action {
  readonly type = SET_UNREADED_COUNT;
  constructor(public payload?: any) {}
}
export class IncrementPageIndex implements Action {
    readonly type = INCREMENT_PAGEINDEX;
    constructor(public payload?: any) {}
}
export class GetNotificationUpdate implements Action {
    readonly type = GET_NOTIFICATION_UPDATE;
    constructor(public payload?: any) {}
}
export class GetNotificationUpdateSuccess implements Action {
    readonly type = GET_NOTIFICATION_UPDATE_SUCCESS;
    constructor(public payload: { notifications: Notification[]}) {}
}
  export class OpenNotificationTab implements Action {
    readonly type = OPEN_NOTIFICATION_TAB;
    constructor(public payload?: any) {}
}
export class CloseNotificationTab implements Action {
    readonly type = CLOSE_NOTIFICATION_TAB;
    constructor(public payload?: any) {}
}
export class ToggleNotificationTab implements Action {
  readonly type = TOGGLE_NOTIFICATION_TAB;
  constructor(public payload?: any) {}
}
export class SetUnreadedCount implements Action {
  readonly type = SET_UNREADED_COUNT;
  constructor(public payload?: any) {}
}
export class SetNotificationIcons implements Action {
  readonly type = SET_NOTIFICATION_ICONS;
  constructor() {}
}
export class SetNotificationIconsSuccess implements Action {
  readonly type = SET_NOTIFICATION_ICONS_SUCCESS;
  constructor() {}
}
export class SetNotificationsReaded implements Action {
  readonly type = SET_NOTIFICATIONS_READED;
  constructor(public payload?: Notification[]) {}
}
export class SetNotificationsReadedSuccess implements Action {
  readonly type = SET_NOTIFICATIONS_READED_SUCCESS;
  constructor(public payload: number[]) {}
}

export type All
  = GetNotifications
  | GetNotificationsSuccess
  | IncrementNotificationPageIndex
  | IncrementPageIndex
  | GetNotificationUpdate
  | GetNotificationUpdateSuccess
  | OpenNotificationTab
  | CloseNotificationTab
  | ToggleNotificationTab
  | SetUnreadedCount
  | SetNotificationIcons
  | SetNotificationIconsSuccess
  | SetNotificationsReaded
  | SetNotificationsReadedSuccess;
