import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInfo } from 'src/app/core/interfaces/user-info.interface';
import { ACCOUNT_SELECTORS } from 'src/app/core/selectors/account.selectors';
import { getAccountInitial } from 'src/app/core/state/initials/account.initial';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public account: UserInfo = getAccountInitial();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(ACCOUNT_SELECTORS.selectAccountCollection).subscribe((accountData) => {
      this.account = accountData;
    });
  }

  public get dateOfRegistration(): string {
    const DATE = new Date(Number(this.account.creationDate)).toISOString();
    const SPLITTED = DATE.split('T')[0];

    return SPLITTED
  }

}
