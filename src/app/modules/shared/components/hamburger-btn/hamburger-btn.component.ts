import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SETTINGS_SELECTORS } from 'src/app/core/selectors/settings.selectors';

@Component({
	selector: 'app-hamburger-btn',
	templateUrl: './hamburger-btn.component.html',
	styleUrls: ['./hamburger-btn.component.scss'],
})
export class HamburgerBtnComponent implements OnInit {
	public hamburgerFlag = false;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.store.select(SETTINGS_SELECTORS.selectSettingsCollection).subscribe((settings) => {
			this.hamburgerFlag = settings.drawerVisibility;
		});
	}
}
