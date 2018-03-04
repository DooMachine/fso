
import { UserInfoExtraSmall } from '../userInfoExtraSmall';
import { PaginatedCommentList } from '../../../post/models/paginatedReviewCommentList';
import { PostCard } from '../postCard/postCard';

export interface ReviewViaPost {
    id: number;
    content: string;
    commentCount: number;
    likeCount: number;
    dislikeCount: number;
    isCurrentUserLiked: boolean;
    isCurrentUserDisliked: boolean;
    userInfo: UserInfoExtraSmall;
    comments: PaginatedCommentList;
    postInfo: PostCard;
}
