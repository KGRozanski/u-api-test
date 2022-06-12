import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { NotificationType } from '../enums/notification-type.enum';
import { Notification } from '../interfaces/notification.interface';
import { NotificationActions } from '../actions/notifications.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationsEffect {
  notifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.push),
      tap((event) => {
        this.snackBar.open(this.getMessage(event.notification), undefined, {duration: 3000});
      })
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}

  private getMessage(notification: Notification): string {
    if (notification.type === NotificationType.ERROR) {
      return `⛔ ${notification.message}`;
    } else if (notification.type === NotificationType.WARNING) {
      return `⚠️ ${notification.message}`;
    } else if (notification.type === NotificationType.INFO) {
      return `💡 ${notification.message}`;
    } else if (notification.type === NotificationType.SUCCESS) {
      return `✅ ${notification.message}`;
    } else {
      return notification.message || '';
    }
  }
}
