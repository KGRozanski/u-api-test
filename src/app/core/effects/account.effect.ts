import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AccountActions } from '../actions/account.actions';

@Injectable()
export class AccountEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.login),
      exhaustMap(async (action) => this.authService
        .login(action.credentials)
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
    private authService: AuthService
  ) {}
}
