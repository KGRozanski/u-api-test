import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { AccountActions } from 'src/app/core/actions/account.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private FB: FormBuilder, private US: UserService, private store: Store) { }

  public loginForm: FormGroup = this.FB.group({
    username: [null,
      [
        Validators.required, 
        Validators.min(3), 
        Validators.max(30), 
        Validators.pattern(/^[A-Za-z0-9_@.]+$/)
      ]
    ],
    password: [null,
      [
        Validators.required
      ]
    ]
  });

  ngOnInit(): void {
  }

  submit() {
    this.store.dispatch(AccountActions.login({ credentials: this.loginForm.value }));
  }

}
