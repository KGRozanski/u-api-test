import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './modules/user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthService } from './core/auth/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffect } from './core/effects/account.effect';
import { interceptorsProviders } from './core/interceptors/_interceptors';
import { NotificationsEffect } from './core/effects/notifications.effect';
import { FormsModule } from '@angular/forms';
import { metaReducers, reducers } from './core/reducers/_app.reducer';
import { HydrationEffects } from './core/effects/hydration.effect';
import { DropdownComponent } from './core/components/dropdown/dropdown.component';
import directives from './core/directives/_directives';
import { RegisterPageComponent } from './core/components/register/register-page.component';
import { LoginPageComponent } from './core/components/login/login-page.component';
import { HomePageComponent } from './core/components/home/home-page.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { PagenotfoundComponent } from './core/components/pagenotfound/pagenotfound.component';
import { LogotypeComponent } from './core/components/logotype/logotype.component';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DropdownComponent,
    RegisterPageComponent,
    LoginPageComponent,
    HomePageComponent,
    ...directives,
    FooterComponent,
    PagenotfoundComponent,
    LogotypeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    UserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AccountEffect, NotificationsEffect, HydrationEffects])
  ],
  providers: [
    interceptorsProviders,
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.initAuth(),
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
