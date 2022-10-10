import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AccountInfo } from 'src/app/core/interfaces/account-info.interface';
import { ACCOUNT_SELECTORS } from 'src/app/core/selectors/account.selectors';
import { getAccountInitial } from 'src/app/core/state/initials/account.initial';
import { UserService } from '../../services/user.service';
import { NotificationActions } from 'src/app/core/actions/notifications.actions';
import { NotificationType } from 'src/app/core/enums/notification-type.enum';
import { RegexSupplier } from 'src/app/modules/shared/classes/RegexSupplier';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  public account: AccountInfo = getAccountInitial();
  public personalDetailsForm: FormGroup = this.fb.group({
    givenName: [null, [Validators.required, Validators.pattern(RegexSupplier.onlyLettersWord_PL)]],
    familyName: [null, [Validators.required, Validators.pattern(RegexSupplier.onlyLettersWord_PL)]],
    email: [null, [Validators.required, Validators.pattern(RegexSupplier.email)]]
  });
  private destroyed$: Subject<void> = new Subject();
  
  @ViewChild('personalDetailsFormDir') public personalDetailsFormDir: NgForm;

  constructor(private store: Store, private fb: FormBuilder, private US: UserService) {}

  ngOnInit(): void {
    this.store.select(ACCOUNT_SELECTORS.selectAccountCollection)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((accountData) => {
        this.account = accountData;
        this.hydratePersonalDetailsForm();
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

  onSubmit(): void {
    if(!this.personalDetailsForm.valid) {return;};
    this.US.patchAccountInfo(this.personalDetailsForm.value).subscribe((data: any) => {
      this.store.dispatch(NotificationActions.push({
        notification: {type: NotificationType.SUCCESS, message: data['message']}
      }));
    });
  }
}
