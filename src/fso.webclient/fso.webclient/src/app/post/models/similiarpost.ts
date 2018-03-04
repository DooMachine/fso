import { UserInfoExtraSmall } from "../../shared/models/userInfoExtraSmall";

export interface SimiliarPost{
    id:number;
    title:string;
    url:string;
    rating:number;
    userInfo:UserInfoExtraSmall,
    dateUtcPublished:Date,
    thumbnailUrls:Array<string>,
    activeThumbnailIndex:number;
}