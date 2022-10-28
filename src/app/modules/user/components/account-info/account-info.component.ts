import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { AccountInfo } from 'src/app/core/interfaces/account-info.interface';
import { ACCOUNT_SELECTORS } from 'src/app/core/selectors/account.selectors';
import { getAccountInitial } from 'src/app/core/state/initials/account.initial';
import { UserService } from '../../services/user.service';
import { NotificationActions } from 'src/app/core/actions/notifications.actions';
import { NotificationType } from 'src/app/core/enums/notification-type.enum';
import { RegexSupplier } from '@fadein/commons';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  public account: AccountInfo = getAccountInitial();
  public personalDetailsForm: FormGroup;
  private destroyed$: Subject<void> = new Subject();
  
  constructor(private store: Store, private fb: FormBuilder, private US: UserService) {}

  ngOnInit(): void {
    this.store.select(ACCOUNT_SELECTORS.selectAccountCollection)
      .pipe(
        take(1),
        takeUntil(this.destroyed$)
      )
      .subscribe((accountData) => {
        this.account = accountData;
        this.buildForm();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  onSubmit(): void {
    if(!this.personalDetailsForm.valid) {return;};
    this.US.patchAccountInfo(this.personalDetailsForm.value).subscribe((data: any) => {
      this.store.dispatch(NotificationActions.push({
        notification: {type: NotificationType.SUCCESS, message: data['message']}
      }));
    });
  }

  private buildForm(): void {
    this.personalDetailsForm = this.fb.group({
      givenName: [this.account.givenName, [Validators.required, Validators.pattern(RegexSupplier.onlyLettersWord_PL)]],
      familyName: [this.account.familyName, [Validators.required, Validators.pattern(RegexSupplier.onlyLettersWord_PL)]],
      email: [this.account.email, [Validators.required, Validators.pattern(RegexSupplier.email)]]
    });
  }
}
