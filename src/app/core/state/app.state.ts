import { Notification } from '../interfaces/store/notification.interface';
import { AccountInfo } from '../interfaces/store/account-info.interface';
import { Settings } from '../interfaces/store/settings.interface';

export interface AppState {
    notifications: Notification,
    account: AccountInfo,
    settings: Settings
}
