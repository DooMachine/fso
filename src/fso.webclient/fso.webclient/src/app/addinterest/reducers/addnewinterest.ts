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
    interests: Array<InterestCard>;
    autoCompleteInterestsLoading: boolean;
    interest: AddInterestState;
};

export const initialState: State = {
    isLoading:false,
    error: null,        
    formPending:false,
    interests:[],
    autoCompleteInterestsLoading:false,
    interest:{
        name: '',
        urlKey: '',
        description: '',
        about:''
    }
};

export function reducer(state = initialState, action: addnewinterest.AddNewInterestActions ): State {
    switch (action.type) {

        case addnewinterest.AddNewInterestActionTypes.GET_AUTOCOMPLETE_INTEREST: {
            return {
                ...state,
                autoCompleteInterestsLoading:true
            };
        }
        case addnewinterest.AddNewInterestActionTypes.GET_AUTOCOMPLETE_INTEREST_SUCCESS: {
            return {
                ...state,
                autoCompleteInterestsLoading:false,
                interests:action.payload
            };
        }
        case addnewinterest.AddNewInterestActionTypes.GET_AUTOCOMPLETE_INTEREST_FAIL: {
            return {
                ...state,
                autoCompleteInterestsLoading:false
            };
        }
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