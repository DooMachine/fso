import * as fromReviews from './review';
import * as fromPosts from './post';
import { ActionReducerMap, MetaReducer, Action, ActionReducer } from '@ngrx/store';

export interface State {
    reviews: fromReviews.State;
    posts:fromPosts.State;
};

const initialState: State = {
    reviews: fromReviews.initialState,
    posts:fromPosts.initialState
};
export const reducers: ActionReducerMap<State> = 
{  
    reviews: fromReviews.reducer,
    posts:fromPosts.reducer
};


export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === 'CLEAR_PROFILE_REVIEWS_STATE') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  export const metaReducer: MetaReducer<State>[] = [clearState];