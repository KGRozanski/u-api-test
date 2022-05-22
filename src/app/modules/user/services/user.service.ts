import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser } from '../interfaces/register-user.interface';
import { UserCredentials } from '../interfaces/user-credentials.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }


  public register(user: RegisterUser): Observable<Object> {
    return this.http.post('http://localhost:3000/api/accounts', user);
  }

  public login(credentials: UserCredentials): Observable<Object> {

    const BODY = {
      ...credentials,
      grant_type: 'password',
      client_id: '2ca963453d271c5398e52d2510109217'
    }

    return this.http.post('http://localhost:3000/api/auth/local', BODY);
  }
}
//Zaq1@wsx1234