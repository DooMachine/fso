import { FollowStatus } from "../../shared/models/followStatus.enum";

export interface User {
    id: number;
    appUserId: string;
    currentTab: number;
    alphaColor: string;
    username: string;
    name: string;
    surname: string;
    status: string;
    profileImageUrl: string;
    followingState : FollowStatus;
    currentUserFollowedState : FollowStatus;
    followerCount: number;
    followingCount: number;
    interestCount: number;
    collectionCount: number;
    totalReputation: number;
}
