import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { b64toBlob } from 'src/app/core/utils/functions/b64toBlob';
import { RegisterUser } from '../interfaces/register-user.interface';
import { UpdateAccountDto } from '../interfaces/update-account.dto.interface';
import { ApiLinksService } from './api-links.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private readonly http: HttpClient,
        private apiLinks: ApiLinksService,
        private authService: AuthService
    ) {}

    public register(user: RegisterUser): Observable<Object> {
        return this.http.post(this.apiLinks.apiLink + 'accounts', user);
    }

    public getListOfUsers(page: number, pageSize: number, order: 'ASC' | 'DESC'): Observable<any> {
        let params = new HttpParams();
        params = params.append('page', page);
        params = params.append('pageSize', pageSize);
        params = params.append('order', order);

        return this.http.get(this.apiLinks.apiLink + 'accounts', {
            params: params,
            withCredentials: true
        });
    }

    public banUser(id: number): Observable<Object> {
        return this.http.post(this.apiLinks.apiLink + 'accounts/ban/' + id, null, {
            withCredentials: true
        });
    }

    public sendPasswordResettingEmail(email: string): Observable<Object> {
        return this.http.post(this.apiLinks.apiLink + 'accounts/password', { email }, { withCredentials: true });
    }

    public resetPassword(password: string, passwordConfirm: string, token: string): Observable<Object> {
        let params = new HttpParams();
        params = params.append('token', token);

        return this.http.patch(
            this.apiLinks.apiLink + 'accounts/password',
            { password, passwordConfirm },
            { params, withCredentials: true }
        );
    }

    public patchAccountInfo(formData: UpdateAccountDto): Observable<Object> {
        return this.http.patch(this.apiLinks.apiLink + 'accounts/' + this.authService.AccountInfo.sub, formData, {
            withCredentials: true
        });
    }

    public uploadAvatar(avatarData: string): Observable<Object> {
        const formData = new FormData();

        const file = new File([b64toBlob(avatarData.split(',')[1])], 'avatar.webp', {
            type: 'image/webp',
            lastModified: Date.now()
        });

        formData.append('avatar', file, 'avatar.webp');

        return this.http.post(this.apiLinks.apiLink + 'accounts/avatarUpload', formData, { withCredentials: true });
    }
}
//Zaq1@wsx1234
