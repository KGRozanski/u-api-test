import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser } from '../interfaces/register-user.interface';
import { ApiLinksService } from './api-links.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient, private apiLinks: ApiLinksService,) { }


  public register(user: RegisterUser): Observable<Object> {
    return this.http.post(this.apiLinks.apiLink + 'accounts', user);
  }

  public getListOfUsers(page: number, pageSize: number, order: 'ASC' | 'DESC'): Observable<any> {

    let params = new HttpParams();
      params = params.append("page", page);
      params = params.append("pageSize", pageSize);
      params = params.append("order", order);

    return this.http.get(this.apiLinks.apiLink + 'accounts', {params: params, withCredentials: true});
  }

}
//Zaq1@wsx1234