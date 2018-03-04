import { PostUserInfo } from './postUserInfo';
import { PaginatedReviewList } from './paginatedReviewList';
import { PostPart } from '../../shared/models/postpart';

export interface PostIndex {
    id: number;
    title: string;
    description: string;
    dateUtcPublished: Date;
    likeCount: number;
    isUserliked: boolean;
    userInfo: PostUserInfo;
    reviews: PaginatedReviewList;
    postParts: PostPart[];
}

