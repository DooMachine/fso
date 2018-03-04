import * as addnewinterest from '../actions/addnewinterest';
import { InterestCard } from '../../shared/models/interest/interestcard';
import { CollectionCard } from '../../shared/models/collection/collectioncard';

export interface AddInterestState{
    name: string;
    urlKey: string;
    description:string;
    about:string;
}
export interface State {
    isLoading: boolean;
    formPending:boolean;
    error: string | null;
    interest: AddInterestState;
};

export const initialState: State = {
    isLoading:false,
    error: null,        
    formPending:false,
    interest:{
        name: '',
        urlKey: '',
        description: '',
        about:''
    }
};

export function reducer(state = initialState, action: addnewinterest.AddNewInterestActions ): State {
    switch (action.type) {
        case addnewinterest.AddNewInterestActionTypes.SUBMIT_FORM: {
            return {
                ...state,
                formPending:true
            };
        }
        case addnewinterest.AddNewInterestActionTypes.SUBMIT_FORM_SUCCESS: {
            return {
                ...state,
                formPending:false,
            };
        }
        case addnewinterest.AddNewInterestActionTypes.SUBMIT_FORM_FAIL: {
            return {
                ...state,
                formPending:false,
                error:action.payload.error
            };
        }
        case addnewinterest.AddNewInterestActionTypes.SHOW_ERROR: {
            return {
                ...state,
                error:action.payload,
            };
        }
        default: {
            return state;
        }
    }
}