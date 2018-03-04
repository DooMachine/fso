import * as fromCollections from './collections';
import { ActionReducerMap, ActionReducer, Action, MetaReducer } from '@ngrx/store';

export interface State {
    collections: fromCollections.State
};

const initialState: State = {
    collections: fromCollections.initialState
};
export const reducers: ActionReducerMap<State> = 
{  
    collections: fromCollections.reducer
};

export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === 'CLEAR_PROFILE_STATE') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  export const metaReducer: MetaReducer<State>[] = [clearState];