import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser } from '../interfaces/register-user.interface';
import { UserCredentials } from '../interfaces/user-credentials.interface';
import { ApiLinksService } from './api-links.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient, private apiLinks: ApiLinksService,) { }


  public register(user: RegisterUser): Observable<Object> {
    return this.http.post(this.apiLinks.apiLink + 'accounts', user);
  }

}
//Zaq1@wsx1234