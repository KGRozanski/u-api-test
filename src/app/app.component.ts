import { Component, OnInit } from '@angular/core';

declare const google: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title: string = 'u-api-test';


  constructor() {}

  ngOnInit() {

      google.accounts.id.initialize({
        client_id: "995696971353-a56rf0rf3q01sdf44ohefkq0fpf9qut1.apps.googleusercontent.com"
      });

      // google.accounts.id.prompt(); // also display the One Tap dialog

  }



}
