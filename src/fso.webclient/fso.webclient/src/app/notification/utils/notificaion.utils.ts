import { Notification, NotificationType } from '../models';

export function NotificationIconHandler (notifications: Notification[]) {
    return notifications.map(n => {
        switch (n.notificationType) {
            case 0:
                return {id:n.id,
                changes:{
                notificationTypeIcon: NotificationType.Followed,
                userInfoContent: handleNotificationContent(n),
                content: `started following you!`
                }
                };
            case 1:
            return {
                id:n.id,
                changes:{
                    notificationTypeIcon: NotificationType.Post_Reviewed,
                    userInfoContent: handleNotificationContent(n),
                    content: `added a review to your post.`
                }
                };
            case 2:
            return {
                id:n.id,
                changes:{
                    notificationTypeIcon: NotificationType.Post_Commended,
                    userInfoContent: handleNotificationContent(n),
                    content: `commented on your post.`,                
                }};
            case 3:
            return {
                id:n.id,
                changes:{
                notificationTypeIcon: NotificationType.Post_Favourited,
                userInfoContent: handleNotificationContent(n),
                content: `favourited your post.`
                }};
            case 4:
                return {
                    id:n.id,
                    changes:{
                notificationTypeIcon: NotificationType.Review_Commended,
                userInfoContent: handleNotificationContent(n),
                content: `commented on your review.`
                }};
            case 5:
            return {
                id:n.id,
                changes:{
                notificationTypeIcon: NotificationType.Review_Liked,
                userInfoContent: handleNotificationContent(n),
                content: `liked your review.`
                }};
            case 6:
            return {
                id:n.id,
                changes:{
                notificationTypeIcon: NotificationType.Comment_Commended,
                userInfoContent: handleNotificationContent(n),
                content: `commented on your comment.`
                }};
            case 7:
            return {
                id:n.id,
                changes:{
                notificationTypeIcon: NotificationType.Registered,
                userInfoContent: handleNotificationContent(n),
                content: `Welcome to feasion. Start exploring.`
                }};
            default:
            return {
                id:n.id,
                changes:{
                notificationTypeIcon: NotificationType.Registered,
                userInfoContent: handleNotificationContent(n),
                content: `Welcome to feasion. Start exploring!`
                }};
        }
    });
}
export const handleNotificationContent = (notification: Notification) => {
    let userInfo = '';
    if (notification.activityUsers != null ) {
        const userCount = notification.activityUsers.length;
        if (userCount === 0) {
            // TODO: WHAT?
        }else if (userCount === 1) {
            userInfo += `${notification.activityUsers[0].username}`;
        }else if (userCount === 2) {
            userInfo += `${notification.activityUsers[0].username} and ${notification.activityUsers[1].username}`;
        }else {
            userInfo += `${notification.activityUsers[0].username} and ${userCount - 1} people`;
        }
    }
    return userInfo;
};

