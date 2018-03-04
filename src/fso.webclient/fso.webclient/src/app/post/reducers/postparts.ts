
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as postpartActions from '../actions/postparts';
import * as fromPostRoot from './';
import { PostPart } from '../../shared/models/postpart';


export interface State extends EntityState<PostPart> {
    activePostPartIndex:number | null;    
    viewStyle: number
}

export const adapter: EntityAdapter<PostPart> = createEntityAdapter<PostPart>({
  selectId: (postpart: PostPart) => postpart.id,
  sortComparer: false,
});
export const initialState: State = adapter.getInitialState({
    activePostPartIndex: 0,
    viewStyle: 0
});

  export function reducer(state = initialState, action): State {
    switch (action.type) {
        case postpartActions.PostIndexPostPartsActionTypes.CHANGE_ACTIVE_POSTPART_INDEX:       
        const newIndex = (state.ids as number[]).indexOf(action.payload); 
        return {
            ...state,
            activePostPartIndex:newIndex
        }
        case postpartActions.PostIndexPostPartsActionTypes.CHANGE_POSTPART_VIEW_STYLE:
        return {
            ...state,
            viewStyle:action.payload
        }
        case postpartActions.PostIndexPostPartsActionTypes.SET_POSTPARTS:
            if(action.payload == null){
                return state;
            }
            return {
                ...adapter.addAll(action.payload, state),
                activePostPartIndex: 0,
            };
        case postpartActions.PostIndexPostPartsActionTypes.DECREASE_ACTIVE_POSTPART_INDEX: {
            const totalIndex = state.ids.length-1;
            const currentIndex = state.activePostPartIndex;
            let nextIndex= 0;
            if(totalIndex !== currentIndex){
                nextIndex = currentIndex+1;
            }
            
            return {
                ...state,
                activePostPartIndex:nextIndex,
            };
        }
        case postpartActions.PostIndexPostPartsActionTypes.INCREASE_ACTIVE_POSTPART_INDEX: {
            
            const totalIndex = state.ids.length-1;
            const currentIndex = state.activePostPartIndex;
            let nextIndex= totalIndex;
            if(currentIndex !== 0){
                nextIndex = currentIndex-1;
            }            
            return {
                ...state,
                activePostPartIndex:nextIndex,
            };
            
        }
        default:
            return state;
    }
  }
  export const getPostState = createFeatureSelector<fromPostRoot.State>('post');
  export const getPostPartsState = createSelector(getPostState,state=>state['postparts'])
  
export const selectActivePostPartIndex = createSelector(getPostPartsState, state=> state.activePostPartIndex);
export const selectPostPartViewStyle = createSelector(getPostPartsState,state=>state.viewStyle);
  export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors(getPostPartsState);

  export const getActivePostPartId = createSelector(
    selectActivePostPartIndex,    
    selectIds,
    (activeIndex , ids) => {
        if(activeIndex != null){
            return ids[activeIndex];
        }
        return null;
    }
  )
  
  export const getActivePostPart =  createSelector(
    getActivePostPartId,
    selectEntities,    
    (activeId, entities) => {
        if(activeId != null){
            return entities[activeId];
        }
        return null;
    }
  );
  export const getOtherPostParts =  createSelector(
    getActivePostPartId,
    selectAll,    
    (activeId, entities) => {
        if(activeId != null){
            return entities.filter(postPart => postPart.id != activeId);
        }
        return null;
    }
  );
