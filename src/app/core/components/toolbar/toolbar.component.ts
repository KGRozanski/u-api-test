import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SettingsActions } from '../../actions/settings.actions';
import { SettingsSelectors } from '../../selectors/settings.selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Settings } from '../../interfaces/settings.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public isChecked: boolean = false;

  public settings$ = this.store.pipe(select(SettingsSelectors.selectSettingsCollection));
  private readonly unsubscribe$: Subject<void> = new Subject();
  constructor(private store: Store) { }

  public ngOnInit(): void {
    this.settings$.pipe(takeUntil(this.unsubscribe$)).subscribe((data: Settings) => {
      this.isChecked = data.isDarkModeEnabled;
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  public darkModeChanged() {
    this.store.dispatch(SettingsActions.darkModeToggle({isDarkModeEnabled: this.isChecked}));
  }

}
