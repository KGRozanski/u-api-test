import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleAuthComponent } from './components/google-auth/google-auth.component';
import { TableOfUsersForAdminsComponent } from './components/table-of-users-for-admins/table-of-users-for-admins.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { RouterModule } from '@angular/router';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		RegisterFormComponent,
		LoginFormComponent,
		GoogleAuthComponent,
		TableOfUsersForAdminsComponent,
		AvatarComponent,
		ResetPasswordFormComponent,
		AccountInfoComponent,
	],
	imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule, HttpClientModule],
	exports: [
		RegisterFormComponent,
		LoginFormComponent,
		TableOfUsersForAdminsComponent,
		AvatarComponent,
		ResetPasswordFormComponent,
		AccountInfoComponent,
	],
})
export class UserModule {}
