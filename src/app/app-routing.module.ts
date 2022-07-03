import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './core/components/home/home-page.component';
import { LoginPageComponent } from './core/components/login/login-page.component';
import { RegisterPageComponent } from './core/components/register/register-page.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
