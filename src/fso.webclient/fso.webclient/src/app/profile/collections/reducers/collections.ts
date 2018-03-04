
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCollectionActions from '../actions/collection';
import { CollectionCard } from '../../../shared/models/collection/collectioncard';

export interface State extends EntityState<CollectionCard> {
    pageSize: number;
    pageIndex: number;
    totalPage: number;
    totalCount: number;
    isLoading: boolean;
    error: string;
    showError: boolean;
    hasNextPage: boolean;
    order: string;
    formError:string | null;
    formPending:boolean;
    showForm:boolean;
}

export const adapter: EntityAdapter<CollectionCard> = createEntityAdapter<CollectionCard>({
  selectId: (collection: CollectionCard) => collection.id,
  sortComparer: sortByModifyDate
});
export function sortByModifyDate(a:CollectionCard, b:CollectionCard){
  return Date.parse(b.dateUtcModified) - Date.parse(a.dateUtcModified);
}
export const initialState: State = adapter.getInitialState({
    pageSize: 18,
    pageIndex: 0,
    totalPage: 0,
    totalCount: 0,
    isLoading: false,
    error: 'Oops.. An error occured.',
    showError: false,
    hasNextPage: true,
    order: 'dateUtcModified',
    formError:null,
    formPending:false,
    showForm:false
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
        case fromCollectionActions.CollectionActionTypes.TOGGLE_SHOW_FORM:
        return {
            ...state,
            showForm: !state.showForm,
        };
        case fromCollectionActions.CollectionActionTypes.GET_COLLECTIONS:
        return {
            ...state,
            isLoading: true,
            pageIndex:state.pageIndex +1
        };
        case fromCollectionActions.CollectionActionTypes.GET_COLLECTIONS_SUCCESS:
        if(action.payload == null){
            return {...state,isLoading:false,hasNextPage:false}
        }
            return {
                ...adapter.addMany(action.payload.entities, state),
                totalPage: action.payload.totalPage,
                totalCount: action.payload.totalCount,
                hasNextPage: action.payload.hasNextPage,
                isLoading: false,
            };
        case fromCollectionActions.CollectionActionTypes.GET_COLLECTIONS_FAIL:
            return {
                ...state,
                isLoading: false,
                hasNextPage:false,
                showError: true,
            };
        case fromCollectionActions.CollectionActionTypes.ADD_COLLECTION:
        return {
            ...state,
            formPending:true
        };
        case fromCollectionActions.CollectionActionTypes.ADD_COLLECTION_SUCCESS:
            return {
                ...adapter.addOne(action.payload.collection, state),
                formPending:false,
            };
        case fromCollectionActions.CollectionActionTypes.ADD_COLLECTION_FAIL:
            return {
                ...state,
                formPending:false,
                formError:action.payload.error
            };
        case fromCollectionActions.CollectionActionTypes.DELETE_COLLECTION:
            return {
                ...state,
            };
        case fromCollectionActions.CollectionActionTypes.DELETE_COLLECTION_SUCCESS:
            return {
                ...adapter.removeOne(action.payload.collectionId, state),
            };
        case fromCollectionActions.CollectionActionTypes.DELETE_COLLECTION_FAIL:
            return {
                ...state,
            };
        case fromCollectionActions.CollectionActionTypes.UPDATE_COLLECTION_IMAGE:
            return {
                ...state,
            };
        case fromCollectionActions.CollectionActionTypes.UPDATE_COLLECTION_IMAGE_SUCCESS:
            return adapter.updateOne({id: action.payload.postCollectionId,
                changes: { thumbImageUrl: action.payload.thumbImageUrl }},
                state);
        case fromCollectionActions.CollectionActionTypes.ADD_COLLECTION_FAIL:
            return {
                ...state
            };
        default: {
            return state;
      }
    }
  }
  
  export const getUserCollectionsState = createFeatureSelector<State>('usercollections');
  export const getCollectionsState = createSelector(getUserCollectionsState, state => state['collections']);
  export const selectShowCollectionForm = createSelector(getCollectionsState,state=>state.showForm);
  export const selectHasNextPage = createSelector(getCollectionsState,state=>state.hasNextPage);
  export const selectIsLoading = createSelector(getCollectionsState,state=>state.isLoading);
  export const {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal,
    } = adapter.getSelectors(getCollectionsState);
  