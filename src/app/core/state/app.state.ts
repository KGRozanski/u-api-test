import { Notification } from '../interfaces/notification.interface';
import { AccountInfo } from '../interfaces/account-info.interface';
import { Settings } from '../interfaces/settings.interface';

export interface AppState {
    notifications: Notification,
    account: AccountInfo,
    settings: Settings
}
