import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { SettingsActions } from './core/actions/settings.actions';
import { Settings } from './core/interfaces/store/settings.interface';
import { AccountInfo } from './core/interfaces/store/account-info.interface';
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
    public setting: Settings = getSettingsInitial();
    public accountInfo: AccountInfo = getAccountInitial();
    public acceptableRole = Role.ADMIN;

    @ViewChild('drawer') drawer: MatDrawer;

    constructor(
        private store: Store,
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.store.select(SETTINGS_SELECTORS.selectSettingsCollection).subscribe((settings) => {
            this.setting = settings;
            this.renderer.setAttribute(this.document.body, 'class', settings.darkMode ? 'darkMode' : '');
            this._updateDrawer();
        });

        this.store.select(ACCOUNT_SELECTORS.selectAccountCollection).subscribe((account) => {
            this.accountInfo = account;
        });
    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this._updateDrawer();
    }

    public menuToggle(e?: any): void {
        this.store.dispatch(
            SettingsActions.drawerVisibility({
                drawerVisibility: !this.setting.drawerVisibility
            })
        );
    }

    private _updateDrawer(): void {
        if (!this.drawer) {
            return;
        }

        this.drawer.opened = this.setting.drawerVisibility;
        // to prevent 'ExpressionChangedAfterItHasBeenCheckedError'
        this.cd.detectChanges();
    }
}
