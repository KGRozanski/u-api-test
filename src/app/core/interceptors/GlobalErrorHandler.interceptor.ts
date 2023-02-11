import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NotificationActions } from '../actions/notifications.actions';
import { NotificationType } from '../enums/notification-type.enum';

@Injectable()
export class GlobalErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private store: Store) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<object>> {
        return next.handle(req).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse) {
                    console.log('[GLOBAL INTERCEPTOR] http error occured', error);
                    this.store.dispatch(
                        NotificationActions.push({
                            notification: {
                                type: NotificationType.ERROR,
                                message: error.error.message
                            }
                        })
                    );
                }

                throw error;
            })
        );
    }
}
