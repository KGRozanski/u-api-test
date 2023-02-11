import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './modules/user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { ToolbarComponent } from './core/components/layout/toolbar/toolbar.component';
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
import { DropdownComponent } from './core/components/layout/dropdown/dropdown.component';
import { RegisterComponent } from './core/components/pages/register/register.component';
import { LoginComponent } from './core/components/pages/login/login.component';
import { FrontComponent } from './core/components/pages/front/front.component';
import { FooterComponent } from './core/components/layout/footer/footer.component';
import { NotfoundComponent } from './core/components/pages/notfound/notfound.component';
import { LogotypeComponent } from './core/components/layout/logotype/logotype.component';
import { SettingsComponent } from './core/components/pages/settings/settings.component';
import { LoadingIndicatorComponent } from './core/components/layout/loading-indicator/loading-indicator.component';
import { HomeComponent } from './core/components/pages/home/home.component';
import { GUARD_PROVIDERS } from './core/guards/_guards';
import { ResponseComponent } from './core/components/pages/response/response.component';
import { AdminDashboardComponent } from './core/components/pages/admin-dashboard/admin-dashboard.component';
import { RESOLVERS_PROVIDERS } from './core/resolvers/_resolvers';
import { DialogConfirmComponent } from './core/components/layout/dialog-confirm/dialog-confirm.component';
import { ResetPasswordComponent } from './core/components/pages/reset-password/reset-password.component';
import { CookiesComponent } from './core/components/layout/cookies/cookies.component';

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        DropdownComponent,
        RegisterComponent,
        LoginComponent,
        FrontComponent,
        FooterComponent,
        NotfoundComponent,
        LogotypeComponent,
        SettingsComponent,
        LoadingIndicatorComponent,
        HomeComponent,
        ResponseComponent,
        AdminDashboardComponent,
        DialogConfirmComponent,
        ResetPasswordComponent,
        CookiesComponent
    ],
    providers: [
        interceptorsProviders,
        ...GUARD_PROVIDERS,
        ...RESOLVERS_PROVIDERS,
        AuthService,
        {
            provide: APP_INITIALIZER,
            useFactory: (authService: AuthService) => () => authService.initAuth(),
            deps: [AuthService],
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        SharedModule,
        UserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),
        EffectsModule.forRoot([AccountEffect, NotificationsEffect, HydrationEffects])
    ]
})
export class AppModule {}
