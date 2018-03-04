import * as fromAddPost from './addnewpost';
import { ActionReducerMap, ActionReducer, MetaReducer, Action, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    addPostState: fromAddPost.State,
};

const initialState: State = {
    addPostState: fromAddPost.initialState,
};
export const reducers: ActionReducerMap<State> = 
{  
    addPostState: fromAddPost.reducer
};

export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === 'CLEAR_ADD_POST_STATE') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  export const metaReducer: MetaReducer<State>[] = [clearState];


  export const getFeatureState = createFeatureSelector<State>('addnewpost');
  export const selectAddNewPostState = createSelector(getFeatureState, state=> state.addPostState);
  export const selectFormPending = createSelector(selectAddNewPostState, state=> state.formPending);
  export const selectPostPartPending = createSelector(selectAddNewPostState, state=> state.isPostPartPending);
  export const selectIsLoading = createSelector(selectAddNewPostState, state=> state.isLoading);
  export const selectInterestList = createSelector(selectAddNewPostState, state=>state.interests);
  export const selectInterestsLoading =createSelector(selectAddNewPostState, state=>state.autoCompleteInterestsLoading);
  export const selectPost = createSelector(selectAddNewPostState, state=> state.post);
  export const selectSelectedInterests = createSelector(selectAddNewPostState, state=>state.selectedInterests);
  export const selectPostParts = createSelector(selectPost, state=> state.postParts);
  export const selectPostPartsLenght = createSelector(selectPost, state=> state.postParts.length);
  export const selectError = createSelector(selectAddNewPostState, state => state.error);
  export const selectCollections = createSelector(selectAddNewPostState, state=> state.collections);
  export const selectIsPostLoading = createSelector(selectAddNewPostState, state=> state.isPostLoading);