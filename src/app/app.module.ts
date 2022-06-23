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
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
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
      useFactory: (authService: AuthService) => () => authService.init(),
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
