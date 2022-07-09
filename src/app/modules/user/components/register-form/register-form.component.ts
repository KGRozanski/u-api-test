import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../core/validators/validators';
import { UserService } from '../../services/user.service';

declare let google: any;

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  private googleScript: HTMLScriptElement = this.document.createElement("script");

  constructor(private FB: FormBuilder, private US: UserService, @Inject(DOCUMENT) private document: Document) {
    this.googleScript.src = "https://accounts.google.com/gsi/client";
    this.document.body.appendChild(this.googleScript);
  }
  
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

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.googleScript.onload = () => {
      google.accounts.id.initialize({
        client_id: "995696971353-a56rf0rf3q01sdf44ohefkq0fpf9qut1.apps.googleusercontent.com"
      });
    };
  }

  submit() {
    this.US.register(this.registerForm.value).subscribe((res) => {
      console.log(res)
    })
  }

}
