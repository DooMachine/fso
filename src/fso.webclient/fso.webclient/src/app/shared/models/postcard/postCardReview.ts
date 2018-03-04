import { UserInfoExtraSmall } from "../userInfoExtraSmall";
import { LikeStatus } from "../likeStatus.enum";


export interface PostCardReview{
    dateUtcPublished: Date;
    description: string;
    id: number;
    postId: number;
    content:string;
    popularityLevel: number;
    url: string;
    postRate: string;
    authorInfo: UserInfoExtraSmall;
    isUserLiked: boolean;
    isUserDisliked: boolean;
    likeStatus: LikeStatus;
    dislikeCount: number;
    likeCount:number;
    commentCount: number;
}