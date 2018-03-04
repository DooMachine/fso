
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Collection } from '../../shared/models/collection/collection';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActivity, UserActivityType } from '../../shared/models/user/userActivity';
import * as userActivityActions from '../actions/activityfeed';
import { FeedType } from '../../feed/feed-type.enum';
import { State as HomeState } from './';


export interface State extends EntityState<UserActivity> {
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

export const adapter: EntityAdapter<UserActivity> = createEntityAdapter<UserActivity>({
  selectId: (userActivity: UserActivity) => userActivity.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    pageSize: 6,
    pageIndex: 0,
    totalPage: 0,
    totalCount: 0,
    isLoading: false,
    error: 'An error occured',
    showError: false,
    hasNextPage: true,
    order: 'chronological'
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
      case userActivityActions.ActivityFeedActionTypes.GET_FEED:
        return {
          ...state,
          isLoading: true,
          pageIndex: state.pageIndex+1,
        };
      case userActivityActions.ActivityFeedActionTypes.GET_FEED_SUCCESS:
      if(action.payload==null){
        return {...state,isLoading:false,hasNextPage:false};
      }
        return {
          ...adapter.addMany(action.payload.entities, state),
          pageIndex: action.payload.pageIndex,
          pageSize: action.payload.pageSize,
          hasNextPage: action.payload.hasNextPage,
          totalPage: action.payload.totalPage,
          totalCount: action.payload.totalCount,
          isLoading: false,
        };
        case userActivityActions.ActivityFeedActionTypes.GET_FEED_FAIL:
          return {
            ...state,
            isLoading: false,
          };
      case userActivityActions.ActivityFeedActionTypes.LIKE_POST:
        let original;
        const isPrimary = state.entities[action.payload.activityId].feedType == UserActivityType.Add_New_Post;
        if(isPrimary){
          original = state.entities[action.payload.activityId].primaryEntity;
          let next = Object.assign({},original,{isCurrentUserLiked:true, likeCount:original.likeCount + 1})
          return adapter.updateOne({id: action.payload.activityId,
            changes: { primaryEntity: next }},
            state);
        }else{          
          original = state.entities[action.payload.activityId].parentEntity;
          let next = Object.assign({},original,{isCurrentUserLiked:true, likeCount:original.likeCount + 1})
          return adapter.updateOne({id: action.payload.activityId,
            changes: { parentEntity: next }},
            state);
        }
        

      case userActivityActions.ActivityFeedActionTypes.LIKE_POST_SUCCESS:
        let perevsPost;
        const isPrimaryAct = state.entities[action.payload.activityId].feedType == UserActivityType.Add_New_Post;
        if(isPrimaryAct){
          perevsPost = state.entities[action.payload.activityId].primaryEntity;
          let next = Object.assign({}, perevsPost, { isCurrentUserLiked:action.payload.isLiked })
          console.log(next);
          return adapter.updateOne({id: action.payload.activityId,
            changes: { primaryEntity: next }},
            state);
        }else{          
          perevsPost = state.entities[action.payload.activityId].parentEntity;
          let next = Object.assign({},perevsPost, {isCurrentUserLiked:action.payload.isLiked})
          return adapter.updateOne({id: action.payload.activityId,
            changes: { parentEntity: next }},
            state);
        }
        

      case userActivityActions.ActivityFeedActionTypes.LIKE_POST_FAIL:
       
        let prevs = state.entities[action.payload.activityId].parentEntity;
        let isPrim = prevs===null || prevs === undefined;
        if(isPrim){
          prevs = state.entities[action.payload.activityId].primaryEntity
          const next = Object.assign({},prevs, {isCurrentUserLiked:action.payload.isLiked});
          return adapter.updateOne({id: action.payload.activityId,
            changes: { primaryEntity: next }},
            state);
        }
        const next = Object.assign({},prevs, {isCurrentUserLiked:action.payload.isLiked});
        return adapter.updateOne({id: action.payload.activityId,
          changes: { parentEntity: next }},
          state);

      case userActivityActions.ActivityFeedActionTypes.UNLIKE_POST:{
        let prU = state.entities[action.payload.activityId].parentEntity;
        const isprimary = prU === null || prU === undefined;
        if(isprimary){
          prU = state.entities[action.payload.activityId].primaryEntity;
        }
        let next = Object.assign({},prU, {isCurrentUserLiked:false});
        if(isprimary){
          return adapter.updateOne({id: action.payload.activityId,
            changes: { primaryEntity: next }},
            state);
        }
        return adapter.updateOne({id: action.payload.activityId,
          changes: { parentEntity: next }},
          state);
        }
      case userActivityActions.ActivityFeedActionTypes.UNLIKE_POST_SUCCESS:{
        let prUs = state.entities[action.payload.activityId].parentEntity;
          const isprimarys = prUs ===null || prUs === undefined;
          if(isprimarys){
            prUs = state.entities[action.payload.activityId].primaryEntity;
          }
          let next = Object.assign({},prUs, {isCurrentUserLiked:action.payload.isLiked});
          if(isprimarys){
            return adapter.updateOne({id: action.payload.activityId,
              changes: { primaryEntity: next }},
              state);
          }
          return adapter.updateOne({id: action.payload.activityId,
            changes: { parentEntity: next }},
            state);
          }
      case userActivityActions.ActivityFeedActionTypes.UNLIKE_POST_FAIL:{
        let prUsq = state.entities[action.payload.activityId].parentEntity;
        const isprimarysq = prUsq ===null || prUsq === undefined;
        if(isprimarysq){
          prUsq = state.entities[action.payload.activityId].primaryEntity;
        }
        let next =Object.assign({},prUsq, {isCurrentUserLiked:true});
        if(isprimarysq){
          return adapter.updateOne({id: action.payload.activityId,
            changes: { primaryEntity: next }},
            state);
        }
        return adapter.updateOne({id: action.payload.activityId,
          changes: { parentEntity: next }},
          state);
        }
      case userActivityActions.ActivityFeedActionTypes.LIKE_REVIEW:{
        const originalRev = state.entities[action.payload.activityId].primaryEntity;
        
        let next =Object.assign({}, originalRev, {likeStatus:0});
        return adapter.updateOne({id: action.payload.activityId,
          changes: { primaryEntity: next }},
          state);
        }
      case userActivityActions.ActivityFeedActionTypes.LIKE_REVIEW_SUCCESS:{
        const originalRev2 = state.entities[action.payload.activityId].primaryEntity;
        let next =Object.assign({}, originalRev2, {likeStatus:action.payload.likeStatus});
        return adapter.updateOne({id: action.payload.activityId,
          changes: { primaryEntity: next }},
          state);
        }
      case userActivityActions.ActivityFeedActionTypes.LIKE_REVIEW_FAIL:{
        const originalRev3 = state.entities[action.payload.activityId].primaryEntity;
        let next =Object.assign({}, originalRev3, {likeStatus:action.payload.likeStatus});
        return adapter.updateOne({id: action.payload.activityId,
          changes: { primaryEntity: next }},
          state);
        }
      case userActivityActions.ActivityFeedActionTypes.UNLIKE_REVIEW:{
        const originalRevs = state.entities[action.payload.activityId].primaryEntity;
        let next =Object.assign({}, originalRevs, {likeStatus:2});
        return adapter.updateOne({id: action.payload.activityId,
          changes: { primaryEntity: next }},
        state);
      }
      case userActivityActions.ActivityFeedActionTypes.UNLIKE_REVIEW_SUCCESS:{
        const originalRevs2 = state.entities[action.payload.activityId].primaryEntity;
        let next =Object.assign({}, originalRevs2, {likeStatus:action.payload.likeStatus});
        return adapter.updateOne({id: action.payload.activityId,
          changes: { primaryEntity: next }},
          state);
        }
      case userActivityActions.ActivityFeedActionTypes.UNLIKE_REVIEW_FAIL:{
        const originalRevs3 = state.entities[action.payload.activityId].primaryEntity;
        let next =Object.assign({}, originalRevs3, {likeStatus:action.payload.likeStatus});
        return adapter.updateOne({id: action.payload.activityId,
          changes: { primaryEntity: next }},
          state);
        }
      case userActivityActions.ActivityFeedActionTypes.DISLIKE_REVIEW:{
        const originalRevsa = state.entities[action.payload.activityId].primaryEntity;
        let next =Object.assign({}, originalRevsa, {likeStatus:1});
        return adapter.updateOne({id: action.payload.activityId,
          changes: { primaryEntity: next }},
        state);
      }
      case userActivityActions.ActivityFeedActionTypes.DISLIKE_REVIEW_SUCCESS:{
        const originalRevsa2 = state.entities[action.payload.activityId].primaryEntity;
        let next =Object.assign({}, originalRevsa2, {likeStatus:action.payload.likeStatus});
        return adapter.updateOne({id: action.payload.activityId,
          changes: { primaryEntity: next }},
          state);
        }
      case userActivityActions.ActivityFeedActionTypes.DISLIKE_REVIEW_FAIL:{
        const originalRevsa3 = state.entities[action.payload.activityId].primaryEntity;
        let next =Object.assign({}, originalRevsa3, {likeStatus:action.payload.likeStatus});
        return adapter.updateOne({id: action.payload.activityId,
          changes: { primaryEntity: originalRevsa3 }},
          state);
        }
      case userActivityActions.ActivityFeedActionTypes.UNDISLIKE_REVIEW:{
        const originalRevsaq = state.entities[action.payload.activityId].primaryEntity;
        let next =Object.assign({}, originalRevsaq, {likeStatus:2});
        return adapter.updateOne({id: action.payload.activityId,
          changes: { primaryEntity: next }},
        state);
      }
      case userActivityActions.ActivityFeedActionTypes.UNDISLIKE_REVIEW_SUCCESS:{
        const originalRevsaq2 = state.entities[action.payload.activityId].primaryEntity;
        let next =Object.assign({}, originalRevsaq2, {likeStatus:action.payload.likeStatus});
        return adapter.updateOne({id: action.payload.activityId,
          changes: { primaryEntity: next }},
          state);
        }
      case userActivityActions.ActivityFeedActionTypes.DISLIKE_REVIEW_FAIL:{
        const originalRevsaq3 = state.entities[action.payload.activityId].primaryEntity;
        
        let next =Object.assign({}, originalRevsaq3, {likeStatus:action.payload.likeStatus});
        return adapter.updateOne({id: action.payload.activityId,
          changes: { primaryEntity: next }},
          state);
        }
      default: {
        return state;
      }
    }
  }

  export const getHomeState = createFeatureSelector<HomeState>('home');
  export const getActivityState = createSelector(getHomeState, state => state.activityFeed);
  export const getLoading = createSelector(getActivityState, state=> state.isLoading);
  export const selectHasNextPage = createSelector(getActivityState, state=> state.hasNextPage);
  export const {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal,
    } = adapter.getSelectors(getActivityState);

    export const isEmpty = createSelector(
      selectTotal,
      getLoading,
      (total, isLoading) => {
        return !isLoading && total === 0
      }
    );