import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(@Inject(DOCUMENT) private document: Document) { }


  public getCookie(name: string) {
    const value = `; ${this.document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    else return undefined;
  }

  public setCookie(name: string, value: string, exp: string) {
    this.document.cookie = name + '=' + value + '; expires=' + exp+ '; path=/;';
  }

  public doesCookieExist(name: string): boolean {
    return !!this.getCookie(name);
  }

}
