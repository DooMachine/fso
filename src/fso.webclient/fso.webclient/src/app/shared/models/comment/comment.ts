import { LikeStatus } from "../likestatus.enum";
import { UserInfoExtraSmall } from "../userInfoExtraSmall";

export interface Comment{
    id: number;
    reviewId?: number;
    parentCommentId?:number;
    content: string;
    commentCount: number;
    likeCount: number;
    dislikeCount: number;
    likeStatus: LikeStatus;
    userInfo: UserInfoExtraSmall;
}