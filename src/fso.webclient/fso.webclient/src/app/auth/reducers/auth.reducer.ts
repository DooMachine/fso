
import * as authActions from '../actions/auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {environment } from '../../../environments/environment';

export interface AuthState {
  isLoading: boolean;
  isTokenExpired: boolean;
  isAuthenticated: boolean;
  isUserDataLoaded: boolean;
  userData: any;
}

const initialAuthState: AuthState = {
  isLoading: true,
  isTokenExpired: false,
  isAuthenticated: false,
  isUserDataLoaded: false,
  userData: {
    role:[]
  }
};

export type Action = authActions.All;

export function reducer(state = initialAuthState, action: any): AuthState {
  switch (action.type) {
    case authActions.CALLBACK_AUTHORIZE_SUCCESS_ACTION:
      return {...state, isAuthenticated: action.payload.isAuthenticated, isLoading: false };

    case authActions.CALLBACK_AUTHORIZE_FAIL_ACTION:
      return {...state, isAuthenticated: action.payload.isAuthenticated, isLoading: false };

    case authActions.GET_USER_INFO:
    return {...state, isLoading: true, isUserDataLoaded: false };

    case authActions.GET_USER_INFO_SUCCESS:
    return {...state, userData: action.payload.userData,
       isUserDataLoaded: true, isLoading: false };

    case authActions.CHECK_USER_AUTH_STATE:
      return Object.assign({}, state, action.payload);

    case authActions.CHECK_USER_AUTH_STATE_SUCCESS:
      return Object.assign({}, state, action.payload);

    case authActions.ATTEMPT_LOGOUT:
      return {...state, isLoading: true };

    case authActions.ATTEMPT_LOGOUT_SUCCESS:
    return {...state, isLoading: false, isAuthenticated: action.payload.isAuthenticated };

    default:
      return state;
  }
}

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const selectUserData = createSelector(getAuthState, state => state.userData);
export const selectUserProfileImage = createSelector(selectUserData, state=>environment.userProfileImageTemplate.replace("{#appUserId}",state.sub))
export const selectUserName = createSelector(getAuthState, state => state.userData.nickname);
// TODO: CHANGE THE ROLE
export const selectRoles = createSelector(selectUserData, state=>state.role)
export const selectIsMod = createSelector(selectRoles, state=>state.indexOf("user") > -1);
export const selectUserId = createSelector(getAuthState, state => state.userData.sub);
export const getIsAuthenticated = createSelector(getAuthState, state => state.isAuthenticated);