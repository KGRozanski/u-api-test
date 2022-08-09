import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable, retry } from "rxjs";
import { CookieService } from "src/app/modules/shared/services/cookie.service";
import { UserCredentials } from "src/app/modules/user/interfaces/user-credentials.interface";
import { ApiLinksService } from "src/app/modules/user/services/api-links.service";
import { UserInfo } from "../interfaces/user-info.interface";
import jwt_decode from "jwt-decode";
import { TokenType } from "../enums/token-type.enum";
import { JWT } from "../interfaces/jwt.interface";
import { LogService } from "src/app/modules/shared/services/log.service";
import { elapsedTimeFormatter } from "../utils/elapsedTimeFormatter";
import { AccountActions } from "../actions/account.actions";
import { select, Store } from "@ngrx/store";
import { ACCOUNT_SELECTORS } from "../selectors/account.selectors";
import { Router } from "@angular/router";
import { SettingsActions } from "../actions/settings.actions";


@Injectable()
export class AuthService {
    private _oidcTokenTimeout = 35985000;
    private _accessTokenTimeout = 3585000;
    private _authenticatedCookieExp = 604790;
    private account: UserInfo = {
        username: '–',
        email: '–',
        givenName: '–',
        familyName: '–',
        photo: '–',
        creationDate: '–'
    }
    private account$: Observable<UserInfo> = this.store.pipe(select(ACCOUNT_SELECTORS.selectAccountCollection));
    private timeoutsQueue: NodeJS.Timeout[] = [];
    
    constructor(
        private readonly http: HttpClient,
        private apiLinks: ApiLinksService,
        private cookies: CookieService,
        private logger: LogService,
        private store: Store, 
        private router: Router
    ) {
        this.account$.subscribe((accountData) => {
            this.account = accountData;
        });
    }

