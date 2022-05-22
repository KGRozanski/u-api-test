import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private FB: FormBuilder, private US: UserService) { }

  public loginForm: FormGroup = this.FB.group({
    username: [null,
      [
        Validators.required, 
        Validators.min(3), 
        Validators.max(30), 
        Validators.pattern(/^[A-Za-z0-9_@.]+$/)
      ]
    ],
    password: [null,
      [
        Validators.required
      ]
    ]
  });

  ngOnInit(): void {
  }

  submit() {
    this.US.login(this.loginForm.value).subscribe((res) => console.log(res))
  }

}
