import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';

declare let google: any;

@Component({
    selector: 'app-google-auth',
    templateUrl: './google-auth.component.html',
    styleUrls: ['./google-auth.component.scss'],
    standalone: false
})
export class GoogleAuthComponent implements AfterViewInit {
	private googleScript: HTMLScriptElement = this.document.createElement('script');

	constructor(@Inject(DOCUMENT) private document: Document) {
		this.googleScript.src = 'https://accounts.google.com/gsi/client';
		this.document.body.appendChild(this.googleScript);
	}

	ngAfterViewInit(): void {
		//Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
		//Add 'implements AfterViewInit' to the class.
		this.googleScript.onload = () => {
			google.accounts.id.initialize({
				client_id: '995696971353-a56rf0rf3q01sdf44ohefkq0fpf9qut1.apps.googleusercontent.com',
			});
		};
	}
}
