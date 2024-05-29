import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AccountInfo } from 'src/app/core/interfaces/store/account-info.interface';
import { ACCOUNT_SELECTORS } from 'src/app/core/selectors/account.selectors';
import { getAccountInitial } from 'src/app/core/state/initials/account.initial';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss']
})
export class BusinessCardComponent {
	public account: AccountInfo = getAccountInitial();

  constructor(private store: Store) {}

	public ngOnInit(): void {
		this.store.select(ACCOUNT_SELECTORS.selectAccountCollection).subscribe((accountData: AccountInfo) => {
			this.account = accountData;
		});
	}


}
