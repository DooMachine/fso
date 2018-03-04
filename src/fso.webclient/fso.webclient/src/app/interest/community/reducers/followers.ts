
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as interestFollowersActions from '../actions/followers';
import * as fromFeatureRoot from './';
import { UserInfoSmallCard } from '../../../shared/models/user/userSmallCard';
import { FollowStatus } from '../../../shared/models/followStatus.enum';

export interface State extends EntityState<UserInfoSmallCard> {
    pageSize: number;
    pageIndex: number;
    totalPageCount: number;
    totalCount: number;
    isLoading: boolean;
    error: string|null;
    showError: boolean;
    hasNextPage: boolean;
    order: string;
    
}

export const adapter: EntityAdapter<UserInfoSmallCard> = createEntityAdapter<UserInfoSmallCard>({
  selectId: (user: UserInfoSmallCard) => user.username,
  sortComparer: false,
});


export const initialState: State = adapter.getInitialState({
    pageSize: 18,
    pageIndex: 1,
    totalPageCount: 0,
    totalCount: 0,
    isLoading: false,
    error: null,
    showError: false,
    hasNextPage: true,
    order: 'publishDate',
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
        case interestFollowersActions.InterestFollowersActionTypes.GET_INTEREST_FOLLOWERS:
            return {
                ...state,
                isLoading: true,
                pageIndex: state.pageIndex,
            };
        case interestFollowersActions.InterestFollowersActionTypes.GET_INTEREST_FOLLOWERS_SUCCESS:
            if(action.payload == null){
                return {...state,hasNextPage:false, isLoading:false};
            }
            return {
                ...adapter.addMany(action.payload.entities, state),
                totalPageCount: action.payload.totalPageCount,
                totalCount: action.payload.totalCount,
                hasNextPage: action.payload.hasNextPage,
                isLoading: false
            };
        case interestFollowersActions.InterestFollowersActionTypes.GET_INTEREST_FOLLOWERS_FAIL:
            return {
                ...state,
                isLoading: false,
                showError: true,
                pageIndex: state.pageIndex,
            };
        case interestFollowersActions.InterestFollowersActionTypes.FOLLOW_USER:{
            return adapter.updateOne({id: action.payload.username,
                changes: { followState:FollowStatus.Confirmed }},
                state);
            }
        case interestFollowersActions.InterestFollowersActionTypes.FOLLOW_USER_SUCCESS:{
            return adapter.updateOne({id: action.payload.username,
                changes: { followState:action.payload.lastFollowState}},
                state);        
            }
        case interestFollowersActions.InterestFollowersActionTypes.FOLLOW_USER_FAIL:{
            return adapter.updateOne({id: action.payload.username,
                changes:  {followState:FollowStatus.Unfollowed}},
                state);
            }
        case interestFollowersActions.InterestFollowersActionTypes.UNFOLLOW_USER:{
            return adapter.updateOne({id: action.payload.username,
                changes:  {followState:FollowStatus.Confirmed}},
                state);
            }
        case interestFollowersActions.InterestFollowersActionTypes.UNFOLLOW_USER_SUCCESS:{
            return adapter.updateOne({id: action.payload.username,
                changes: {followState:action.payload.lastFollowState}},
                state);        
            }
        case interestFollowersActions.InterestFollowersActionTypes.UNFOLLOW_USER_FAIL:{
            return adapter.updateOne({id: action.payload.username,
                changes: {followState:FollowStatus.Confirmed}},
                state);
            }
        default:
        return state;
    }
  }

  export const getFeatureState = createFeatureSelector<fromFeatureRoot.State>('community');
  export const getInterestFollowersState = createSelector(getFeatureState, state=>state.followers)
  export const selectIsLoading = createSelector(getInterestFollowersState,state=>state.isLoading);
  export const selectHasNextPage = createSelector(getInterestFollowersState,state=>state.hasNextPage);
  export const {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal,
    } = adapter.getSelectors(getInterestFollowersState);