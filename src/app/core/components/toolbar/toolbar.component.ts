import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsActions } from '../../actions/settings.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public isChecked: boolean = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  public darkModeChanged() {
    this.store.dispatch(SettingsActions.darkModeToggle({isDarkModeEnabled: this.isChecked}));
  }

}
