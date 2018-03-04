
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { UserInfoSmallCard } from '../../shared/models/user/userSmallCard';
import * as userRecActions from '../actions/userrecommendation';
import { FollowStatus } from '../../shared/models/followStatus.enum';
import { State as HomeState } from './';


export interface State extends EntityState<UserInfoSmallCard> {
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
    pageSize: 3,
    pageIndex: 1,
    totalPage: 0,
    totalCount: 0,
    isLoading: false,
    error: 'An error occured...',
    showError: false,
    hasNextPage: true,
    order: 'none'
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
        case userRecActions.UserRecommendationActionTypes.GET_USER_RECOMMENDATIONS:
            return {
                ...state,
                isLoading: true,
                pageIndex: state.pageIndex,
            };
        case userRecActions.UserRecommendationActionTypes.GET_USER_RECOMMENDATIONS_SUCCESS:
            if(action.payload==null){
                return {...state,isLoading:false,hasNextPage:false};
            }
            return {
                ...adapter.addMany(action.payload.entities, state),
                totalPage: action.payload.totalPage,
                totalCount: action.payload.totalCount,
                hasNextPage: action.payload.hasNextPage,
                pageIndex:action.payload.pageIndex,
                pageSize:action.payload.pageSize,
                isLoading: false
            };
        case userRecActions.UserRecommendationActionTypes.GET_USER_RECOMMENDATIONS_FAIL:
            return {
                ...state,
                isLoading: false,
                showError: true,
                pageIndex: state.pageIndex,
            };
        case userRecActions.UserRecommendationActionTypes.FOLLOW_USER:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState:1 }},
            state);
        case userRecActions.UserRecommendationActionTypes.FOLLOW_USER_SUCCESS:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: action.payload.lastFollowState }},
            state);
        case userRecActions.UserRecommendationActionTypes.FOLLOW_USER_FAIL:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: action.payload.previousFollowState }},
            state);
        case userRecActions.UserRecommendationActionTypes.UNFOLLOW_USER:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: 2 }},
            state);
        case userRecActions.UserRecommendationActionTypes.UNFOLLOW_USER_SUCCESS:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: action.payload.lastFollowState }},
            state);
        case userRecActions.UserRecommendationActionTypes.UNFOLLOW_USER_FAIL:
        return adapter.updateOne({id: action.payload.username,
            changes: { followState: action.payload.previousFollowState }},
            state);
        case userRecActions.UserRecommendationActionTypes.LOAD_MORE_FOLLOWING:
            return {
                ...state,
                isLoading: true,
                pageIndex: state.pageIndex + 1,
            };
        case userRecActions.UserRecommendationActionTypes.LOAD_MORE_FOLLOWING_SUCCESS:
            if(action.payload==null){
                return {...state,isLoading:false,hasNextPage:false}
            }
            return {
                ...adapter.addMany(action.payload.entities, state),
                totalPage: action.payload.totalPage,
                totalCount: action.payload.totalCount,
                hasNextPage: action.payload.hasNextPage,
                isLoading: false
            };
        case userRecActions.UserRecommendationActionTypes.LOAD_MORE_FOLLOWING_FAIL:
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

  export const getFeatureState = createFeatureSelector<HomeState>('home');
  export const getUserRecommendationState = createSelector(getFeatureState, state => state.userrecommendation);
  export const getLoading = createSelector(getUserRecommendationState, state=>state.isLoading);
  export const selectHasNextPage = createSelector(getUserRecommendationState, state=> state.hasNextPage)
  export const selectIsLoading = createSelector(getUserRecommendationState,state=> state.isLoading);
  export const {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal,
    } = adapter.getSelectors(getUserRecommendationState);
    
export const isEmpty = createSelector(
    selectTotal,
    getLoading,
    (total, isLoading) => {
        return !isLoading && total ===0
    }
    );