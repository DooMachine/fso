import { PostCard } from '../../shared/models/postcard/postCard';

export interface PaginatedPostList {
    posts: PostCard[];
    pageSize: number;
    pageIndex: number;
    totalPage: number;
    totalPostCount: number;
    isLoading: boolean;
    error: string;
    showError: boolean;
    hasNextPage: boolean;
}
