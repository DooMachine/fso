

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Review } from '../../../post/models/review';
import { getUserPostsState } from './';

export interface State extends EntityState<Review> {
    pageSize: number;
    pageIndex: number;
    totalPage: number;
    totalPostCount: number;
    isLoading: boolean;
    error: string;
    showError: boolean;
    hasNextPage: boolean;
    order: string;
}

export const adapter: EntityAdapter<Review> = createEntityAdapter<Review>({
    selectId: (review: Review) => review.id,
    sortComparer: false,
  });
  export const initialState: State = adapter.getInitialState({
    pageSize: 3,
    pageIndex: 0,
    totalPage: 0,
    totalPostCount: 0,
    isLoading: false,
    error: 'An error occured...',
    showError: false,
    hasNextPage: true,
    order: 'publishDate'
  });

  export function reducer(state = initialState, action): State {
    switch (action.type) {
      default: {
        return state;
      }
    }
  }

  
