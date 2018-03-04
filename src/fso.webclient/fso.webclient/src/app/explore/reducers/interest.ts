import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromInterestActions from '../actions/interest';
import { InterestCard } from '../../shared/models/interest/interestcard';
import { State as ExploreState } from './';

export interface State extends EntityState<InterestCard> {
    pageSize: number;
    pageIndex: number;
    totalPage: number;
    totalCount: number;
    isLoading: boolean;
    error: string;
    showError: boolean;
    hasNextPage: boolean;
    order: string;
    langCode:string;
}

export const adapter: EntityAdapter<InterestCard> = createEntityAdapter<InterestCard>({
  selectId: (interest: InterestCard) => interest.id,
  sortComparer: false
});
export const initialState: State = adapter.getInitialState({
    langCode: 'WW',
    pageSize: 8,
    pageIndex: 0,
    totalPage: 0,
    totalCount: 0,
    isLoading: false,
    error: '',
    showError: false,
    hasNextPage: false,
    order: 'followerCount',
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
      case fromInterestActions.InterestActionTypes.GET_INTERESTS:
        return{
          ...state,
          isLoading: true,
          pageIndex: state.pageIndex + 1,
        };
      case fromInterestActions.InterestActionTypes.GET_INTERESTS_SUCCESS:
      if(action.payload==null){
        return {...state, isLoading:false, hasNextPage:false}
      }
        return{
          ...adapter.addMany(action.payload.entities, state),
          isLoading: false,
          totalPage: action.payload.totalPage,
          totalCount: action.payload.totalCount,
          hasNextPage: action.payload.hasNextPage,
        };
      case fromInterestActions.InterestActionTypes.GET_INTERESTS_FAIL:
        return{
          ...state,
          isLoading: false,
          showError: true,
          hasNextPage:false,
          error: action.payload.error,
        };
      case fromInterestActions.InterestActionTypes.FOLLOW_INTERESTS:
        return adapter.updateOne({id: action.payload.id,
          changes: { isCurrentUserFollowing: true }},
          state);
      case fromInterestActions.InterestActionTypes.FOLLOW_INTERESTS_SUCCESS:

        return adapter.updateOne({id: action.payload.id,
          changes: { isCurrentUserFollowing: action.payload.followState === 0 }},
          state);

      case fromInterestActions.InterestActionTypes.FOLLOW_INTERESTS_FAIL:
        return adapter.updateOne({id: action.payload.id,
          changes: { isCurrentUserFollowing: action.payload.followState === 0 }},
          state);
        case fromInterestActions.InterestActionTypes.UNFOLLOW_INTERESTS:
          return adapter.updateOne({id: action.payload.id,
            changes: { isCurrentUserFollowing: false }},
            state);
        case fromInterestActions.InterestActionTypes.UNFOLLOW_INTERESTS_SUCCESS:
          return adapter.updateOne({id: action.payload.id,
            changes: { isCurrentUserFollowing: action.payload.followState === 0 }},
            state);
        case fromInterestActions.InterestActionTypes.UNFOLLOW_INTERESTS_FAIL:
          return adapter.updateOne({id: action.payload.id,
            changes: {  isCurrentUserFollowing: action.payload.followState === 0 }},
            state);
      default: {
        return state;
      }
    }
  }


  export const getExploreState = createFeatureSelector<ExploreState>('explore');
  export const getInterestState = createSelector(getExploreState, state => state.interests);
  export const getLoading = createSelector(getInterestState, state=>state.isLoading);
  export const selectHasNextPage =createSelector(getInterestState,state=>state.hasNextPage);

  export const {
      selectIds,
      selectEntities,
      selectAll: selectAllExploreInterests,
      selectTotal,
    } = adapter.getSelectors(getInterestState);

    export const isEmpty = createSelector(
      selectTotal,
      getLoading,
      (total, isLoading) => {
        return !isLoading && total ===0
      }
    );