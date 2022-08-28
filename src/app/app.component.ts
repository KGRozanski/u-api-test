import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, Renderer2, ViewChild } from '@angular/core';
import { MatDrawer, } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { SettingsActions } from './core/actions/settings.actions';
import { Settings } from './core/interfaces/settings.interface';
import { SETTINGS_SELECTORS } from './core/selectors/settings.selectors';
import { getSettingsInitial } from './core/state/initials/settings.initial';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {

  title: string = 'u-api-test';
  public setting: Settings = getSettingsInitial();
  @ViewChild('drawer') drawer: MatDrawer;

  constructor(
    private store: Store,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.store.select(SETTINGS_SELECTORS.selectSettingsCollection).subscribe((settings) => {
      this.setting = settings;
      this.renderer.setAttribute(this.document.body, 'class', settings.darkMode ? 'darkMode' : '');
      this.toggleMenu();
    });
  }

  public toggleMenu(): void {
    if(this.drawer) {
      this.drawer.toggle(this.setting.isMenuOpen);
    }
  }

  public closeMenu(): void {
    this.store.dispatch(SettingsActions.mainMenuToggle());
  }

}
