import { UserInfoExtraSmall } from '../userInfoExtraSmall';
import { LikeStatus } from '../likeStatus.enum';
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
}
