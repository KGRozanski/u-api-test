import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegexSupplier } from '@fadein/commons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NotificationActions } from 'src/app/core/actions/notifications.actions';
import { NotificationType } from 'src/app/core/enums/notification-type.enum';
import { CustomValidators } from 'src/app/core/validators/validators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnInit, OnDestroy {
  // flag that indicates that the form is in 'sendEmail' mode or already has 'token' query in url
  public sendingOrRevieving: boolean = true;
  private _token: string | null;
  private subscription: Subscription;
  public resetPasswordForm: FormGroup = this.fb.group({
    email: [null,
      [
        Validators.required, 
        Validators.min(3), 
        Validators.max(30), 
        Validators.pattern(RegexSupplier.email),
        Validators.email
      ]
    ]
  });
  public newPasswordForm: FormGroup = this.fb.group({
    password: [null,
      [
        Validators.required, 
        Validators.min(12), 
        Validators.max(64), 
        Validators.pattern(RegexSupplier.password)
      ]
    ],
    passwordConfirm: [null,
      [
        Validators.required, 
        Validators.min(12), 
        Validators.max(64), 
        Validators.pattern(RegexSupplier.password)
      ]
    ]
  }, {
    validators: CustomValidators.passwordEquality
  });
  
  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public US: UserService, public store: Store, public router: Router) {
    this.subscription = this.activatedRoute.queryParams.subscribe((data) => {
      if(data['token']) {
        this._token = data['token'];
        this.sendingOrRevieving = false;
      }
    })
  }

  ngOnInit(): void {
  }

  public submitEmail(): void {
    if(this.resetPasswordForm.valid) {
      this.US.sendPasswordResettingEmail(this.resetPasswordForm.get('email')!.value).subscribe((data: any) => {
        this.store.dispatch(NotificationActions.push({notification: {type: NotificationType.SUCCESS, message: data['message']}}));
      });
    }
  }

  public submitNewPassword(): void {
    if(this.newPasswordForm.valid && this._token) {
      this.US.resetPassword(
        this.newPasswordForm.get('password')!.value,
        this.newPasswordForm.get('passwordConfirm')!.value,
        this._token
        ).subscribe((data: any) => {
          this.store.dispatch(NotificationActions.push({notification: {type: NotificationType.SUCCESS, message: data['message']}}));
          this.router.navigate(['/login']);
      });
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
