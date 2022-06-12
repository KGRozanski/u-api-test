import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserCredentials } from "src/app/modules/user/interfaces/user-credentials.interface";
import { ApiLinksService } from "src/app/modules/user/services/api-links.service";


@Injectable()
export class AuthService {
    constructor(private readonly http: HttpClient, private apiLinks: ApiLinksService) { }

    public init(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        })
    }

    public login(credentials: UserCredentials): Observable<Object> {
        console.log(credentials)

        const BODY = {
            ...credentials,
            grant_type: 'password',
            client_id: '2ca963453d271c5398e52d2510109217'
        }
    
        return this.http.post(this.apiLinks.apiLink + 'auth/local', BODY, {withCredentials: true});
    }
    
}
