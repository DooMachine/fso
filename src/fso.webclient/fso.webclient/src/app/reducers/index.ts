import { reducer, AuthState } from '../auth/reducers/auth.reducer';
import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { makeStateKey } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

import { RouterStateUrl } from '../shared/utils';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromLayout from '../core/reducers';

export interface State {
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  auth: AuthState;
}


export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  router: fromRouter.routerReducer,
  auth: reducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: any) {
      if (action.type === 'SET_ROOT_STATE') {
          return action.payload;
      }
      return reducer(state, action);
  };
}
export const NGRX_STATE = makeStateKey('in_state');

export const metaReducers: MetaReducer<State>[] =
 //!environment.production
 //? [logger
 // , storeFreeze,
 // stateSetter
 //]
 //:
 [stateSetter,logger];


/**
* Layout Reducers
*/
export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getShowSidenav = createSelector(
getLayoutState,
fromLayout.getShowSidenav
);
