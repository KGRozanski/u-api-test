import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry } from "rxjs";
import { CookieService } from "src/app/modules/shared/services/cookie.service";
import { UserCredentials } from "src/app/modules/user/interfaces/user-credentials.interface";
import { ApiLinksService } from "src/app/modules/user/services/api-links.service";
import { UserInfo } from "../interfaces/user-info.interface";
import jwt_decode from "jwt-decode";
import { TokenType } from "../enums/token-type.enum";
import { JWT } from "../interfaces/jwt.interface";
import { Router } from "@angular/router";
import { LogService } from "src/app/modules/shared/services/log.service";
import { elapsedTimeFormatter } from "../utils/elapsedTimeFormatter";


@Injectable()
export class AuthService {
    private _oidcTokenTimeout = 35985000;
    private _accessTokenTimeout = 3585000;
    private _authenticatedCookieExp = 604790;
    
    constructor(
        private readonly http: HttpClient,
        private apiLinks: ApiLinksService,
        private cookies: CookieService,
        private router: Router,
        private logger: LogService
    ) {}

    public initAuth(): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {
            if(this.cookies.doesCookieExist(TokenType.LOGGED_IN_WITH)) {
                this.setTokenTimeout(this._accessTokenTimeout, TokenType.ACCESS_TOKEN);
                this.setTokenTimeout(this._oidcTokenTimeout, TokenType.ID_TOKEN);
                this.setupSuccessAuthFlag();
                resolve(true);
                return;
            }

            if(!this.cookies.doesCookieExist('authenticated')) {
                resolve(true);
                return;
            }

            this.sendRefreshReq(TokenType.ACCESS_TOKEN)
                .subscribe({
                    error: err => {
                        resolve(true);
                    },
                    complete: () => {
                        this.logInfo(TokenType.ACCESS_TOKEN);
                        this.setTokenTimeout(this._accessTokenTimeout, TokenType.ACCESS_TOKEN);
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
        setTimeout(() => {
            this.sendRefreshReq(type)
                .pipe(retry(2))
                .subscribe({
                    error: (err) => {
                        this.logger.log(`⛔ Token: ${type.toUpperCase()} couldn't been refreshed! – ${err.error.statusCode} ${err.error.message}`)
                    },
                    complete: () => {
                        const NEW_DELAY = (type === TokenType.ACCESS_TOKEN) ? this._accessTokenTimeout : this._oidcTokenTimeout;
                        this.logInfo(type);
                        this.setTokenTimeout(NEW_DELAY, type);
                        this.setupSuccessAuthFlag();
                    }
                });
        }, timeout);
    }


    /**
     * Set the cookie to be a flag: `authenticated=true`
     * of successful authentication. It's used to inform initAuth function
     * to not send refresh request as client has no OAuth cookies
     */
    public setupSuccessAuthFlag(): void {
        this.cookies.setCookie('authenticated', 'true', new Date(Date.now() + (this._authenticatedCookieExp * 1000)).toString());
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

    public sendRefreshReq(tokenType: TokenType): Observable<HttpResponse<Object> | HttpErrorResponse> {
        return this.http.post<HttpResponse<Object> | HttpErrorResponse>(this.apiLinks.apiLink + 'auth/token?refresh=' + tokenType, {}, {withCredentials: true, observe: 'response'});
    }





}
