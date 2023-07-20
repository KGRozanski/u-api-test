import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProxyHttpService {
    // private INT_API_URL = 'http://172.25.231.14:5002';
    private INT_API_URL = 'http://localhost:5002';
    constructor(private http: HttpClient) { }
    
    proxyGET(url: string, headers: string): Observable<any> {
        return this.http.get(this.INT_API_URL + url, { headers: JSON.parse(headers), observe: 'response' });
    }
}