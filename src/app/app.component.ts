import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsSelectors } from './core/selectors/settings.selectors';



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
    this.store.select(SettingsSelectors.selectSettingsCollection).subscribe((data) => {
      this.renderer.setAttribute(this.document.body, 'class', data.isDarkModeEnabled ? 'darkMode' : '');
    });
  }



}
