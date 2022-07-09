import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AccountActions } from '../actions/account.actions';
import { AccountService } from 'src/app/modules/shared/services/account.service';

@Injectable()
export class AccountEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.login),
      exhaustMap((action) =>
        this.authService
          .login(action.credentials)
          .pipe(
            map(() =>{
              this.authService.setupSuccessAuthFlag();
              return AccountActions.loginSuccess({userInfo: this.accountService.userInfo});
            })
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private accountService: AccountService
  ) {}
}
