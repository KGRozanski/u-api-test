import { createReducer, on } from '@ngrx/store';
import { NotificationActions } from '../actions/notifications.actions';



export const notificationsReducer = createReducer(
    {},
    on(NotificationActions.push, (state) => {return state}),
);
