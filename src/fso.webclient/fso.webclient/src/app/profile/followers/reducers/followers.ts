
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfoSmallCard } from '../../../shared/models/user/userSmallCard';
import * as followerActions from '../actions/followers';
import { FollowStatus } from '../../../shared/models/followStatus.enum';


export interface State extends EntityState<UserInfoSmallCard> {
    isModalOpen: boolean;
    pageSize: number;
    pageIndex: number;
    totalPage: number;
    totalCount: number;
    isLoading: boolean;
    error: string;
    showError: boolean;
    hasNextPage: boolean;
    order: string;
}

export const adapter: EntityAdapter<UserInfoSmallCard> = createEntityAdapter<UserInfoSmallCard>({
    selectId: (userInfoCard: UserInfoSmallCard) => userInfoCard.username,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    isModalOpen: false,
    pageSize: 42,
    pageIndex: 1,
    totalPage: 0,
    totalCount: 0,
    isLoading: false,
    error: 'An error occured...',
    showError: false,
    hasNextPage: true,
    order: 'reputation'
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
        case followerActions.FollowerActionTypes.GET_FOLLOWERS:
            return {
                ...state,
                isLoading: true,
                pageIndex: state.pageIndex,
            };
        case followerActions.FollowerActionTypes.GET_FOLLOWERS_SUCCESS:
            return {
                ...adapter.addAll(action.payload.entities, state),
                totalPage: action.payload.totalPage,
                totalCount: action.payload.totalCount,
                hasNextPage: action.payload.hasNextPage,
                isLoading: false
            };
        case followerActions.FollowerActionTypes.GET_FOLLOWERS_FAIL:
            return {
                ...state,
                isLoading: false,
                showError: true,
                pageIndex: state.pageIndex,
            };
        case followerActions.FollowerActionTypes.FOLLOW_USER:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: 0 }},
            state);
        case followerActions.FollowerActionTypes.FOLLOW_USER_SUCCESS:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: action.payload.lastFollowState }},
            state);
        case followerActions.FollowerActionTypes.FOLLOW_USER_FAIL:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: action.payload.previousFollowState }},
            state);
        case followerActions.FollowerActionTypes.UNFOLLOW_USER:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: 2 }},
            state);
        case followerActions.FollowerActionTypes.UNFOLLOW_USER_SUCCESS:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: action.payload.lastFollowState }},
            state);
        case followerActions.FollowerActionTypes.UNFOLLOW_USER_FAIL:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: action.payload.previousFollowState }},
            state);
        case followerActions.FollowerActionTypes.OPEN_MODAL:
            return {
                ...state,
                isModalOpen:true
            };
        case followerActions.FollowerActionTypes.CLOSE_MODAL:
            return {
                ...state,
                isModalOpen: false
            };
        case followerActions.FollowerActionTypes.LOAD_MORE_FOLLOWER:
            return {
                ...state,
                isLoading: true,
                pageIndex: state.pageIndex + 1,
            };
        case followerActions.FollowerActionTypes.LOAD_MORE_FOLLOWER_SUCCESS:
            return {
                ...adapter.addMany(action.payload.entities, state),
                totalPage: action.payload.totalPage,
                totalCount: action.payload.totalCount,
                hasNextPage: action.payload.hasNextPage,
                isLoading: false
            };
        case followerActions.FollowerActionTypes.LOAD_MORE_FOLLOWER_FAIL:
            return {
                ...state,
                isLoading: false,
                showError: true,
                pageIndex: state.pageIndex - 1,
            };
      default: {
        return state;
      }
    }
  }
  
  export const getUserFollowersState = createFeatureSelector<State>('userfollowers');
  export const getFollowersState = createSelector(getUserFollowersState, state => state['followers']);
  export const selectIsModalOpen = createSelector(getFollowersState, state=> state.isModalOpen)
  export const selectHasNextPage = createSelector(getFollowersState, state=> state.hasNextPage)
  export const selectIsLoading = createSelector(getFollowersState,state=> state.isLoading);
  export const selectTotalCount = createSelector(getFollowersState, state=> state.totalCount);
  export const {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal,
    } = adapter.getSelectors(getFollowersState);