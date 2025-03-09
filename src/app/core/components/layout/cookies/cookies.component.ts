import { Component } from '@angular/core';
import { CookieService } from 'src/app/modules/shared/services/cookie.service';

@Component({
    selector: 'app-cookies',
    templateUrl: './cookies.component.html',
    styleUrls: ['./cookies.component.scss'],
    standalone: false
})
export class CookiesComponent {
	public visibility = true;

	constructor(private cookieService: CookieService) {
		if (cookieService.getCookie('cookies_policy')) {
			this.visibility = false;
		}
	}

	public accept() {
		this.visibility = !this.visibility;
		this.cookieService.setCookieWithExpInDays('cookies_policy', 'accepted');
	}
}
