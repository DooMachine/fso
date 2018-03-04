import * as fromPostActions from  '../actions/post';
import { PostPart } from "../../shared/models/postpart";
import { UserInfoExtraSmall } from "../../shared/models/userInfoExtraSmall";
import { UserInfoSmallCard } from "../../shared/models/user/userSmallCard";
import { InterestCard } from "../../shared/models/interest/interestcard";
import { CollectionCard } from "../../shared/models/collection/collectioncard";
import { FollowStatus } from "../../shared/models/followStatus.enum";
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromPostRoot from './';


export interface PostState {
    id:number;
    content:string;
    url:string;
    description:string;
    title:string;
    dateUtcPublished:Date;
    isCurrentUserLiked:boolean;   
    postGroups: InterestCard[];
    authorInfo:UserInfoSmallCard;
    collectionInfo: CollectionCard;
    rating:number;
    reviewCount:number;
    favouriteCount:number;
};
export interface State{
    isLoading:boolean;
    error: null|string;
    post:PostState;
    
}

const initialState: State = {
    isLoading:false,    
    error:null,
    post:{
        id:0,
        content:'',
        url:'',
        description:'',
        title:'',
        dateUtcPublished:new Date(),
        isCurrentUserLiked:false,
        postGroups: [],
        authorInfo:{
            id:0,
            appUserId: '',
            username:  '',
            profileImage:  '',
            reputation: 0,
            status: '',
            followState: 2,
        },
        collectionInfo: {
            name: '',
            id: 0,
            urlKey: '',
            postCount: '',
            thumbImageUrl: '',
            publishDate: '',
            dateUtcModified: '',
            userInfo:{},
            userInfoId:'',
        },
        rating:0,
        reviewCount:0,
        favouriteCount:0,
    }
    
};

export function reducer(state = initialState, action: fromPostActions.PostActions ): State {
    switch (action.type) {
        case fromPostActions.PostActionTypes.GET_POST: {
            return {
                ...state,
                isLoading:true
            };
        }
        case fromPostActions.PostActionTypes.SET_LOADING: {
            return {
                ...state,
                isLoading:action.payload
            };
        }
        case fromPostActions.PostActionTypes.GET_POST_SUCCESS: {
            return {
                ...state,
                isLoading:false,
                post: action.payload,
            };
        }
        case fromPostActions.PostActionTypes.GET_POST_FAIL: {
            return {
                ...state,
                error:action.payload
            };
        }
        case fromPostActions.PostActionTypes.LIKE_POST:{
            return {
                ...state,
                post:{
                    ...state.post,
                    isCurrentUserLiked:true,
                    favouriteCount:state.post.favouriteCount +1
                }
            }
        }

        case fromPostActions.PostActionTypes.LIKE_POST_SUCCESS:{ 
            return state

        }
        case fromPostActions.PostActionTypes.LIKE_POST_FAIL:{
            return {
                ...state,
                post:{
                    ...state.post,
                    isCurrentUserLiked:false,
                    favouriteCount:state.post.favouriteCount -1
                }
            }
        }

        case fromPostActions.PostActionTypes.UNLIKE_POST:{
            return {
                ...state,
                post:{
                    ...state.post,
                    isCurrentUserLiked:false,
                    favouriteCount:state.post.favouriteCount -1
                }
            }
        }
        case fromPostActions.PostActionTypes.UNLIKE_POST_SUCCESS:{
            return state
        }
        case fromPostActions.PostActionTypes.UNLIKE_POST_FAIL:{
            return {
                ...state,
                post:{
                    ...state.post,
                    isCurrentUserLiked:true,
                    favouriteCount:state.post.favouriteCount +1
                }
            }
        }
        case fromPostActions.PostActionTypes.FOLLOW_USER:
            return {
            ...state,
                post: {
                ...state.post,
                    authorInfo:{
                        ...state.post.authorInfo,
                        followState:1
                    }
                }
            };
      case fromPostActions.PostActionTypes.FOLLOW_USER_SUCCESS:
        return {
            ...state,
                post: {
                ...state.post,
                    authorInfo:{
                        ...state.post.authorInfo,
                        followState:action.payload.lastFollowState
                    }
                }
        }
      case fromPostActions.PostActionTypes.FOLLOW_USER_FAIL:
      return {
        ...state,
        post: {
          ...state.post,
          authorInfo:{
              ...state.post.authorInfo,
              followState:action.payload.previousFollowState
          }
        }
    }
      case fromPostActions.PostActionTypes.UNFOLLOW_USER:
      return {
        ...state,
        post: {
          ...state.post,
          authorInfo:{
              ...state.post.authorInfo,
              followState:2
          }
        }
    }
      case fromPostActions.PostActionTypes.UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          authorInfo:{
              ...state.post.authorInfo,
              followState:action.payload.lastFollowState
          }
        }
    }

      case fromPostActions.PostActionTypes.UNFOLLOW_USER_FAIL:
      return {
        ...state,
        post: {
          ...state.post,
          authorInfo:{
              ...state.post.authorInfo,
              followState:action.payload.previousFollowState
          }
        }
    }
        default:
            return state;
    }
}
export const getFeatureState = createFeatureSelector<fromPostRoot.State>('post');
export const getPostState = createSelector(getFeatureState, state=>state.post);
export const getPost = createSelector(getPostState, state=>state.post);
export const selectIsLoading = createSelector(getPostState,state=>state.isLoading);