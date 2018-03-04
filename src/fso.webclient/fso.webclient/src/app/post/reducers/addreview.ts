import * as addreviewActions from '../actions/addreview';
import { PostPart } from '../../shared/models/postpart';
import { InterestCard } from '../../shared/models/interest/interestcard';
import { CollectionCard } from '../../shared/models/collection/collectioncard';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPostRoot from './';

export interface AddReviewState{
    content: string;
    rating: number;
}
export interface State {
    isLoading: boolean;
    formPending:boolean;
    showForm:boolean;
    error: string | null;
    review: AddReviewState;
};

export const initialState: State = {
    isLoading:false,
    error: null,        
    formPending:false,
    showForm:true,
    review:{
        content:'',
        rating:50,
    }
};

export function reducer(state = initialState, action: addreviewActions.AddReviewActions ): State {
    switch (action.type) {
        case addreviewActions.AddReviewActionTypes.SUBMIT_FORM: {
            return {
                ...state,
                formPending:true
            };
        }
        case addreviewActions.AddReviewActionTypes.SUBMIT_FORM_SUCCESS: {
            return {
                ...state,
                formPending:false,
                error:action.payload.error,
                showForm:action.payload.showForm
            };
        }
        case addreviewActions.AddReviewActionTypes.SUBMIT_FORM: {
            return {
                ...state,
                formPending:false,
                error:action.payload.error
            };
        }
        
        default: {
            return state;
        }
    }
}
export const getPostState = createFeatureSelector<fromPostRoot.State>('post');
export const getAddReviewState = createSelector(getPostState, state => state.addReview);
export const getShowForm = createSelector(getAddReviewState, state => state.showForm);
export const getFormError = createSelector(getAddReviewState, state => state.error);