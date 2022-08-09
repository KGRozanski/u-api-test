import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './core/components/pages/home/home-page.component';
import { LoginComponent } from './core/components/pages/login/login.component';
import { NotfoundComponent } from './core/components/pages/notfound/notfound.component';
import { RegisterComponent } from './core/components/pages/register/register.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
