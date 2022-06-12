import { createAction, props } from "@ngrx/store";
import { Notification } from '../interfaces/notification.interface';

const push = createAction(
    '[Notificator] Push',
    props<{notification: Notification}>()
);


export const NotificationActions = {
    push
}