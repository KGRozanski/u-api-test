import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, skipWhile, Subject, takeUntil } from 'rxjs';
import { AccountInfo } from 'src/app/core/interfaces/account-info.interface';
import { ACCOUNT_SELECTORS } from 'src/app/core/selectors/account.selectors';
import { getAccountInitial } from 'src/app/core/state/initials/account.initial';
import { cloneDeep, isEqual } from 'lodash';
import { UserService } from '../../services/user.service';
import { NotificationActions } from 'src/app/core/actions/notifications.actions';
import { NotificationType } from 'src/app/core/enums/notification-type.enum';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  public account: AccountInfo = getAccountInitial();
  public personalDetailsForm: FormGroup = this.fb.group({
    givenName: [null],
    familyName: [null],
    email: [null]
  });
  private destroyed$: Subject<void> = new Subject<void>();

  constructor(private store: Store, private fb: FormBuilder, private US: UserService) {}

  ngOnInit(): void {
    this.store.select(ACCOUNT_SELECTORS.selectAccountCollection).subscribe((accountData) => {
      this.account = accountData;
      this.hydratePersonalDetailsForm();
      this.startFormValueListener();
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
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

  private startFormValueListener(): void {
    const CACHED_FORM_VAL = cloneDeep(this.personalDetailsForm.value);
    this.personalDetailsForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        skipWhile((initValue) => {
          return isEqual(initValue, CACHED_FORM_VAL);
        }),
        distinctUntilChanged((prev, curr) => isEqual(prev, curr))
      )
      .subscribe((value) => {
        this.US.patchAccountInfo(value).subscribe((data: any) => {
          this.store.dispatch(NotificationActions.push({notification: {type: NotificationType.SUCCESS, message: data['message']}}))
        });
      });
  }


}
