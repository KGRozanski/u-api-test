import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivationComponent } from './core/components/pages/activation/activation.component';
import { FrontComponent } from './core/components/pages/front/front.component';
import { HomeComponent } from './core/components/pages/home/home.component';
import { LoginComponent } from './core/components/pages/login/login.component';
import { NotfoundComponent } from './core/components/pages/notfound/notfound.component';
import { RegisterComponent } from './core/components/pages/register/register.component';
import { SettingsComponent } from './core/components/pages/settings/settings.component';
import { AuthGuard } from './core/guards/authGuard.guard';
import { NoAuthGuard } from './core/guards/noAuthGuard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'front', component: FrontComponent, canActivate: [NoAuthGuard] },
  { path: 'activation', component: ActivationComponent, canActivate: [NoAuthGuard] },
  { path: 'home', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
