import * as fromFollowing from './following';
import { ActionReducerMap, MetaReducer, ActionReducer, Action } from '@ngrx/store';

export interface State {
    followings: fromFollowing.State
};

const initialState: State = {
    followings: fromFollowing.initialState
};
export const reducers: ActionReducerMap<State> = 
{  
    followings: fromFollowing.reducer
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