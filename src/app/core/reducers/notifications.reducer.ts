import { createReducer, on } from '@ngrx/store';
import { NotificationActions } from '../actions/notifications.actions';
import { getNotificationInitial } from '../state/initials/notification.initial';

export const notificationsReducer = createReducer(
    getNotificationInitial(),
    on(NotificationActions.push, (state) => {
        return state;
    })
);
