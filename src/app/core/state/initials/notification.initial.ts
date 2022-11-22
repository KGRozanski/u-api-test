import { NotificationType } from '../../enums/notification-type.enum';
import { Notification } from '../../interfaces/store/notification.interface';

export function getNotificationInitial(): Notification {
    return {
        type: NotificationType.INFO,
        message: ''
    };
}
