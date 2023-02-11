import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SettingsActions } from '../actions/settings.actions';

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private Store: Store) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.Store.dispatch(SettingsActions.loaderToggle({ loaderVisibility: true }));

        return next.handle(req).pipe(
            finalize(() => {
                this.Store.dispatch(SettingsActions.loaderToggle({ loaderVisibility: false }));
            })
        );
    }
}
