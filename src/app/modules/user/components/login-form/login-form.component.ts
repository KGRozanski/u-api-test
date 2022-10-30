import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexSupplier } from '@fadein/commons';
import { Store } from '@ngrx/store';
import { ACCOUNT_ACTIONS } from 'src/app/core/actions/account.actions';
import { SettingsActions } from 'src/app/core/actions/settings.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store) { }

  public loginForm: FormGroup = this.fb.group({
    username: [null,
      [
        Validators.required, 
        Validators.min(3), 
        Validators.max(30)
      ]
    ],
    password: [null,
      [
        Validators.required
      ]
    ],
    rememberMe: [false]
  });

  ngOnInit(): void {
  }

  submit() {
    if(this.loginForm.valid) {
      this.store.dispatch(SettingsActions.loaderToggle({loaderVisibility: true}));
      this.store.dispatch(ACCOUNT_ACTIONS.login({
        credentials: {
          username: this.loginForm.get('username')!.value,
          password: this.loginForm.get('password')!.value,
          remember_me: this.loginForm.get('rememberMe')!.value
        }
      }));
    }
  }

}
