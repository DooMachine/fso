import { UserInfoExtraSmall } from '../../shared/models/userInfoExtraSmall';
import { PaginatedCommentList } from '../models/paginatedReviewCommentList';
import { LikeStatus } from '../../shared/models/likeStatus.enum';


export interface Review {
    id: number;
    postId: number;
    dateUtcPublished:Date;
    url:string;
    postRate:number;
    content: string;
    commentCount: number;
    likeCount: number;
    dislikeCount: number;
    likeStatus: LikeStatus;
    authorInfo: UserInfoExtraSmall;
    showCommentForm:boolean;
    commentFormError:string|null;
    commentFormPending:boolean;
    showComments:boolean;
    isCommentsLoading:boolean;
}
