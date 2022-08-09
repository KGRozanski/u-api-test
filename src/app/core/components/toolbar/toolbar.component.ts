import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';
import { UserInfo } from '../../interfaces/user-info.interface';
import { ACCOUNT_SELECTORS } from '../../selectors/account.selectors';
import { SettingsSelectors } from '../../selectors/settings.selectors';
import { getAccountInitial } from '../../state/initials/account.initial';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public isDropdownVisible: boolean = false;
  public account: UserInfo = getAccountInitial();


  constructor(private store: Store, public authService: AuthService) { }

  public ngOnInit(): void {
    this.store.select(ACCOUNT_SELECTORS.selectAccountCollection).subscribe((accountData) => {
      this.account = accountData;
    });
  }


  public toggleDropdown(onlyDisable?: boolean): void {
    if (onlyDisable) {
      this.isDropdownVisible = false;
    } else {
      this.isDropdownVisible = !this.isDropdownVisible;
    }
  }


}
