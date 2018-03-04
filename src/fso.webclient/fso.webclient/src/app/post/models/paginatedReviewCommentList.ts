import { ReviewComment } from '../models/reviewComment';

export interface PaginatedCommentList {
    entities: ReviewComment[];
    pageSize: number;
    pageIndex: number;
    totalPage: number;
    totalCount: number;
    isLoading: boolean;
    error: string;
    showError: boolean;
    hasNextPage: boolean;
    isShowing:boolean;
}
