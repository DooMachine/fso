
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { UserInfoSmallCard } from '../../../shared/models/user/userSmallCard';
import * as followingActions from '../actions/following';
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
    pageSize: 8,
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
        case followingActions.FollowingActionTypes.GET_FOLLOWINGS:
            return {
                ...state,
                isLoading: true,
                pageIndex: state.pageIndex,
            };
        case followingActions.FollowingActionTypes.GET_FOLLOWINGS_SUCCESS:
            return {
                ...adapter.addMany(action.payload.entities, state),
                totalPage: action.payload.totalPage,
                totalCount: action.payload.totalCount,
                hasNextPage: action.payload.hasNextPage,
                isLoading: false
            };
        case followingActions.FollowingActionTypes.GET_FOLLOWINGS_FAIL:
            return {
                ...state,
                isLoading: false,
                showError: true,
                pageIndex: state.pageIndex,
            };
        case followingActions.FollowingActionTypes.FOLLOW_USER:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState:1 }},
            state);
        case followingActions.FollowingActionTypes.FOLLOW_USER_SUCCESS:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: action.payload.lastFollowState }},
            state);
        case followingActions.FollowingActionTypes.FOLLOW_USER_FAIL:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: action.payload.previousFollowState }},
            state);
        case followingActions.FollowingActionTypes.UNFOLLOW_USER:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: 2 }},
            state);
        case followingActions.FollowingActionTypes.UNFOLLOW_USER_SUCCESS:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: action.payload.lastFollowState }},
            state);
        case followingActions.FollowingActionTypes.UNFOLLOW_USER_FAIL:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: action.payload.previousFollowState }},
            state);
        case followingActions.FollowingActionTypes.OPEN_MODAL:
            return {
                ...state,
                isModalOpen:true
            };
        case followingActions.FollowingActionTypes.CLOSE_MODAL:
            return {
                ...state,
                isModalOpen: false
            };
        case followingActions.FollowingActionTypes.LOAD_MORE_FOLLOWING:
            return {
                ...state,
                isLoading: true,
                pageIndex: state.pageIndex + 1,
            };
        case followingActions.FollowingActionTypes.LOAD_MORE_FOLLOWING_SUCCESS:
            return {
                ...adapter.addMany(action.payload.entities, state),
                totalPage: action.payload.totalPage,
                totalCount: action.payload.totalCount,
                hasNextPage: action.payload.hasNextPage,
                isLoading: false
            };
        case followingActions.FollowingActionTypes.LOAD_MORE_FOLLOWING_FAIL:
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

  export const getUserFollowingsState = createFeatureSelector<State>('userfollowings');
  export const getFollowingsState = createSelector(getUserFollowingsState, state => state['followings']);
  export const selectIsModalOpen = createSelector(getFollowingsState, state=> state.isModalOpen)
  export const selectHasNextPage = createSelector(getFollowingsState, state=> state.hasNextPage)
  export const selectIsLoading = createSelector(getFollowingsState,state=> state.isLoading);
  export const selectTotalCount = createSelector(getFollowingsState, state=> state.totalCount);
  export const {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal,
    } = adapter.getSelectors(getFollowingsState);