import { Injectable } from '@angular/core';
import { UserInfo } from '../../../core/interfaces/user-info.interface';
import { CookieService } from './cookie.service';
import jwt_decode from "jwt-decode";
import { TokenType } from 'src/app/core/enums/token-type.enum';
import { LogService } from './log.service';

@Injectable({providedIn: 'root'})
export class AccountService {
    private account: UserInfo = {
        username: '–',
        email: '–',
        givenName: '–',
        familyName: '–',
        photo: '–',
        creationDate: '–'
    }

    constructor(
        private cookies: CookieService,
        private logger: LogService
    ) { }

    
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
    
}
