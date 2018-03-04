import { PostCardPostPart } from './postCardPostPart';
import { PostCardAuthorInfo } from './postCardAuthorInfo' ;
import { PostCardReview } from './postCardReview';

export class PostCard {
    id: number;
    content: string;
    title: string;
    description: string;
    url: string;
    dateUtcPublished: Date;
    isCurrentUserLiked: boolean;
    favouriteCount: number;
    reviewCount: number;
    postParts: PostCardPostPart[];
    authorInfo: PostCardAuthorInfo;
    rating: number;
    get postPartCount(){
        return this.postParts.length;
    }
}
