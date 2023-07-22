import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProxyHttpService {
    private INT_API_URL = 'http://172.25.231.14:5002';
    // private INT_API_URL = 'http://localhost:5002';
    constructor(private http: HttpClient) { }
    
    proxyGET(url: string, headers: string): Observable<HttpResponse<any>> {
        return this.http.get(this.INT_API_URL + url, { headers: JSON.parse(headers), observe: 'response' });
    }

    proxyPOST(url: string, headers: string, body: string): Observable<HttpResponse<any>> {
        return this.http.post(this.INT_API_URL + url, body,{ headers: JSON.parse(headers), observe: 'response' });
    }

    proxyPUT(url: string, headers: string, body: string): Observable<HttpResponse<any>> {
        return this.http.put(this.INT_API_URL + url, body,{ headers: JSON.parse(headers), observe: 'response' });
    }

    proxyPATCH(url: string, headers: string, body: string): Observable<HttpResponse<any>> {
        return this.http.patch(this.INT_API_URL + url, body,{ headers: JSON.parse(headers), observe: 'response' });
    }

    proxyDELETE(url: string, headers: string): Observable<HttpResponse<any>> {
        return this.http.delete(this.INT_API_URL + url,{ headers: JSON.parse(headers), observe: 'response' });
    }
}
