import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { LegacyProgressSpinnerMode as ProgressSpinnerMode } from '@angular/material/legacy-progress-spinner';

@Component({
	selector: 'app-loading-indicator',
	templateUrl: './loading-indicator.component.html',
	styleUrls: ['./loading-indicator.component.scss'],
})
export class LoadingIndicatorComponent {
	public color: ThemePalette = 'primary';
	public mode: ProgressSpinnerMode = 'indeterminate';
}
