import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private FB: FormBuilder, private US: UserService, private store: Store) {}
  
  public registerForm: FormGroup = this.FB.group({
    username: [null, 
      [
        Validators.required, 
        Validators.min(3), 
        Validators.max(30), 
        Validators.pattern(/^[A-Za-z0-9_]+$/)
      ]
    ],
    email: [null, 
      [
        Validators.required,
        Validators.max(30),
        Validators.email
      ]
    ],
    password: [null, 
      [
        Validators.required, 
        Validators.pattern(/(?=^.{12,64}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
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
