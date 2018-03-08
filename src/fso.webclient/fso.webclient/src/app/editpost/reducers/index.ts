import * as fromEditPost from './editpost';
import { ActionReducerMap, ActionReducer, MetaReducer, Action, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    editPostState: fromEditPost.State,
};

const initialState: State = {
    editPostState: fromEditPost.initialState,
};
export const reducers: ActionReducerMap<State> = 
{  
    editPostState: fromEditPost.reducer
};

export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === 'CLEAR_EDIT_POST_STATE') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  export const metaReducer: MetaReducer<State>[] = [clearState];


  export const getFeatureState = createFeatureSelector<State>('editpost');
  export const selectEditPostState = createSelector(getFeatureState, state=> state.editPostState);
  export const selectFormPending = createSelector(selectEditPostState, state=> state.formPending);
  export const selectPostPartPending = createSelector(selectEditPostState, state=> state.isPostPartPending);
  export const selectIsLoading = createSelector(selectEditPostState, state=> state.isLoading);
  export const selectInterestList = createSelector(selectEditPostState, state=>state.interests);
  export const selectInterestsLoading =createSelector(selectEditPostState, state=>state.autoCompleteInterestsLoading);
  export const selectPost = createSelector(selectEditPostState, state=> state.post);
  export const selectSelectedInterests = createSelector(selectEditPostState, state=>state.selectedInterests);
  export const selectPostParts = createSelector(selectPost, state=> state.postParts);
  export const selectPostPartsLenght = createSelector(selectPostParts, state=> state.length);
  export const selectError = createSelector(selectEditPostState, state => state.error);
  export const selectCollections = createSelector(selectEditPostState, state=> state.collections);
  export const selectIsPostLoading = createSelector(selectEditPostState, state=> state.isPostLoading);
  export const selectPrevCollection = createSelector(selectPost,state=> state.collectionId)