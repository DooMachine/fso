import { UserInfoExtraSmall } from '../../shared/models/userInfoExtraSmall';
import { PaginatedCommentList} from '../models/paginatedReviewCommentList';

export interface ReviewComment{
    id: number;
    content: string;
    subCommentCount: number;
    sucComments: PaginatedCommentList;
    likeCount: number;
    dislikeCount: number;
    isCurrentUserLiked: boolean;
    IsCurrentUserDisliked: boolean;
    dateUtcAdd: Date;
    dateUtcModified: Date;
    authorInfo: UserInfoExtraSmall;    
    likeStatus: number; 
    reviewId:number;
}