    public initAuth(): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {
            if(this.cookies.doesCookieExist(TokenType.LOGGED_IN_WITH)) {
                this.setTokenTimeout(this._accessTokenTimeout, TokenType.ACCESS_TOKEN);
                this.setTokenTimeout(this._oidcTokenTimeout, TokenType.ID_TOKEN);
                this.store.dispatch(AccountActions.loginSuccess({userInfo: this.userInfo}));
                this.setupSuccessAuthFlag();
                this.router.navigate(['']);
                resolve(true);
                return;
            }

            if(!this.cookies.doesCookieExist('authenticated')) {
                this.store.dispatch(AccountActions.clearAccountData());
                resolve(true);
                return;
            }

            this.sendRefreshReq(TokenType.ACCESS_TOKEN)
                .subscribe({
                    error: err => {
                        this.store.dispatch(AccountActions.clearAccountData());
                        resolve(true);
                    },
                    complete: () => {
                        this.logInfo(TokenType.ACCESS_TOKEN);
                        this.setTokenTimeout(this._accessTokenTimeout, TokenType.ACCESS_TOKEN);
                        this.store.dispatch(AccountActions.loginSuccess({userInfo: this.userInfo}));
                        this.setupSuccessAuthFlag();

                        try {
                            const DECODED: JWT = jwt_decode(this.cookies.getCookie(TokenType.ID_TOKEN)!);
                            const CURRENT_OIDC_TIMEOUT = (Number(DECODED.exp) * 1000) - Date.now();

                            if(CURRENT_OIDC_TIMEOUT > 18000) {
                                this.setTokenTimeout(CURRENT_OIDC_TIMEOUT - 15000, TokenType.ID_TOKEN);
                            } else {
                                this.setTokenTimeout(0, TokenType.ID_TOKEN);
                            }

                        } catch (err) {
                            this.logger.log(`⚠️ Invalid ${TokenType.ID_TOKEN.toUpperCase()} – trying to refresh`);
                            this.setTokenTimeout(0, TokenType.ID_TOKEN);
                            resolve(true);
                            return;
                        }

                        resolve(true);
                    },
            });
        })
    }


    /**
     * 
     * @param timeout timeout to refresh in milliseconds
     * @param type type of token to be refreshed
     */
    public setTokenTimeout(timeout: number, type: TokenType) {
        this.logger.log(`⌛ Timout to refresh ${type.toUpperCase()} has been set on: ${elapsedTimeFormatter(timeout)}`);
        const timeoutID = setTimeout(() => {
            this.sendRefreshReq(type)
                .pipe(retry(2))
                .subscribe({
                    error: (err) => {
                        this.store.dispatch(AccountActions.clearAccountData());
                        this.logger.log(`⛔ Token: ${type.toUpperCase()} couldn't been refreshed! – ${err.error.statusCode} ${err.error.message}`)
                    },
                    complete: () => {
                        const NEW_DELAY = (type === TokenType.ACCESS_TOKEN) ? this._accessTokenTimeout : this._oidcTokenTimeout;
                        this.logInfo(type);
                        this.setTokenTimeout(NEW_DELAY, type);
                    }
                });
        }, timeout);

        this.timeoutsQueue.push(timeoutID);

    }

    public clearAllTimeouts(): void {
        const AMOUNT = this.timeoutsQueue.length;

        for (const timeout of this.timeoutsQueue) {
            clearTimeout(timeout);
        }

        this.logger.log(`🚽 ${AMOUNT} tokens timeouts has been cleared!`);
    }


    /**
     * Set the cookie: `authenticated=true`
     * It's used as a flag of successful authentication, to inform initAuth function
     * to not send refresh requests, because client has no OAuth cookies
     */
    public async setupSuccessAuthFlag(): Promise<void> {
        const REMEMBER_ME = await this.cookies.getCookieExpDate('id_token');
        const EXP_TIME = REMEMBER_ME ? new Date(Date.now() + (this._authenticatedCookieExp * 1000)).toString() : '0';
        this.cookies.setCookie('authenticated', 'true', EXP_TIME);
    }

    public get userInfo(): UserInfo {
        const ID_TOKEN = this.cookies.getCookie(TokenType.ID_TOKEN);
        let decoded: UserInfo;

        try {
            decoded = jwt_decode(ID_TOKEN || '');
        } catch(err) {
            this.logger.log(`Error durning decoding an ${TokenType.ID_TOKEN}: ${err}`);
            return this.account;
        }

        return {
            username: decoded.username,
            email: decoded.email,
            givenName: decoded.givenName,
            familyName: decoded.familyName,
            photo: decoded.photo,
            creationDate: decoded.creationDate
        }
    }

    /**
     * Void to be run after successful authentication. Sets up the session token refresh timeouts and flag cookies
     */
    public postSignIn(): void {
        // SET TIMEOUTS HERE ⚠️⚠️⚠️
        this.setTokenTimeout(this._accessTokenTimeout, TokenType.ACCESS_TOKEN);
        this.setTokenTimeout(this._oidcTokenTimeout, TokenType.ID_TOKEN);
        this.setupSuccessAuthFlag();
        //fulfill store with user data
        this.store.dispatch(AccountActions.loginSuccess({userInfo: this.userInfo}));
        this.router.navigate(['']);
        
    }

    // public handleError(err: any): Observable<any> {
    //     if (err.status === 401) {
    //         this.router.navigate(['']);
    //     }
    //     throw(err);
    // }

    public logInfo(type: TokenType): void {
        this.logger.log((type === TokenType.ACCESS_TOKEN) ? 
            `🔑 Access token refreshed! ` : 
            `🆔 ID token refreshed`
        );
    }


    public login(credentials: UserCredentials): Observable<Object> {
        const BODY = {
            ...credentials,
            grant_type: 'password',
            client_id: '2ca963453d271c5398e52d2510109217'
        }
    
        return this.http.post(this.apiLinks.apiLink + 'auth/local', BODY, {withCredentials: true});
    }

    public logout(): void {
        this.store.dispatch(SettingsActions.loaderToggle({loaderVisibility: true}));
        this.cookies.removeCookie('authenticated');
        this.clearAllTimeouts();
        this.router.navigate(['']);
        this.http.post<HttpResponse<Object> | HttpErrorResponse>(this.apiLinks.apiLink + 'auth/logout', null, {withCredentials: true, observe: 'response'})
            .pipe(finalize(() => {
                this.store.dispatch(SettingsActions.loaderToggle({loaderVisibility: false}));
            }))
            .subscribe(() => {
                this.store.dispatch(AccountActions.clearAccountData());
            });
    }

    public sendRefreshReq(tokenType: TokenType): Observable<HttpResponse<Object> | HttpErrorResponse> {
        return this.http.post<HttpResponse<Object> | HttpErrorResponse>(this.apiLinks.apiLink + 'auth/token?refresh=' + tokenType, {}, {withCredentials: true, observe: 'response'});
    }

    public get isAuthenticated(): boolean {
        if(this.account.email === '–' || this.account.email === '') {
            return false;
        } else {
            return true;
        }
    }

}
