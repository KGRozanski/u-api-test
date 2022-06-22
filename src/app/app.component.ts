import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsSelectors } from './core/selectors/settings.selectors';

declare const google: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title: string = 'u-api-test';


  constructor(
    private store: Store,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit() {

      google.accounts.id.initialize({
        client_id: "995696971353-a56rf0rf3q01sdf44ohefkq0fpf9qut1.apps.googleusercontent.com"
      });

      // google.accounts.id.prompt(); // also display the One Tap dialog

      this.store.select(SettingsSelectors.selectSettingsCollection).subscribe((data) => {
        this.renderer.setAttribute(this.document.body, 'class', data.isDarkModeEnabled ? 'darkMode' : '');
      });

  }



}
