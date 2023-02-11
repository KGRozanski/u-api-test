import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SETTINGS_SELECTORS } from '../../../selectors/settings.selectors';

@Component({
    selector: 'app-logotype',
    templateUrl: './logotype.component.html',
    styleUrls: ['./logotype.component.scss']
})
export class LogotypeComponent implements OnInit {
    public darkMode = true;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.select(SETTINGS_SELECTORS.selectSettingsCollection).subscribe((settings) => {
            this.darkMode = settings.darkMode;
        });
    }
}
