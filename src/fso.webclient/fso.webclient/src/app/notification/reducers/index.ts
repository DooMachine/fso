
import { createFeatureSelector , createSelector} from '@ngrx/store';
import * as NotificationActions from '../actions';
import { Notification, NotificationType } from '../models';
import { NotificationIconHandler } from '../utils/notificaion.utils';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface NotificationState extends EntityState<Notification> {
    updateInterval: number;
    isMenuOpen: boolean;
    isLoading: boolean;
    isFetching: boolean;
    pageIndex: number;
    pageSize: number;
    isMoreNotifications: boolean;    
    isFirstLoaded:boolean;
  }
  export const adapter: EntityAdapter<Notification> = createEntityAdapter<Notification>({
    selectId: (comment: Notification) => comment.id,
    sortComparer: sortDescendingById,
  });
  
  export function sortDescendingById(a: Notification, b: Notification): number {
      return b.id - a.id;
  }
  
  export const initialState: NotificationState = adapter.getInitialState({
    updateInterval: 18000,
    isMenuOpen: false,
    isLoading: true,
    isFetching: false,
    pageIndex: 1,
    pageSize: 9,
    isMoreNotifications: false,
    isFirstLoaded:false
  });
  
export type Action = NotificationActions.All;
/// Reducer function
export function reducer(state: NotificationState = initialState, action: Action): NotificationState {
  switch (action.type) {
    case NotificationActions.GET_NOTIFICATIONS:
      return { ...state, isLoading: true,
         isMoreNotifications: false, isFetching: true };
    case NotificationActions.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...adapter.addMany(action.payload.notifications,state),
        isLoading: false,
        isFetching: false,
        isFirstLoaded:true,
        isMoreNotifications: action.payload.isMoreNotifications
        };
    
    case NotificationActions.INCREMENT_PAGEINDEX:
        return {
          ...state,
          pageIndex: state.pageIndex + 1,
          };
    case NotificationActions.GET_NOTIFICATION_UPDATE:
        return {
        ...state,
        isFetching: true
        };
    case NotificationActions.GET_NOTIFICATION_UPDATE_SUCCESS:
        return {
        isFetching: false,
        ...adapter.addMany(action.payload.notifications,state)
        };
    case NotificationActions.OPEN_NOTIFICATION_TAB:
        return {
        ...state,
        isMenuOpen: true
        };
    case NotificationActions.CLOSE_NOTIFICATION_TAB:
        return {
        ...state,
        isMenuOpen: false
        };
      case NotificationActions.TOGGLE_NOTIFICATION_TAB:
        return {
        ...state,
        isMenuOpen: !(state.isMenuOpen)
        };
      case NotificationActions.SET_NOTIFICATION_ICONS:
        return {
        ...state,
        };
      case NotificationActions.SET_NOTIFICATION_ICONS_SUCCESS:
      let pn = [];
      const preNot = Object.entries(state.entities).forEach(
        ([key, value]) => pn.push(value)
      );
        return {
        ...adapter.updateMany(NotificationIconHandler(pn),state)
        };
      case NotificationActions.SET_NOTIFICATIONS_READED:
        return {
        ...state,        
        };
      case NotificationActions.SET_NOTIFICATIONS_READED_SUCCESS:{
      let pn = [];
      const preNot = Object.entries(state.entities).forEach(
        ([key, value]) =>{
           if(action.payload.includes(parseInt(key))){
            pn.push({id:parseInt(key),changes:{isSeen:true}})
          }
        }
      );
      return adapter.updateMany(pn,state)
      };
    default:
      return state;
  }
}
export const getNotificationState = createFeatureSelector<NotificationState>('notification');
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getNotificationState);

export const selectUnreadedCount = createSelector(selectAll, state=> state.filter(f=>f.isSeen == false).length);