import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CookieService } from "src/app/modules/shared/services/cookie.service";
import { UserCredentials } from "src/app/modules/user/interfaces/user-credentials.interface";
import { ApiLinksService } from "src/app/modules/user/services/api-links.service";
import { UserInfo } from "../interfaces/user-info.interface";
import jwt_decode from "jwt-decode";


@Injectable()
export class AuthService {
    constructor(private readonly http: HttpClient, private apiLinks: ApiLinksService, private cookies: CookieService) { }

    public init(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        })
    }

    public login(credentials: UserCredentials): Observable<Object> {
        const BODY = {
            ...credentials,
            grant_type: 'password',
            client_id: '2ca963453d271c5398e52d2510109217'
        }
    
        return this.http.post(this.apiLinks.apiLink + 'auth/local', BODY, {withCredentials: true});
    }

    public get userInfo(): UserInfo {
        const ID_TOKEN = this.cookies.getCookie('id_token');
        let decoded: UserInfo = {
            username: '–',
            email: '–',
            givenName: '–',
            familyName: '–',
            photo: '–',
            creationDate: '–'
        }

        if (ID_TOKEN) {
            decoded = jwt_decode(ID_TOKEN);
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

}
