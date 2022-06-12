import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AccountActions } from '../actions/account.actions';
import { NotificationType } from '../enums/notification-type.enum';

@Injectable()
export class AccountEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.login),
      exhaustMap((action) =>
        this.authService
          .login(action.credentials)
          .pipe(
            map(() =>
              AccountActions.loginSuccess()
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
