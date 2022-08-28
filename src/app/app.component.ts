import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDrawer, } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { SettingsActions } from './core/actions/settings.actions';
import { Settings } from './core/interfaces/settings.interface';
import { AccountInfo } from './core/interfaces/account-info.interface';
import { SETTINGS_SELECTORS } from './core/selectors/settings.selectors';
import { getSettingsInitial } from './core/state/initials/settings.initial';
import { ACCOUNT_SELECTORS } from './core/selectors/account.selectors';
import { Role } from './modules/user/enums/roles.enum';
import { getAccountInitial } from './core/state/initials/account.initial';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title: string = 'u-api-test';
  public setting: Settings = getSettingsInitial();
  public accountInfo: AccountInfo = getAccountInitial();
  public acceptableRole = Role.ADMIN;


  @ViewChild('drawer') drawer: MatDrawer;

  constructor(
    private store: Store,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit() :void {
    this.store.select(SETTINGS_SELECTORS.selectSettingsCollection).subscribe((settings) => {
      this.setting = settings;
      this.renderer.setAttribute(this.document.body, 'class', settings.darkMode ? 'darkMode' : '');
      this.toggleMenu();
    });

    this.store.select(ACCOUNT_SELECTORS.selectAccountCollection).subscribe((account) => {
      this.accountInfo = account;
    });
  }

  public toggleMenu(): void {
    if(this.drawer) {
      this.drawer.toggle();
    }
  }

  public closeMenu(): void {
    this.store.dispatch(SettingsActions.mainMenuToggle());
  }

}
