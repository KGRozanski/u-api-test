import { Notification } from '../interfaces/notification.interface';
import { UserInfo } from '../interfaces/user-info.interface';
import { Settings } from '../interfaces/settings.interface';

export interface AppState {
    notifications: Notification,
    account: UserInfo,
    settings: Settings
}
