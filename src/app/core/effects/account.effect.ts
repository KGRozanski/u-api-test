import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, finalize } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ACCOUNT_ACTIONS } from '../actions/account.actions';
import { Store } from '@ngrx/store';
import { SettingsActions } from '../actions/settings.actions';

@Injectable()
export class AccountEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACCOUNT_ACTIONS.login),
      exhaustMap(async (action) => this.authService
        .login(action.credentials)
        .pipe(finalize(() => {
          this.store.dispatch(SettingsActions.loaderToggle({loaderVisibility: false}));
        }))
        .subscribe({
          complete: () => {
            this.authService.postSignIn();
          }
        })
      )
    ),
    { dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store
  ) {}
}
