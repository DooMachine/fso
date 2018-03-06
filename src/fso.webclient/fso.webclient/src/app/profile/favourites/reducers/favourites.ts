
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as favouriteActions from '../actions/favourites';
import { PostCard } from '../../../shared/models/postcard/postCard';

export interface State extends EntityState<PostCard> {
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

export const adapter: EntityAdapter<PostCard> = createEntityAdapter<PostCard>({
  selectId: (post: PostCard) => post.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    pageSize: 8,
    pageIndex: 0,
    totalPage: 0,
    totalCount: 0,
    isLoading: false,
    error: 'An error occured...',
    showError: false,
    hasNextPage: false,
    order: 'publishDate',
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
      case favouriteActions.FavouritesActionTypes.GET_FAVOURITES:{
        return {
          ...state,
          isLoading: true,
          pageIndex : state.pageIndex +1
        }
      }
      case favouriteActions.FavouritesActionTypes.GET_FAVOURITES_SUCCESS:{
        if(action.payload==null){
          return {...state,isLoading:false,hasNextPage:false}
        }
        return {
          ...adapter.addMany(action.payload.entities, state),
            totalPage: action.payload.totalPageCount,
            totalCount: action.payload.totalCount,
            hasNextPage: action.payload.hasNextPage,
            isLoading: false
        }
      }
      case favouriteActions.FavouritesActionTypes.GET_FAVOURITES_FAIL:{
        return {
          ...state,
          isLoading:false,
          error:action.payload.error,
          pageIndex : state.pageIndex - 1
        }
      }
      case favouriteActions.FavouritesActionTypes.LIKE_POST:        
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: true }},
                state);

        case favouriteActions.FavouritesActionTypes.LIKE_POST_SUCCESS:    
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: action.payload.isLiked }},
                state);
        

        case favouriteActions.FavouritesActionTypes.LIKE_POST_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: false }},
                state);

        case favouriteActions.FavouritesActionTypes.UNLIKE_POST:        
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: false }},
                state);

        case favouriteActions.FavouritesActionTypes.UNLIKE_POST_SUCCESS:    
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: action.payload.isLiked }},
                state);        

        case favouriteActions.FavouritesActionTypes.UNLIKE_POST_FAIL:
            return adapter.updateOne({id: action.payload.id,
                changes: { isCurrentUserLiked: true }},
                state);
      default: {
        return state;
      }
    }
  }
  

  export const getUserFavouritesFeature = createFeatureSelector<State>('userfavourites');
  export const getFavouritesState = createSelector(getUserFavouritesFeature, state => state['favourites']);
  export const selectLoading = createSelector(getFavouritesState,state=>state.isLoading);
  export const selectHasNextPage = createSelector(getFavouritesState,state=>state.hasNextPage);

  
  export const {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal,
    } = adapter.getSelectors(getFavouritesState);

    export const selectIsEmpty = createSelector(
      selectTotal,
      selectLoading,
      (total, isLoading) => {
        return !isLoading && total === 0
      }
    );

