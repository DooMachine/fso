import * as fromFavourites from './favourites';
import { ActionReducerMap, Action, ActionReducer, MetaReducer } from '@ngrx/store';

export interface State {
    favourites: fromFavourites.State;
};

const initialState: State = {
    favourites: fromFavourites.initialState,
};
export const reducers: ActionReducerMap<State> = 
{  
    favourites:  fromFavourites.reducer,
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