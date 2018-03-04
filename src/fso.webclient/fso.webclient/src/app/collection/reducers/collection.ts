import * as fromCollectionActions from  '../actions/collection';
import { UserInfoSmallCard } from "../../shared/models/user/userSmallCard";
import { CollectionCard } from "../../shared/models/collection/collectioncard";
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromCollectionRoot from './';


export interface CollectionState {
    id:number;
    urlkey:string;
    description:string;
    name:string;
    dateUtcPublished:string;
    authorInfo:UserInfoSmallCard;
    averageRating:number;
    postsCount:number;
    thumbImageUrl:string;
    dateUtcModified:string;
};
export interface State{
    isLoading:boolean;
    error: null | string;
    collection:CollectionState;    
}

const initialState: State = {
    isLoading:false,    
    error:null,
    collection:{
        id:0,
        urlkey:'',
        description:'',
        thumbImageUrl:'',
        dateUtcModified:'',
        name:'',
        dateUtcPublished:'',
        authorInfo:{
            id:0,
            appUserId: '',
            username:  '',
            profileImage:  '',
            reputation: 0,
            status: '',
            followState: 2,
        },
        averageRating:0,
        postsCount:0,
    }
    
};

export function reducer(state = initialState, action: fromCollectionActions.CollectionActions ): State {
    switch (action.type) {
        case fromCollectionActions.CollectionActionTypes.GET_COLLECTION: {
            return {
                ...state,
                isLoading:true
            };
        }
        case fromCollectionActions.CollectionActionTypes.GET_COLLECTION_SUCCESS: {
            return {
                ...state,
                isLoading:false,
                collection: action.payload,
            };
        }
        case fromCollectionActions.CollectionActionTypes.GET_COLLECTION_FAIL: {
            return {
                ...state,
                error:action.payload
            };
        }
        case fromCollectionActions.CollectionActionTypes.FOLLOW_USER:
            return {
            ...state,
                collection: {
                ...state.collection,
                    authorInfo:{
                        ...state.collection.authorInfo,
                        followState:1
                    }
                }
            };
      case fromCollectionActions.CollectionActionTypes.FOLLOW_USER_SUCCESS:
        return {
            ...state,
                collection: {
                ...state.collection,
                    authorInfo:{
                        ...state.collection.authorInfo,
                        followState:action.payload.lastFollowState
                    }
                }
        }
      case fromCollectionActions.CollectionActionTypes.FOLLOW_USER_FAIL:
      return {
        ...state,
        collection: {
          ...state.collection,
          authorInfo:{
              ...state.collection.authorInfo,
              followState:action.payload.previousFollowState
          }
        }
    }
      case fromCollectionActions.CollectionActionTypes.UNFOLLOW_USER:
      return {
        ...state,
        collection: {
          ...state.collection,
          authorInfo:{
              ...state.collection.authorInfo,
              followState:2
          }
        }
    }
      case fromCollectionActions.CollectionActionTypes.UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        collection: {
          ...state.collection,
          authorInfo:{
              ...state.collection.authorInfo,
              followState:action.payload.lastFollowState
          }
        }
    }

      case fromCollectionActions.CollectionActionTypes.UNFOLLOW_USER_FAIL:
      return {
        ...state,
        collection: {
          ...state.collection,
          authorInfo:{
              ...state.collection.authorInfo,
              followState:action.payload.previousFollowState
          }
        }
    }
        default:
            return state;
    }
}
export const getFeatureState = createFeatureSelector<fromCollectionRoot.State>('collection');
export const selectCollectionState = createSelector(getFeatureState, state=>state.collection);
export const getCollection = createSelector(selectCollectionState, state=>state.collection);
export const selectIsLoading = createSelector(selectCollectionState,state=>state.isLoading);