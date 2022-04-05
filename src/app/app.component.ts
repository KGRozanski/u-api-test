import { Component } from '@angular/core';

declare const google: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'u-api-test';


  constructor() {
  }

  ngOnInit() {


      google.accounts.id.initialize({
        client_id: "995696971353-a56rf0rf3q01sdf44ohefkq0fpf9qut1.apps.googleusercontent.com",
        callback: this.handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    
  }


  public handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
  }
}
