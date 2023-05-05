import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SettingsActions } from '../../../actions/settings.actions';
import { SETTINGS_SELECTORS } from '../../../selectors/settings.selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Settings } from '../../../interfaces/store/settings.interface';
import { AuthService } from '../../../auth/auth.service';
import { getAccountInitial } from '../../../state/initials/account.initial';
import { AccountInfo } from '../../../interfaces/store/account-info.interface';
import { ACCOUNT_SELECTORS } from '../../../selectors/account.selectors';

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnDestroy {
	public darkMode = false;
	public settings$ = this.store.pipe(select(SETTINGS_SELECTORS.selectSettingsCollection));
	private readonly unsubscribe$: Subject<void> = new Subject();
	public account: AccountInfo = getAccountInitial();

	constructor(private store: Store, public authService: AuthService) {}

	public ngOnInit(): void {
		this.settings$.pipe(takeUntil(this.unsubscribe$)).subscribe((data: Settings) => {
			this.darkMode = data.darkMode;
		});
		this.store.select(ACCOUNT_SELECTORS.selectAccountCollection).subscribe((accountData) => {
			this.account = accountData;
		});
	}

	public ngOnDestroy(): void {
		this.unsubscribe$.next();
	}

	public darkModeChanged() {
		this.store.dispatch(SettingsActions.darkModeToggle({ darkMode: this.darkMode }));
	}

	public logout(): void {
		this.authService.logout();
	}
}
