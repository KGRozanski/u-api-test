import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexSupplier } from '@fadein/commons';
import { Store } from '@ngrx/store';
import { NotificationActions } from 'src/app/core/actions/notifications.actions';
import { NotificationType } from 'src/app/core/enums/notification-type.enum';
import { CustomValidators } from '../../../../core/validators/validators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  constructor(private fb: FormBuilder, private US: UserService, private store: Store) {}
  
  public registerForm: FormGroup = this.fb.group({
    username: [null, 
      [
        Validators.required, 
        Validators.min(3), 
        Validators.max(30), 
        Validators.pattern(RegexSupplier.username)
      ]
    ],
    email: [null, 
      [
        Validators.required,
        Validators.max(30),
        Validators.pattern(RegexSupplier.email)
      ]
    ],
    password: [null, 
      [
        Validators.required, 
        Validators.pattern(RegexSupplier.password)
      ]
    ],
    passwordConfirm: [null, 
      [
        Validators.required
      ]
    ],
    statute: [null, 
      [
        Validators.requiredTrue
      ]
    ]
  },  {
    validators: CustomValidators.passwordEquality
  });



  submit() {
    this.US.register(this.registerForm.value).subscribe((res: any) => {
      this.store.dispatch(NotificationActions.push({notification: {type: NotificationType.SUCCESS, message: res['message']}}));
    });
  }

}
