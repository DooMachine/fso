import * as fromAddInterest from './addnewinterest';
import { ActionReducerMap, ActionReducer, MetaReducer, Action, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    addInterestState: fromAddInterest.State,
};

const initialState: State = {
    addInterestState: fromAddInterest.initialState,
};
export const reducers: ActionReducerMap<State> = 
{  
    addInterestState: fromAddInterest.reducer
};

export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === 'CLEAR_ADD_INTEREST_STATE') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  export const metaReducer: MetaReducer<State>[] = [clearState];


  export const getFeatureState = createFeatureSelector<State>('addnewinterest');
  export const selectAddNewInterestState = createSelector(getFeatureState, state=> state.addInterestState);
  export const selectFormPending = createSelector(selectAddNewInterestState, state=> state.formPending);
  export const selectIsLoading = createSelector(selectAddNewInterestState, state=> state.isLoading);
  export const selectNewInterest = createSelector(selectAddNewInterestState, state=> state.interest);
  export const selectError = createSelector(selectAddNewInterestState, state => state.error); 

  export const selectInterestList = createSelector(selectAddNewInterestState, state=>state.interests);
  export const selectInterestsLoading =createSelector(selectAddNewInterestState, state=>state.autoCompleteInterestsLoading);