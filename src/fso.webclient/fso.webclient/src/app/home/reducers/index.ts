
import * as fromActivityFeed from './activityfeed';
import * as fromGroupRecommendation from './grouprecommendation';
import * as fromUserActivity from './userrecommendation';
import * as fromInterest from './interest';

import { ActionReducerMap,
   ActionReducer, Action,
    MetaReducer,createFeatureSelector,
     createSelector } from '@ngrx/store';


export interface State {
    activityFeed: fromActivityFeed.State;
    grouprecommendation: fromGroupRecommendation.State;
    userrecommendation: fromUserActivity.State;
    interests: fromInterest.State;
}
export const reducers: ActionReducerMap<State> =
   {
    activityFeed: fromActivityFeed.reducer,
    grouprecommendation: fromGroupRecommendation.reducer,
    userrecommendation: fromUserActivity.reducer,
    interests:fromInterest.reducer
 };


  export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === 'CLEAR_HOME_STATE') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  export const metaReducer: MetaReducer<State>[] = [clearState];

  export const getHomeState = createFeatureSelector<State>('home');
