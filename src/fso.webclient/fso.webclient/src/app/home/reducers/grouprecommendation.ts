import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromInterestActions from '../actions/grouprecommendation';
import { State as HomeState} from './';
import { InterestCard } from '../../shared/models/interest/interestcard';

export interface State extends EntityState<InterestCard> {
    pageSize: number;
    pageIndex: number;
    totalPage: number;
    totalCount: number;
    isLoading: boolean;
    error: string | null;
    showError: boolean;
    hasNextPage: boolean;
    order: string;
}

export const adapter: EntityAdapter<InterestCard> = createEntityAdapter<InterestCard>({
  selectId: (interest: InterestCard) => interest.id,
  sortComparer: false
});
export const initialState: State = adapter.getInitialState({
    pageSize: 3,
    pageIndex: 1,
    totalPage: 0,
    totalCount: 0,
    isLoading: false,
    error: null,
    showError: false,
    hasNextPage: true,
    order: 'followerCount',
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
      case fromInterestActions.GroupRecommendationActionTypes.GET_GROUP_RECOMMENDATIONS:
        return{
          ...state,
          isLoading: true,
          pageIndex: state.pageIndex + 1,
        };
      case fromInterestActions.GroupRecommendationActionTypes.GET_GROUP_RECOMMENDATIONS_SUCCESS:
      if(action.payload==null){
        return {...state,isLoading:false,hasNextPage:false};
      }
        return{
          ...adapter.addMany(action.payload.entities, state),
          isLoading: false,
          totalPage: action.payload.totalPage,
          totalCount: action.payload.totalCount,
          hasNextPage: action.payload.hasNextPage,
          pageIndex:action.payload.pageIndex,
          pageSize:action.payload.pageSize
        };
      case fromInterestActions.GroupRecommendationActionTypes.GET_GROUP_RECOMMENDATIONS_FAIL:
        return{
          ...state,
          isLoading: false,
          showError: true,
          error: action.payload.error,
        };
      case fromInterestActions.GroupRecommendationActionTypes.FOLLOW_INTERESTS:
        return adapter.updateOne({id: action.payload.id,
          changes: { isCurrentUserFollowing: true }},
          state);
      case fromInterestActions.GroupRecommendationActionTypes.FOLLOW_INTERESTS_SUCCESS:

        return adapter.updateOne({id: action.payload.id,
          changes: { isCurrentUserFollowing: action.payload.followState === 0 }},
          state);

      case fromInterestActions.GroupRecommendationActionTypes.FOLLOW_INTERESTS_FAIL:
        return adapter.updateOne({id: action.payload.id,
          changes: { isCurrentUserFollowing: action.payload.followState === 0 }},
          state);
        case fromInterestActions.GroupRecommendationActionTypes.UNFOLLOW_INTERESTS:
          return adapter.updateOne({id: action.payload.id,
            changes: { isCurrentUserFollowing: false }},
            state);
        case fromInterestActions.GroupRecommendationActionTypes.UNFOLLOW_INTERESTS_SUCCESS:
          return adapter.updateOne({id: action.payload.id,
            changes: { isCurrentUserFollowing: action.payload.followState === 0 }},
            state);
        case fromInterestActions.GroupRecommendationActionTypes.UNFOLLOW_INTERESTS_FAIL:
          return adapter.updateOne({id: action.payload.id,
            changes: {  isCurrentUserFollowing: action.payload.followState === 0 }},
            state);
      default: {
        return state;
      }
    }
  }


  export const getHomeState = createFeatureSelector<HomeState>('home');
  export const getGroupRecState = createSelector(getHomeState, state => state.grouprecommendation);
  export const getLoading = createSelector(getGroupRecState, state=>state.isLoading);
  export const selectHasNextPage = createSelector(getGroupRecState,state=>state.hasNextPage);
  export const {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal,
    } = adapter.getSelectors(getGroupRecState);

    export const isEmpty = createSelector(
      selectTotal,
      getLoading,
      (total, isLoading) => {
        return !isLoading && total ===0
      }
    );