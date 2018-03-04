
export enum NotificationType {
    Followed = 'person_add',
    Post_Reviewed = 'rate_review',
    Post_Commended= 'comment',
    Post_Favourited = 'favorite',
    Review_Commended = 'comment',
    Review_Liked = 'thumb_up',
    Comment_Commended = 'comment',
    Registered= 'explore'
}
export interface Notification {
    id: number;
    dateUtcModified: Date;
    dateUtcAdded: Date;
    isSeen: boolean;
    content: string;
    userInfoContent: string;
    redirectUrl: string;
    imageUrl: string;
    notificationType: number;
    notificationTypeIcon: string;
    activityUsers: NotificationUserInfo[];
}
export interface NotificationUserInfo {
    userId: string;
    imageUrl: string;
    username: string;
    dateAdd: Date;
}
