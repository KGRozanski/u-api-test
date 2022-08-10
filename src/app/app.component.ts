import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Settings } from './core/interfaces/settings.interface';
import { SettingsSelectors } from './core/selectors/settings.selectors';
import { getSettingsInitial } from './core/state/initials/settings.initial';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title: string = 'u-api-test';
  public setting: Settings = getSettingsInitial()

  constructor(
    private store: Store,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.store.select(SettingsSelectors.selectSettingsCollection).subscribe((data) => {
      this.setting = data;
      this.renderer.setAttribute(this.document.body, 'class', data.darkMode ? 'darkMode' : '');
    });
  }

}
