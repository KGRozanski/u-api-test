import { Component, OnDestroy, OnInit, resolveForwardRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AccountInfo } from 'src/app/core/interfaces/store/account-info.interface';
import { ACCOUNT_SELECTORS } from 'src/app/core/selectors/account.selectors';
import { getAccountInitial } from 'src/app/core/state/initials/account.initial';
import { UserService } from '../../services/user.service';
import { NotificationActions } from 'src/app/core/actions/notifications.actions';
import { NotificationType } from 'src/app/core/enums/notification-type.enum';
import { RegexSupplier } from '@fadein/commons';
import { ACCOUNT_ACTIONS } from 'src/app/core/actions/account.actions';
import { MatDialog } from '@angular/material/dialog';
import { CropImgComponent } from 'src/app/modules/shared/components/dialogs/crop-img/crop-img.component';

@Component({
	selector: 'app-account-info',
	templateUrl: './account-info.component.html',
	styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit, OnDestroy {
	public account: AccountInfo = getAccountInitial();
	public personalDetailsForm: UntypedFormGroup;
	private destroyed$: Subject<void> = new Subject();

	constructor(
		private store: Store,
		private fb: UntypedFormBuilder,
		private US: UserService,
		public dialog: MatDialog,
	) {
		this.personalDetailsForm = this.fb.group({
			givenName: [null, [Validators.pattern(RegexSupplier.onlyLettersWord_PL)]],
			familyName: [null, [Validators.pattern(RegexSupplier.onlyLettersWord_PL)]],
			email: [null, [Validators.required, Validators.pattern(RegexSupplier.email)]],
		});
	}

	ngOnInit(): void {
		this.store
			.select(ACCOUNT_SELECTORS.selectAccountCollection)
			.pipe(takeUntil(this.destroyed$))
			.subscribe((accountData) => {
				this.account = accountData;
				this.personalDetailsForm.setValue({
					familyName: this.account.familyName,
					givenName: this.account.givenName,
					email: this.account.email,
				});
			});
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
	}

	onSubmit(): void {
		if (!this.personalDetailsForm.valid) {
			return;
		}

		this.US.patchAccountInfo(this.personalDetailsForm.value).subscribe((data: any) => {
			this.store.dispatch(
				ACCOUNT_ACTIONS.update({
					AccountInfo: this.personalDetailsForm.getRawValue(),
				}),
			);
			this.store.dispatch(
				NotificationActions.push({
					notification: {
						type: NotificationType.SUCCESS,
						message: data['message'],
					},
				}),
			);
		});
	}

	public openCropImg(): void {
		const dialogRef = this.dialog.open(CropImgComponent, {
			width: '450px',
		});

		dialogRef.afterClosed().subscribe((imgData) => {
			if (imgData) {
				this.US.uploadAvatar(imgData).subscribe((res: any) => {
					this.store.dispatch(
						ACCOUNT_ACTIONS.update({
							AccountInfo: { photo: res['photoUrl'] } as any,
						}),
					);
					this.store.dispatch(
						NotificationActions.push({
							notification: {
								type: NotificationType.SUCCESS,
								message: res['message'],
							},
						}),
					);
				});
			}
		});
	}
}
