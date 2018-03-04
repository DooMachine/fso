import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as userActions from '../actions/user';
import {selectUserId } from '../../auth/reducers/auth.reducer';
import { User } from '../models/userinfo';
import { FollowStatus } from '../../shared/models/followStatus.enum';
export interface State  {
    userInfo: User;
    isLoading: boolean;
    showError: boolean;
    error: string;
}

export const initialState: State = {
    userInfo: {
        id: 0,
        appUserId: '',
        currentTab: 0,
        alphaColor: '#FF6872;',
        status: '',
        username: '',
        name: '',
        surname: '',
        profileImageUrl: '',
        followingState: 2,
        currentUserFollowedState: 2,
        followerCount: 0,
        followingCount: 0,
        interestCount: 0,
        totalReputation: 0,
        collectionCount: 0,
    },
    isLoading: false,
    showError: false,
    error: '',
};

  export function reducer(state = initialState, action): State {
    switch (action.type ) {
      case userActions.UserActionTypes.GET_USER:
        return {
         ...state,
         isLoading: true
        };
      case userActions.UserActionTypes.GET_USER_SUCCESS:
        //action.payload.profileImageUrl += '?'+ new Date().getMilliseconds();
        return {
          ...state,
          userInfo: action.payload,
          isLoading: false
        };
      case userActions.UserActionTypes.GET_USER_FAIL:
        return {
        ...state,
        showError: true,
        error: 'Oopss.. an error has occured.',
        isLoading: false
        };
      case userActions.UserActionTypes.FOLLOW_USER:
        return {
         ...state,
         userInfo: {
           ...state.userInfo,
           followerCount: state.userInfo.followerCount + 1,
           followingState: 1,
         }
        };
      case userActions.UserActionTypes.FOLLOW_USER_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          followingState: action.payload.lastFollowState,
        }
       };

      case userActions.UserActionTypes.FOLLOW_USER_FAIL:
        return {
          ...state,
          userInfo: {
            ...state.userInfo,
            followerCount: state.userInfo.followerCount - 1,
            followingState: action.payload.previousFollowState,
          }
        };
      case userActions.UserActionTypes.UNFOLLOW_USER:
        return {
         ...state,
         userInfo: {
           ...state.userInfo,
           followerCount: state.userInfo.followerCount - 1,
           followingState: 2,
         }
        };
      case userActions.UserActionTypes.UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          followingState: action.payload.lastFollowState,
        }
       };

      case userActions.UserActionTypes.UNFOLLOW_USER_FAIL:
        return {
          ...state,
          userInfo: {
            ...state.userInfo,
            followerCount: state.userInfo.followerCount + 1,
            followingState: action.payload.previousFollowState,
          }
        };
      default: {
        return state;
      }
    }
  }
  export const getProfileState = createFeatureSelector<State>('profile');

  export const getUserInfoState = createSelector(getProfileState, state => state['userInfo']);
  
  export const getUserId = createSelector(getUserInfoState,state=>state['userInfo'].appUserId);
  export const getUserAlphaColor = createSelector(getProfileState, state => state['userInfo'].alphaColor);
  export const getIsUserOwner =
   createSelector(selectUserId,getUserId,
  (authUserId,profileUserId) => authUserId == profileUserId )