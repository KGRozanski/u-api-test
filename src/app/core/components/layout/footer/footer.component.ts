import { Component } from '@angular/core';
import PACKAGE_JSON from '../../../../../../package.json';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent {
	public VERSION = PACKAGE_JSON.version;
	public CURRENT_YEAR = new Date().getFullYear();
}
