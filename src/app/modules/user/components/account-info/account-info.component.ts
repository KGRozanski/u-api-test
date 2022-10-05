import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs';
import { AccountInfo } from 'src/app/core/interfaces/account-info.interface';
import { ACCOUNT_SELECTORS } from 'src/app/core/selectors/account.selectors';
import { getAccountInitial } from 'src/app/core/state/initials/account.initial';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
  public account: AccountInfo = getAccountInitial();
  public personalDetailsForm: FormGroup = this.fb.group({
    givenName: [null],
    familyName: [null],
    email: [null]
  });

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.store.select(ACCOUNT_SELECTORS.selectAccountCollection).subscribe((accountData) => {
      this.account = accountData;
      this.hydratePersonalDetailsForm();
    });

    this.personalDetailsForm.valueChanges
      .pipe(
        distinctUntilChanged((prev, curr) => isEqual(prev, curr))
      )
      .subscribe((form) => {
        console.log(this.personalDetailsForm.value);
      });
  }

  private hydratePersonalDetailsForm(): void {
    if (this.account) {
      this.personalDetailsForm.setValue({
        givenName: this.account.givenName,
        familyName: this.account.familyName,
        email: this.account.email
      });
    }
  }


}
