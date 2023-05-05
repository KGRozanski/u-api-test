import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
declare const cookieStore: any;
@Injectable({
	providedIn: 'root',
})
export class CookieService {
	constructor(@Inject(DOCUMENT) private document: Document) {}

	public getCookie(name: string): string {
		const value = `; ${this.document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop()?.split(';').shift() ?? '';
		else return '';
	}

	public setCookie(name: string, value: string, exp: string) {
		this.document.cookie = name + '=' + value + '; expires=' + exp + '; path=/;';
	}

	/**
	 * Sets the cookie with expiration date extended by {n} number of days
	 * @param name cookie name
	 * @param value cookie value
	 * @param exp cookie expiration in days (max and default is 400 due to rfc)
	 */
	public setCookieWithExpInDays(name: string, value: string, exp = 400) {
		const date = new Date();
		if (!!exp && exp > 0) {
			date.setDate(new Date().getDate() + exp);
		} else {
			throw new Error('Incorrent cookie expiration time: ' + exp);
		}

		this.setCookie(name, value, date.toString());
	}

	public removeCookie(name: string) {
		document.cookie = name + '=; Max-Age=-99999999;';
	}

	public async getCookieExpDate(cookieName: string): Promise<number | null> {
		return await cookieStore.get(cookieName).then((cookie: any) => {
			if (cookie) {
				return cookie.expires;
			} else {
				return null;
			}
		});
	}
}
