import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { NotificationActions } from '../actions/notifications.actions';
import { NotificationType } from '../enums/notification-type.enum';

@Injectable()
export class GlobalErrorHandlerInterceptor implements HttpInterceptor {

    constructor(private store: Store) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error) => {

                if (error instanceof HttpErrorResponse) {
                    console.log('http error occured', error);
                    this.store.dispatch(NotificationActions.push({notification: {type: NotificationType.ERROR, message: error.error.message}}));
                }

                return throwError(() => new Error(error));
            })
        )
    }
}