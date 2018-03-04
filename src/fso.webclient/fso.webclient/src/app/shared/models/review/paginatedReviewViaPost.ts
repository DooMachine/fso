
import { ReviewViaPost } from './reviewViaPost';

export interface PaginatedReviewViaPostList {
    reviews: ReviewViaPost[];
    pageSize: number;
    pageIndex: number;
    totalPage: number;
    totalPostCount: number;
    isLoading: boolean;
    hasNextPage: boolean;
    order: string;
}
