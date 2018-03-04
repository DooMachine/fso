import { Review } from '../models/review';

export interface PaginatedReviewList {
    reviews: Review[];
    pageSize: number;
    pageIndex: number;
    totalPage: number;
    totalPostCount: number;
    isLoading: boolean;
    hasNextPage: boolean;
    order: string;
}
