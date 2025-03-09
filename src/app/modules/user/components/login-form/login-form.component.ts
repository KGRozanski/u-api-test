import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ACCOUNT_ACTIONS } from 'src/app/core/actions/account.actions';
import { SettingsActions } from 'src/app/core/actions/settings.actions';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    standalone: false
})
export class LoginFormComponent {
	constructor(private fb: UntypedFormBuilder, private store: Store) {}

	public loginForm: UntypedFormGroup = this.fb.group({
		username: [null, [Validators.required, Validators.min(3), Validators.max(30)]],
		password: [null, [Validators.required]],
		rememberMe: [false],
	});

	submit() {
		if (this.loginForm.valid) {
			this.store.dispatch(SettingsActions.loaderToggle({ loaderVisibility: true }));
			this.store.dispatch(
				ACCOUNT_ACTIONS.login({
					credentials: {
						username: this.loginForm.get('username')?.value,
						password: this.loginForm.get('password')?.value,
						remember_me: this.loginForm.get('rememberMe')?.value,
					},
				}),
			);
		}
	}
}
