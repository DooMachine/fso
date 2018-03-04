import { FollowStatus } from "../followStatus.enum";

export interface UserInfoSmallCard {
    id:number;
    appUserId: string;
    username: string;
    profileImage: string;
    reputation: number;
    status:string;
    followState: FollowStatus; 
}
