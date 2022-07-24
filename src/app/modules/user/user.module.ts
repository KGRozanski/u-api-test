import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleAuthComponent } from './components/google-auth/google-auth.component';


@NgModule({
  declarations: [
    RegisterFormComponent,
    LoginFormComponent,
    GoogleAuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    RegisterFormComponent,
    LoginFormComponent
  ]
})
export class UserModule { }
