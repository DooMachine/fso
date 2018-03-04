import * as fromFollowers from './followers';
import { ActionReducerMap, ActionReducer, MetaReducer, Action } from '@ngrx/store';

export interface State {
    followers: fromFollowers.State
};

const initialState: State = {
    followers: fromFollowers.initialState
};
export const reducers: ActionReducerMap<State> = 
{  
    followers: fromFollowers.reducer
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