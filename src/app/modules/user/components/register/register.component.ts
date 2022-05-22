import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../../app/core/validators/validators';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private FB: FormBuilder, private US: UserService) { }
  
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
  
  
  ngOnInit(): void {}


  submit() {
    this.US.register(this.registerForm.value).subscribe((res) => {
      console.log(res)
    })
  }



}
