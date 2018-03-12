import * as interestActions from '../actions/interest';
import * as fromInterestRoot from './';
import { Interest } from '../models/interest';
import { PaginatedPostList } from '../models/paginatedPost';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
        interest: Interest;
        isInterestLoading: boolean;
        showError: boolean;
        error: string;
}

const initialState: State = {
        interest: {
            id: 0,
            name: '',
            description: '',
            urlKey: '',
            thumbnailImage: '/interest/pholder',
            coverImage: '/interest/pholder',
            isTrending: false,
            followerCount: 0,
            followState: 1,
            alphaColor: '',
            betaColor: '',
        },
        isInterestLoading: false,
        error: '',
        showError: false,
};

export type All = interestActions.InterestActionsAll;

export function reducer(state = initialState, action: All ): State {
    switch (action.type) {
        case interestActions.InterestActionTypes.REQUEST_INTEREST: {
            return {
                ...state,
                interest: {
                    ...state.interest,
                },
                isInterestLoading: true
            };
        }
        case interestActions.InterestActionTypes.RECIEVE_INTEREST_SUCCESS: {
            return {
                ...state,
                isInterestLoading: false,
                interest: action.payload,
            };
        }
        case interestActions.InterestActionTypes.RECIEVE_INTEREST_FAIL: {
            return {
                ...state,
                isInterestLoading: false,
                error: 'Oops.. something went wrong',
                showError: true
            };
        }
        case interestActions.InterestActionTypes.UPDATE_COVER_IMAGE: {
            return state;
        }
        case interestActions.InterestActionTypes.UPDATE_COVER_IMAGE_SUCCESS: {
            return {
                ...state,
                isInterestLoading: false,
                interest:{
                    ...state.interest,
                    coverImage:{...state.interest.coverImage,
                        url:action.payload.largeImageUrl}
                },
            };
        }
        case interestActions.InterestActionTypes.UPDATE_COVER_IMAGE_FAIL: {
            return {
                ...state,
                isInterestLoading: false,
                error: 'Oops.. something went wrong',
                showError: true
            };
        }
        case interestActions.InterestActionTypes.UPDATE_PROFILE_IMAGE: {
            return state;
        }
        case interestActions.InterestActionTypes.UPDATE_PROFILE_IMAGE_SUCCESS: {
            return {
                ...state,
                isInterestLoading: false,
                interest:{
                    ...state.interest,
                    thumbnailImage:{
                        ...state.interest.thumbnailImage,
                        thumbUrl:action.payload.thumbImageUrl
                    }
                },
            };
        }
        case interestActions.InterestActionTypes.UPDATE_PROFILE_IMAGE_FAIL: {
            return {
                ...state,
                isInterestLoading: false,
                error: 'Oops.. something went wrong',
                showError: true
            };
        }
        case interestActions.InterestActionTypes.FOLLOW_INTERESTS:

        return  {...state, interest:{...state.interest,followState: 0} }
        case interestActions.InterestActionTypes.FOLLOW_INTERESTS_SUCCESS:

        return  {...state, interest:{...state.interest,followState: action.payload.followState} }

        case interestActions.InterestActionTypes.FOLLOW_INTERESTS_FAIL:

        return  {...state, interest:{...state.interest,followState: 1} }
        case interestActions.InterestActionTypes.UNFOLLOW_INTERESTS:
        return  {...state, interest:{...state.interest,followState: 1} }
        case interestActions.InterestActionTypes.UNFOLLOW_INTERESTS_SUCCESS:
        return  {...state, interest:{...state.interest,followState: action.payload.followState} }
        case interestActions.InterestActionTypes.UNFOLLOW_INTERESTS_FAIL:
        return  {...state, interest:{...state.interest,followState: 0} }
        default: {
            return state;
        }
    }
}
export const getFeatureState = createFeatureSelector<fromInterestRoot.State>('interest');
export const selectInterestState = createSelector(getFeatureState, state=>state.interest);
export const selectInterest = createSelector(selectInterestState, state=>state.interest);